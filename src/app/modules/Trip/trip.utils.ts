import { Prisma } from "@prisma/client";

export const generateQueryConditions = (query: Record<string, unknown>) => {
  const { searchTerm, destination, startDate, endDate, minBudget, maxBudget } =
    query;

  const conditions: Prisma.TripWhereInput[] = [];

  // Configuring the searchTerm
  if (searchTerm) {
    conditions.push({
      OR: ["destination", "budget", "travelType", "description"].map(
        (field) => {
          if (field === "budget" && Number.isInteger(Number(searchTerm))) {
            return {
              [field]: Number(searchTerm),
            };
          } else if (field !== "budget") {
            return {
              [field]: {
                contains: searchTerm,
                mode: "insensitive",
              },
            };
          }
          return {};
        },
      ),
    });
  }

  // Configuring other fields
  if (destination) {
    conditions.push({
      destination: {
        contains: destination.toString(),
        mode: "insensitive",
      },
    });
  }

  if (startDate) {
    conditions.push({
      startDate: {
        gte: startDate.toString(),
      },
    });
  }
  if (endDate) {
    conditions.push({
      endDate: {
        lte: endDate.toString(),
      },
    });
  }

  if (minBudget !== undefined && maxBudget !== undefined) {
    conditions.push({
      budget: {
        gte: Number(minBudget),
        lte: Number(maxBudget),
      },
    });
  } else if (maxBudget !== undefined) {
    conditions.push({
      budget: {
        lte: Number(maxBudget),
      },
    });
  } else if (minBudget !== undefined) {
    conditions.push({
      budget: {
        gte: Number(minBudget),
      },
    });
  }

  return conditions;
};
