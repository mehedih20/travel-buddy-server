import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";

const register = catchAsync(async (req, res) => {
  const result = await UserServices.resgisterIntoDb(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await UserServices.userLoginIntoDb(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    data: result,
  });
});

const getUserProfile = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await UserServices.getUserProfileFromDb(token as string);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateUserProfile = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await UserServices.updateUserProfileInDb(
    token as string,
    req.body,
  );

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "User profile updated successfully",
    data: result,
  });
});

const updateUserPhoto = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await UserServices.updateUserPhotoInDb(
    token as string,
    req.body,
  );

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "User photo updated successfully",
    data: result,
  });
});

const userPasswordChange = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  await UserServices.userPasswordChangeInDb(token as string, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "User password changed successfully",
  });
});

const checkUserPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await UserServices.checkUserPasswordInDb(
    token as string,
    req.body,
  );

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "User password checked successfully",
    result,
  });
});

const changeUserRole = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.changeUserRoleInDB(userId);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "User role changed successfully",
    data: result,
  });
});

const changeUserStatus = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.changeUserStatusInDB(userId);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "User status changed successfully",
    data: result,
  });
});

const getUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getUsersFromDb();

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "Users fetched successfully",
    data: result,
  });
});

export const UserController = {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  updateUserPhoto,
  userPasswordChange,
  checkUserPassword,
  changeUserRole,
  changeUserStatus,
  getUsers,
};
