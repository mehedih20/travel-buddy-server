import prisma from "../../utils/prisma";
import {
  TTravelBuddyPayload,
  TTravelBuddyResponse,
} from "./travelBuddy.interface";

// Sending travel buddy request
const sendTravelBuddyRequestIntoDb = async (payload: TTravelBuddyPayload) => {
  const result = await prisma.travelBuddyRequest.create({
    data: payload,
  });

  return result;
};

// Fetching all travel buddies for a specific tour
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

// Responding to the travel buddy request
const updateTravelBuddyRequestIntoDb = async (
  buddyId: string,
  payload: TTravelBuddyResponse,
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
