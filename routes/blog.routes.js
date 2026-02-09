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
import { authenticate } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import {
  loginUserSchema,
  userRegisterSchema,
} from "../validators/user.validator.js";

const router = Router();

router.post("/register", validateBody(userRegisterSchema), register);

router.get("/single/:id", getUser);

router.post("/login", validateBody(loginUserSchema), login);

router.post("/logout", authenticate, logout);

router.get("/profile", authenticate, getProfile);

router.patch("/update-profile", authenticate, updateProfile);

router.patch("/delete-profile", authenticate, deleteProfile);

export default router;
