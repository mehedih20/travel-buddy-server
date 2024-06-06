import { Router } from "express";
import { UserController } from "./user.controller";
import validateData from "../../middlewares/validateData";
import {
  updateUserPhotoValidationSchema,
  updateUserProfileValidationSchema,
  userLoginValidationSchema,
  userPasswordChangeValidationSchema,
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

router.get(
  "/profile",
  auth("user", "admin", "super-admin"),
  UserController.getUserProfile,
);

router.put(
  "/profile",
  auth("user", "admin", "super-admin"),
  validateData(updateUserProfileValidationSchema),
  UserController.updateUserProfile,
);

router.put(
  "/profile/change-photo",
  auth("user", "admin", "super-admin"),
  validateData(updateUserPhotoValidationSchema),
  UserController.updateUserPhoto,
);

router.put(
  "/change-password",
  auth("user", "admin", "super-admin"),
  validateData(userPasswordChangeValidationSchema),
  UserController.userPasswordChange,
);

router.post(
  "/check-password",
  auth("user", "admin", "super-admin"),
  UserController.checkUserPassword,
);

router.put(
  "/change-role/:userId",
  auth("admin", "super-admin"),
  UserController.changeUserRole,
);

router.put(
  "/change-status/:userId",
  auth("admin"),
  UserController.changeUserStatus,
);

router.get("/users", auth("admin", "super-admin"), UserController.getUsers);

router.post("/check-status", UserController.checkUserStatus);

router.post("/check-email-username", UserController.checkEmailUsername);

export const UserRouter = router;
