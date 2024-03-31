import prisma from "../../utils/prisma";
import { TTravelBuddyRequestUpdate } from "./travelBuddy.interface";

const sendTravelBuddyRequestIntoDb = async (userId: string, tripId: string) => {
  const result = await prisma.travelBuddyRequest.create({
    data: {
      userId,
      tripId,
    },
  });

  return result;
};

const getTravelBuddiesFromDb = async (tripId: string) => {
  const result = await prisma.travelBuddyRequest.findMany({
    where: {
      tripId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return result;
};

const updateTravelBuddyRequestIntoDb = async (
  buddyId: string,
  payload: TTravelBuddyRequestUpdate
) => {
  const queryObj = {
    tripId: payload.tripId,
    userId: buddyId,
  };

  const result = await prisma.travelBuddyRequest.update({
    where: {
      tripId_userId: queryObj,
    },
    data: {
      status: payload.status,
    },
  });

  return result;
};

export const TravelBuddyServices = {
  sendTravelBuddyRequestIntoDb,
  getTravelBuddiesFromDb,
  updateTravelBuddyRequestIntoDb,
};
