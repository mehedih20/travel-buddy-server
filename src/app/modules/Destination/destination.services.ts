import prisma from "../../utils/prisma";
import { TDestination } from "./destination.interface";

// Create destination
const createDestinationInDb = async (payload: TDestination) => {
  const result = await prisma.destination.create({
    data: payload,
  });

  return result;
};

// Fetch all destinations
const getDestinationsFromDb = async () => {
  const result = await prisma.destination.findMany({});
  return result;
};

// Delete destination
const deleteDestinationFromDb = async (destinationId: string) => {
  const result = await prisma.destination.delete({
    where: {
      id: destinationId,
    },
  });
  return result;
};

export const DestinationServices = {
  createDestinationInDb,
  getDestinationsFromDb,
  deleteDestinationFromDb,
};
