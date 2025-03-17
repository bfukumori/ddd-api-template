import type { z } from "zod";

import type { CREATE_USER_SCHEMA_REQUEST } from "./create-user.schema.js";

export type CreateUserDTO = z.infer<typeof CREATE_USER_SCHEMA_REQUEST>;
