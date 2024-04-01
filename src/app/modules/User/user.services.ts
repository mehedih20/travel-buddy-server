import config from "../../config";
import prisma from "../../utils/prisma";
import verifyToken from "../../utils/verifyToken";
import {
  TUserLogin,
  TUserProfileUpdate,
  TUserRegister,
} from "./user.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registering user
const resgisterIntoDb = async (payload: TUserRegister) => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  // Checking if user exist with the email provided
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isUserExists) {
    throw new Error("User already exist!");
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    const newUser = await transactionClient.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    await transactionClient.userProfile.create({
      data: {
        bio: payload.profile.bio,
        age: payload.profile.age,
        userId: newUser.id,
      },
    });

    return newUser;
  });

  return result;
};

// User login
const userLoginIntoDb = async (payload: TUserLogin) => {
  let user;
  try {
    user = await prisma.user.findUniqueOrThrow({
      where: {
        email: payload.email,
      },
    });
  } catch (err) {
    throw new Error("User not found");
  }

  // password verify
  const isPasswordVerified = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isPasswordVerified) {
    throw new Error("Incorrect password");
  }

  const jwtPayload = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
  };

  // jwt token generation
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "15d",
  });

  const userInfo = {
    id: user.id,
    name: user.name,
    email: user.email,
    token: accessToken,
  };

  return userInfo;
};

// Fetch user profile
const getUserProfileFromDb = async (token: string) => {
  const decoded = verifyToken(token);

  const result = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

// Update user profile
const updateUserProfileInDb = async (
  token: string,
  payload: TUserProfileUpdate,
) => {
  const decoded = verifyToken(token);

  const result = await prisma.user.update({
    where: {
      id: decoded.id,
    },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

export const UserServices = {
  resgisterIntoDb,
  userLoginIntoDb,
  getUserProfileFromDb,
  updateUserProfileInDb,
};
