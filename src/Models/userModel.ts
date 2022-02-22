

import mongooose from "mongoose"

import {userInterface}  from "../utils/rentInterface";


export  const registerSchema = new mongooose.Schema<userInterface>({

    fullname: {
        type: String,
        required:[true, "full Name field is required"]
    },

    dob: {
        type: Date,
        required:[true, "Date of birth is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        minlength:[8,"password most at least 8 character long"]
    },

 

},
 {timestamps:true},
)

const userRegistration = mongooose.model("Registereduser", registerSchema)



export default userRegistration;