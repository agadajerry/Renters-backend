import mongoose from "mongoose";
import { renterInt } from "../utils/rentInterface";

const renterPaymentModel = new mongoose.Schema<renterInt>({

  userEmail:{
   type: String
  },

  accomodationStatus: {
    type: String,
  },
  rentAmount: {
    type: Number,
    required: true,
  },
  monthlyIncome: {
    type: Number,
  },
  paymentPlan: {
    type: String,
  },
},
  {timestamps:true});

  const Renters = mongoose.model("renterDetails", renterPaymentModel);

  export default Renters
