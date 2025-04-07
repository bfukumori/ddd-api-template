import type { z } from "zod";

import type { USER_SCHEMA } from "src/interfaces/validators/user/user.schema.js";

type UserDTO = z.infer<typeof USER_SCHEMA>;

export type { UserDTO };
