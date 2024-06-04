import config from "../../config";
import prisma from "../../utils/prisma";
import verifyToken from "../../utils/verifyToken";
import {
  TCheckUserPassword,
  TUserLogin,
  TUserPasswordChange,
  TUserPhotoUpdate,
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
        username: payload.username,
        photoUrl: payload.photoUrl || null,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    await transactionClient.userProfile.create({
      data: {
        bio: payload?.profile?.bio,
        age: payload?.profile?.age,
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
    username: user?.username,
    email: user?.email,
    role: user?.role,
  };

  // jwt token generation
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "15d",
  });

  const userInfo = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
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
      username: true,
      role: true,
      photoUrl: true,
      userProfile: {
        select: {
          bio: true,
          age: true,
        },
      },
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

  const result = await prisma.$transaction(async (tx) => {
    const { profile, ...infoWithoutProfile } = payload;
    const userResponse = await tx.user.update({
      where: {
        id: decoded.id,
      },
      data: infoWithoutProfile,
    });

    await tx.userProfile.update({
      where: {
        userId: userResponse.id,
      },
      data: {
        bio: profile?.bio,
        age: profile?.age,
      },
    });

    const upadatedUser = await tx.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        photoUrl: true,
        userProfile: {
          select: {
            bio: true,
            age: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    return upadatedUser;
  });

  return result;
};

// Update user photo
const updateUserPhotoInDb = async (
  token: string,
  payload: TUserPhotoUpdate,
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
      photoUrl: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

// Update user password
const userPasswordChangeInDb = async (
  token: string,
  payload: TUserPasswordChange,
) => {
  const decoded = verifyToken(token);

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });

  let isPasswordVerified;

  if (user) {
    isPasswordVerified = await bcrypt.compare(
      payload.oldPassword,
      user?.password,
    );
  }

  let newHashedPassword;

  if (isPasswordVerified) {
    newHashedPassword = await bcrypt.hash(
      payload.newPassword,
      Number(config.bcrypt_salt_rounds),
    );
  } else {
    throw new Error("Incorrect password");
  }

  await prisma.user.update({
    where: {
      id: decoded.id,
    },
    data: {
      password: newHashedPassword,
    },
  });
};

// Check user password
const checkUserPasswordInDb = async (
  token: string,
  payload: TCheckUserPassword,
) => {
  const decoded = verifyToken(token);

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });

  let isPasswordVerified;

  if (user) {
    isPasswordVerified = await bcrypt.compare(payload.password, user?.password);
  }

  if (isPasswordVerified) {
    return true;
  } else {
    return false;
  }
};

const changeUserRoleInDB = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  let result;
  if (user?.role === "user") {
    result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: "admin",
      },
      select: {
        email: true,
        role: true,
      },
    });
  } else if (user?.role === "admin") {
    result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: "user",
      },
      select: {
        email: true,
        role: true,
      },
    });
  }

  return result;
};

const changeUserStatusInDB = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  let result;
  if (user?.status === "active") {
    result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status: "deactivated",
      },
      select: {
        email: true,
        status: true,
      },
    });
  } else if (user?.status === "deactivated") {
    result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status: "active",
      },
      select: {
        email: true,
        status: true,
      },
    });
  }

  return result;
};

const getUsersFromDb = async (token: string) => {
  const decoded = verifyToken(token);

  const result = await prisma.user.findMany({
    where: {
      role: {
        in: ["user", "admin"],
      },
      NOT: {
        id: decoded?.id,
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      role: true,
      status: true,
    },
  });

  return result;
};

export const UserServices = {
  resgisterIntoDb,
  userLoginIntoDb,
  getUserProfileFromDb,
  updateUserProfileInDb,
  updateUserPhotoInDb,
  userPasswordChangeInDb,
  checkUserPasswordInDb,
  changeUserRoleInDB,
  changeUserStatusInDB,
  getUsersFromDb,
};
