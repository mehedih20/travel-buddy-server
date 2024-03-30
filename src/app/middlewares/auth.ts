import catchAsync from "../utils/catchAsync";
import prisma from "../utils/prisma";
import verifyToken from "../utils/verifyToken";

export const auth = () => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    //checking if undefined
    if (!token) {
      throw new Error("Unauthorized Access");
    }

    const decoded = verifyToken(token);

    //checking if token is invalid
    if (!decoded) {
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

    next();
  });
};