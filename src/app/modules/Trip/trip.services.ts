import { Prisma } from "@prisma/client";
import prisma from "../../utils/prisma";
import verifyToken from "../../utils/verifyToken";
import { TTrip, TUpdateTrip } from "./trip.interface";
import { generateQueryConditions } from "./trip.utils";

// Creating trip
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

// Fetching trips with filtering and pagination
const getTripsFromDb = async (queryParams: Record<string, unknown>) => {
  const {
    page = 1,
    limit = 10,
    sortBy,
    sortOrder,
    ...otherTerms
  } = queryParams;

  const conditions: Prisma.TripWhereInput[] =
    generateQueryConditions(otherTerms);

  // Configuring sorting
  const sortByFields = ["destination", "budget", "createdAt"];
  const sortOrderFields = ["asc", "desc"];

  const orderBy =
    sortByFields.includes(sortBy as string) &&
    sortOrderFields.includes(sortOrder as string)
      ? { [sortBy as string]: sortOrder }
      : {};

  const whereConditions: Prisma.TripWhereInput =
    conditions.length > 0 ? { AND: conditions } : {};

  const result = await prisma.trip.findMany({
    where: whereConditions,
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy,
  });

  const total = await prisma.trip.count({
    where: whereConditions,
  });

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: result,
  };
};

// Fetching single trip
const getSingleTrip = async (tripId: string) => {
  const result = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  return result;
};

// Fetching trips created by an user
const getTripsCreatedByUserFromDb = async (token: string) => {
  const decoded = verifyToken(token);

  const result = await prisma.trip.findMany({
    where: {
      userId: decoded?.id,
    },
  });

  return result;
};

// Update trip
const updateTripInDb = async (tripId: string, payload: TUpdateTrip) => {
  const result = await prisma.trip.update({
    where: {
      id: tripId,
    },
    data: payload,
  });

  return result;
};

// Delete Trip
const deleteUserTripFromDb = async (tripId: string) => {
  const result = await prisma.$transaction(async (tx) => {
    await tx.travelBuddyRequest.deleteMany({
      where: {
        tripId: tripId,
      },
    });

    const tripDeleted = await tx.trip.delete({
      where: {
        id: tripId,
      },
    });

    return tripDeleted;
  });

  return result;
};

// Get travel types
const getTravelTypes = async () => {
  const result = await prisma.trip.findMany({
    where: {},
    distinct: ["travelType"],
    select: {
      travelType: true,
    },
  });

  const travelTypes = result.map((item) => item.travelType);

  return travelTypes;
};

export const TripServices = {
  createTripIntoDb,
  getTripsFromDb,
  getSingleTrip,
  getTravelTypes,
  getTripsCreatedByUserFromDb,
  deleteUserTripFromDb,
  updateTripInDb,
};
