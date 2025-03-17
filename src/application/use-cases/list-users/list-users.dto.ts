import type { z } from "zod";

import type {
  LIST_USERS_SCHEMA_RESPONSE,
  USER_SCHEMA,
} from "./list-users.schema.js";

export type UserDTO = z.infer<typeof USER_SCHEMA>;

export type ListUsersDTO = z.infer<(typeof LIST_USERS_SCHEMA_RESPONSE)["200"]>;
