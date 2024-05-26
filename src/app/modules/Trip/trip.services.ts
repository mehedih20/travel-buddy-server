import { Prisma } from "@prisma/client";
import prisma from "../../utils/prisma";
import verifyToken from "../../utils/verifyToken";
import { TTrip } from "./trip.interface";
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
  const { page = 1, limit = 9, sortBy, sortOrder, ...otherTerms } = queryParams;

  const conditions: Prisma.TripWhereInput[] =
    generateQueryConditions(otherTerms);

  // Configuring sorting
  const sortByFields = ["destination", "budget"];
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
};
