import { z } from "zod";

const createTripValidationSchema = z.object({
  destination: z.string(),
  description: z.string(),
  travelType: z.string(),
  activities: z.array(z.string()),
  itinerary: z.array(z.string()),
  imageLinks: z.array(z.string()),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number(),
});

export { createTripValidationSchema };
