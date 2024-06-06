import prisma from "../../utils/prisma";
import verifyToken from "../../utils/verifyToken";
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

const getAllBuddyRequestFromDb = async () => {
  const result = await prisma.travelBuddyRequest.findMany({
    select: {
      userId: true,
      userEmail: true,
      tripDestination: true,
      tripId: true,
      status: true,
      user: {
        select: {
          name: true,
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

// Fetching request made by an user
const getSingleUserBuddyRequestFromDb = async (token: string) => {
  const decoded = verifyToken(token);

  const result = await prisma.travelBuddyRequest.findMany({
    where: {
      userId: decoded?.id,
    },
    select: {
      tripDestination: true,
      status: true,
    },
  });

  return result;
};

// Checking user request for a trip
const checkBuddyRequestInDb = async (token: string, tripId: string) => {
  const decoded = verifyToken(token);

  const result = await prisma.travelBuddyRequest.findUnique({
    where: {
      tripId_userId: {
        tripId,
        userId: decoded?.id,
      },
    },
  });

  if (result) {
    return true;
  } else {
    return false;
  }
};

export const TravelBuddyServices = {
  sendTravelBuddyRequestIntoDb,
  getTravelBuddiesFromDb,
  updateTravelBuddyRequestIntoDb,
  getSingleUserBuddyRequestFromDb,
  checkBuddyRequestInDb,
  getAllBuddyRequestFromDb,
};
