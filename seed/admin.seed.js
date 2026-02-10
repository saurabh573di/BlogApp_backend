
import { ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD } from "../config/index.js";
import UserModel from "../models/User.model.js";

if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_NAME)
  throw new Error(
    "Define ADMIN_EMAIL, ADMIN_PASSWORD and ADMIN_NAME in .env file",
  );

export const seedAdmin = async () => {
  //! seed admin
  //? only one admin should be present
  let adminData = await UserModel.findOne({ role: "admin" });
  if (adminData) {
    console.log("admin is already present");
    console.log("skipping seed");
    return;
  } else {
    await UserModel.create({
      name: ADMIN_NAME,
      role: "admin",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      age: 34,
    });
    console.log("admin seeded");
  }
};
