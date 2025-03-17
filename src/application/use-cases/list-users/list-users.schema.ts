import { z } from "zod";

export const USER_SCHEMA = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
});

export const LIST_USERS_SCHEMA_RESPONSE = {
  200: z.object({
    users: USER_SCHEMA.array(),
  }),
};
