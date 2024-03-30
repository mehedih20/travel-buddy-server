import config from "../../config";
import prisma from "../../utils/prisma";
import { TUserRegister } from "./user.interface";
import bcrypt from "bcrypt";

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

export const UserServices = {
  resgisterIntoDb,
};
