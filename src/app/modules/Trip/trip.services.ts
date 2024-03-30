import prisma from "../../utils/prisma";
import verifyToken from "../../utils/verifyToken";
import { TTrip } from "./trip.interface";

const createTripIntoDb = async (token: string, payload: TTrip) => {
  const decoded = verifyToken(token);

  const result = await prisma.trip.create({
    data: {
      userId: decoded.id,
      ...payload,
    },
  });

  return result;
};

export const TripServices = {
  createTripIntoDb,
};
