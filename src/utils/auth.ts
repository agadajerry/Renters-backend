import { Request, Response, NextFunction } from "express";
import userRegistration from "../Models/userModel";
import { userInterface } from "./rentInterface";
const jwt = require("jsonwebtoken");

export  function authoriseUser(req:any, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.jwt_token;

      if (token) {
        
      jwt.verify(
        token,
        process.env.JWT_SECRET,
       async (err: any, decodedToken: any) => {
          
          if (err) return res.status(404).json({msg:"You are not authorised to view this page..."});

          const user2 = await  userRegistration.findOne({ email: decodedToken.email });

        //   console.log(decodedToken.email)
          req.user = decodedToken;

         

            next();
        }
      );
    } else {
        //307 -redirect status code
      res.status(404).json({msg:"No token found . You are redirect to login page"})
    }
  } catch (err) {
    res.sendStatus(401);
  }
}
