// import the.env // this should be on the top   
import dotenv from "dotenv";// this should be at the top of the file. it loads all the variables defined in .env file into process.env



//config will read and parse the vari
// ables present in .env file .
// if you will use this in main app.js if can give error 
// so make a seprate file ,  define var and export them 


 // config(), will read/parse the variables present in .env file

dotenv.config({ quiet: true }); // config(), will read/parse the variables present in .env file

export const PORT = process.env.PORT || 9000;
export const MONGODB_URL = process.env.MONGODB_URL;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const ADMIN_NAME = process.env.ADMIN_NAME;