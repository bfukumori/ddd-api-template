import { z } from "zod";

import { USER_SCHEMA_WITHOUT_ID } from "./user.schema.js";

const CREATE_USER_SCHEMA = USER_SCHEMA_WITHOUT_ID.extend({
  confirmPassword: z.string(),
});

const CREATE_USER_SCHEMA_REQUEST = CREATE_USER_SCHEMA.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match.",
  },
);

const CREATE_USER_SCHEMA_RESPONSE = {
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

export {
  CREATE_USER_SCHEMA,
  CREATE_USER_SCHEMA_REQUEST,
  CREATE_USER_SCHEMA_RESPONSE,
};
