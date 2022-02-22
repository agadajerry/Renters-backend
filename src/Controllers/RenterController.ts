import express, { Request, Response, NextFunction } from "express";
import Renters from "../Models/renterPaymentModel";
import userRegistration from "../Models/userModel";
import {
  validateInput,
  validateUser,
  validateUserLogin,
} from "../utils/inputValidation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userInterface } from "../utils/rentInterface";

// user registration

/*****************************************************************************************
 *  User registration and login with it validation
 * ************************************************************************************ */

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullname, dob, email, password, password_repeat } = req.body;

    //validate user input
    const { error } = validateUser(req.body);

    if (error) {
      return res.status(404).json(error.message);
    }

    //check if user already existed in the collection

    userRegistration.findOne({ email: email }, async (err: any, user: any) => {
      if (err) {
        return res.json({ msg: "Error occured at finding user in db..." });
      }
      if (user) {
        return res
          .status(404)
          .json({ msg: "user already register in our platform..." });
      } else {
        user = new userRegistration({
          fullname,
          dob,
          email,
          password: await bcrypt.hash(password, 10),
        });
        await user.save(); //new user register

        return res
          .status(201)
          .json({ msg: "New User registered successfully...." });
      }
    });
  } catch (error) {
    console.error("error occurred in user registration...");
  }
};

/**************************************************************************************
 *  User  login with it validation
 * ************************************************************************************ */

export const userLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateUserLogin(req.body);

  try {
    if (error) {
      return res.status(404).json({
        msg: "validation error in login. Check your entry...",
      });
    }

    //find user now

    userRegistration.findOne(
      { email: req.body.email },
      async (err: any, user: any) => {
        if (err)
          return res
            .status(404)
            .json({ msg: "Error occurred in finding user" });

        if (!user) {
          return res.status(404).json({ msg: "No Such user exist..." });
        }

        //   res.status(200).json({ msg: "User exist in database..." });

        //Decrypt incomeing password from the body

        const decrptPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );

        if (!decrptPassword) {
          return res.status(200).json({ msg: "Password / email invalid..." });
        } else {
          const token = jwt.sign(
            { email: req.body.email },
            process.env.JWT_SECRET as string,
            {
              expiresIn: 60 * 60 * 60,
            }
          );

          res.cookie("jwt_token", token, { httpOnly: true });

          return res
            .status(200)
            .json({ msg: "User Login successful...", details: user });
        }
      }
    );
  } catch (e) {
    console.error(e);
  }
};

// A user can create new request form

export const userRenter = async (req: any, res: Response) => {
  try {
    const { error } = validateInput(req.body);

    if (error) return res.status(404).json({ msg: error.message });

    const monthlyPament =
      0.02 * Number(req.body.rentAmount) +
      Number(req.body.rentAmount);

    //   userEmail: req.user.email,

      const data = {
      accomodationStatus: req.body.accomodationStatus,
      rentAmount: req.body.rentAmount,
      monthlyIncome: req.body.monthlyIncome,
      paymentPlan: req.body.paymentPlan,
    };

    const rent = new Renters(data);
    await rent.save();

    res.status(201).json({ msg: "renter details saved..." });
  } catch (error: any) {
    console.error(error);
  }
};

// A user can edit his created request

export const editLoanRequest = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await Renters.findOne({ userEmail: req.user.email });

    const updateData = {
      accomodationStatus:
        req.body.accomodationStatus || user?.accomodationStatus,
      rentAmount: req.body.rentAmount || user.rentAmount,
      monthlyIncome: req.body.monthlyIncome || user?.monthlyIncome,
      paymentPlan: req.body.paymentPlan || user.paymentPlan,
    };

    const result = await Renters.updateOne(
      { userEmail: req.user.email },
      updateData,
      { new: true }
    );

    if (result) {
      return res.status(200).json({ success: result });
    }
  } catch (error: any) {
    console.error(error);
  }
};

//get all transaction

export const getAllTransactions = async (req: Request, res: Response)=>{

    try{
            const result = await Renters.find({});

            if(result) return res.status(200).json({msg:result});
    }catch(err:any){
        console.error(err)
    }
}
