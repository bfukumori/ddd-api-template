import { z } from "zod";

export const CREATE_USER_SCHEMA_REQUEST = z.object({
  name: z.string({ message: "Name must be a string." }),
  age: z.number({ message: "Age must be a number." }),
});

export const CREATE_USER_SCHEMA_RESPONSE = {
  201: z.void(),
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
