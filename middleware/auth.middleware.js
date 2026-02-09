
// we are creating a route level middleware 
import jwt from "jsonwebtoken";
import {JWT_SECRET_KEY}  from '../config/index.js'

import UserModel from '../models/User.model.js';
import ErrorResponse from '../utils/ErrorResponse.util.js';
export const authenticate =async(req,res,next)=>{
    console.log("auth middleware");

    console.log(req.cookies)
//401 = user not authorized 
//403 = forbidden . means if you are login or not you cant able to access this or to use that .this is used in authorization
    let  token = req.cookies.token;
    if(!token )
        return next(new ErrorResponse("plz login to access this resource ",404))

    //^ step 3 of jwt 
    //! we will decode the token
    // syntax = jwt.verify(token,secretKey) .. this will return a object so we will store that in a var

    let decodedToken = jwt.verify(token,JWT_SECRET_KEY)
    console.log("decoded token ", decodedToken)

    //*What it does in simple words:

//* After decoding the JWT token, this line checks if the user actually exists in the database.
//^It retrieves the full user information (like name, email, role, etc.) so you can use it in your app.
     let user = await UserModel.findOne({ name: decodedToken.name });
    if(!user) return next(new ErrorResponse("invalid sesion",401))
   
        // here we are storing the 
//! After this line runs, any route or middleware that comes after this authentication middleware can access the logged-in user's info through req.myUser.
//! It’s a way to pass data from middleware to routes.
         req.myUser = user;
    next();

}


//! encryption, encoding, signing(data integrity)

export const authorize = async (req, res, next) => {
  if (req.myUser.role === "admin") next();
  else return next(new ErrorResponse("Unauthorized", 403));
}; //? forbidden;