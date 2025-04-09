import type { z } from "zod";

import type { UPDATE_USER_SCHEMA } from "src/interfaces/validators/user/update-user.schema.js";

export type UpdateUserDTO = z.infer<typeof UPDATE_USER_SCHEMA>;
