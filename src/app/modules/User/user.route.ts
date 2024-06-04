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

router.get("/profile", auth(), UserController.getUserProfile);

router.put(
  "/profile",
  auth("user"),
  validateData(updateUserProfileValidationSchema),
  UserController.updateUserProfile,
);

router.put(
  "/profile/change-photo",
  auth("user"),
  validateData(updateUserPhotoValidationSchema),
  UserController.updateUserPhoto,
);

router.put(
  "/change-password",
  auth("user"),
  validateData(userPasswordChangeValidationSchema),
  UserController.userPasswordChange,
);

router.post("/check-password", auth("user"), UserController.checkUserPassword);

router.put(
  "/change-role",
  auth("admin", "super-admin"),
  UserController.changeUserRole,
);

router.put("/change-status", auth("admin"), UserController.changeUserStatus);

router.get("/users", auth("admin", "super-admin"), UserController.getUsers);

export const UserRouter = router;
