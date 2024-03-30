import prisma from "../../utils/prisma";

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

export const TravelBuddyServices = {
  sendTravelBuddyRequestIntoDb,
  getTravelBuddiesFromDb,
};
