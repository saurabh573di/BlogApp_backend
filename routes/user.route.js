

//! 1) import {Router} from 'express'
//! 2) import all the controller functions
//! 3) create an instance of Router
//! 4) define all the routes and attach the controller functions
//! 5) export the router instance
import { Router } from "express";
import {
  deleteProfile,
  getProfile,
  getUser,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import {
  loginUserSchema,
  userRegistrationSchema,
} from "../validators/user.validator.js";

const router = Router();

router.post("/register", validateBody(userRegistrationSchema), register);

router.get("/single/:id", getUser);

router.post("/login", validateBody(loginUserSchema), login);

router.post("/logout", authenticate, logout);

router.get("/profile", authenticate, getProfile);

router.patch("/update-profile", authenticate, updateProfile);

router.patch("/delete-profile", authenticate, deleteProfile);

export default router;

//! get, post, patch, delete, put
//? server data --> post, patch ,put