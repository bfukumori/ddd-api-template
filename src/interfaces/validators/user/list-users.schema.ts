import { z } from "zod";

import { USER_SCHEMA_WITHOUT_PASSWORD } from "src/interfaces/validators/user/user.schema.js";

export const LIST_USERS_SCHEMA_RESPONSE = {
  200: z.object({
    users: USER_SCHEMA_WITHOUT_PASSWORD.array(),
  }),
};
