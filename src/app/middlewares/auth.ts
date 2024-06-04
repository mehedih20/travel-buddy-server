import catchAsync from "../utils/catchAsync";
import prisma from "../utils/prisma";
import verifyToken from "../utils/verifyToken";

type TUserRole = "user" | "admin" | "super-admin";

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    //checking if undefined
    if (!token) {
      throw new Error("Unauthorized Access");
    }

    let decoded;

    //checking if token is invalid
    try {
      decoded = verifyToken(token);
    } catch (err) {
      throw new Error("Unauthorized Access");
    }

    //checking if the token has expired
    if (decoded.exp) {
      const timeNow = Math.round(Date.now() / 1000);
      if (decoded.exp < timeNow) {
        throw new Error("Unauthorized Access");
      }
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    //checking if user exists
    if (!user) {
      throw new Error("Unauthorized Access");
    }

    // verifying user role
    const userRole = user.role as TUserRole;
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      throw new Error("Unauthorized Access");
    }

    next();
  });
};
