import type { z } from "zod";

import type { LIST_USERS_SCHEMA_RESPONSE } from "src/interfaces/validators/user/list-users.schema.js";

export type ListUsersResponseDTO = z.infer<
  (typeof LIST_USERS_SCHEMA_RESPONSE)["200"]
>;
