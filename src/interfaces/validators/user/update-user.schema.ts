import { z } from "zod";
import { USER_SCHEMA } from "./user.schema.js";

const UPDATE_USER_SCHEMA = USER_SCHEMA.partial().extend({
  id: USER_SCHEMA.shape.id,
});

const UPDATE_USER_SCHEMA_RESPONSE = {
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

export { UPDATE_USER_SCHEMA, UPDATE_USER_SCHEMA_RESPONSE };
