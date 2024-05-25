import { z } from "zod";

const createTripValidationSchema = z.object({
  destination: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number(),
  activities: z.array(z.string()),
  description: z.string(),
  travelType: z.string(),
  imageLinks: z.array(z.string()),
});

export { createTripValidationSchema };
