import config from "../../config";
import prisma from "../../utils/prisma";
import { TUserLogin, TUserRegister } from "./user.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const resgisterIntoDb = async (payload: TUserRegister) => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

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
    user.password
  );

  if (!isPasswordVerified) {
    throw new Error("Incorrect password");
  }

  const jwtPayload = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
  };

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

export const UserServices = {
  resgisterIntoDb,
  userLoginIntoDb,
};
