


// wee will secure the jwt secret key in the .env file becase if we use that or write that in normal file so havkers or anybody can easily log or print or acess that 
//* so store that secret key in the dotenv file



import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/index.js";

// when you learn that time use this 
// export const generateJwtToken = (payload) => {
//   return jwt.sign({ payload }, JWT_SECRET_KEY, { expiresIn: "1d" });
// };

// and you can also use destrcuting like this 
export const generateJwtToken = (name) => {
  return jwt.sign({ name }, JWT_SECRET_KEY, { expiresIn: "1d" }); //? claims
};