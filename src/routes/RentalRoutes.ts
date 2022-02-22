import * as  renterControl from "../Controllers/RenterController" 
import express from "express"
import { authoriseUser } from "../utils/auth";

const router = express.Router();




//register new user

router.post("/register", renterControl.registerUser);


///login user
router.post("/login", renterControl.userLogin);
// user rental input
router.post("/renter-detail", renterControl.userRenter);

//edit user
router.put("/update", renterControl.editLoanRequest)





export default router;