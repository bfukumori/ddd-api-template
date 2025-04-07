import { z } from "zod";

export const UPDATE_USER_SCHEMA_RESPONSE = {
  200: z.void(),
  400: z.object({
    message: z.string(),
    errors: z.array(z.string()),
  }),
  422: z.object({
    message: z.string(),
    error: z.string(),
  }),
  500: z.object({
    message: z.string(),
  }),
};
