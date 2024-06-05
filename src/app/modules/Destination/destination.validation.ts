import { z } from "zod";

const destinationValidationSchema = z.object({
  name: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  rating: z.number(),
});

export { destinationValidationSchema };
