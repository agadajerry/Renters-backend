import Joi from "joi";
import { renterInt } from "./rentInterface";
import { userInterface } from "./rentInterface";

//payment plans

export const validateInput = (data:renterInt) => {
  const schema = Joi.object({
    accomodationStatus: Joi.string().error(new Error("Accommodation status is required")),
    paymentPlan: Joi.string().error(new Error("payment plan is required")),
    rentAmount: Joi.number().required().error(new Error("Provide rent amount")),
    monthlyIncome: Joi.number().required().error(new Error("provide monthly salary amount")),
  }).unknown();

  const options = {
    errors: {
     
    },
  };

  return schema.validate(data, options);
};


export const validateUser = (data: userInterface) => {
  const schema = Joi.object({
    fullname: Joi.string()
      .trim()
      .min(3)
      .max(64)
      .error(new Error("first name must be provided")),
    email: Joi.string().trim().email().lowercase().required(),
    dob: Joi.string().trim().required(),
    password: Joi.string().min(8).required(),
    password_repeat: Joi.ref("password"),
  }).unknown();

  const options = {
    errors: {
     
    },
  };

  return schema.validate(data, options);
};


//user login

export const validateUserLogin = (data: userInterface) => {
  const schema = Joi.object({
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string().min(8).required(),
    password_repeat: Joi.ref("password"),
  }).unknown();

  const options = {
    errors: {
      wrap: {
        label: "",
      },
    },
  };

  return schema.validate(data, options);
};