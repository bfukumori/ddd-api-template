import type { z } from "zod";

import type { USER_SCHEMA_WITHOUT_ID } from "src/interfaces/validators/user/user.schema.js";

export type CreateUserDTO = z.infer<typeof USER_SCHEMA_WITHOUT_ID>;
