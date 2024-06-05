import prisma from "../../utils/prisma";
import { TDestination } from "./destination.interface";

const createDestinationInDb = async (payload: TDestination) => {
  const result = await prisma.destination.create({
    data: payload,
  });

  return result;
};

const getDestinationsFromDb = async () => {
  const result = await prisma.destination.findMany({});
  return result;
};

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
