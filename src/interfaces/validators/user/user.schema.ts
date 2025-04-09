import { z } from "zod";

const USER_SCHEMA = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().int().positive(),
  password: z.string(),
});

const USER_PARAMS_SCHEMA = USER_SCHEMA.pick({ id: true });

const USER_SCHEMA_WITHOUT_PASSWORD = USER_SCHEMA.omit({
  password: true,
});

const USER_SCHEMA_WITHOUT_ID = USER_SCHEMA.omit({
  id: true,
});

export {
  USER_SCHEMA,
  USER_SCHEMA_WITHOUT_PASSWORD,
  USER_SCHEMA_WITHOUT_ID,
  USER_PARAMS_SCHEMA,
};
