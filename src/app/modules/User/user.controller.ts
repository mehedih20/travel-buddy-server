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

export const UserController = {
  register,
  login,
  getUserProfile,
};
