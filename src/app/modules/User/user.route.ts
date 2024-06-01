import { Router } from "express";
import { UserController } from "./user.controller";
import validateData from "../../middlewares/validateData";
import {
  updateUserPhotoValidationSchema,
  updateUserProfileValidationSchema,
  userLoginValidationSchema,
  userRegisterValidationSchema,
} from "./user.validation";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post(
  "/register",
  validateData(userRegisterValidationSchema),
  UserController.register,
);

router.post(
  "/login",
  validateData(userLoginValidationSchema),
  UserController.login,
);

router.get("/profile", auth(), UserController.getUserProfile);

router.put(
  "/profile",
  auth(),
  validateData(updateUserProfileValidationSchema),
  UserController.updateUserProfile,
);

router.put(
  "/profile/change-photo",
  auth(),
  validateData(updateUserPhotoValidationSchema),
  UserController.updateUserPhoto,
);

export const UserRouter = router;
