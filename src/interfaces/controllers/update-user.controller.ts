import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import type { UpdateUserUseCase } from "@application/use-cases/update-user/index.js";
import { UPDATE_USER_SCHEMA_RESPONSE } from "../validators/user/update-user.schema.js";
import {
  USER_PARAMS_SCHEMA,
  USER_SCHEMA_WITHOUT_ID,
} from "../validators/user/user.schema.js";

export class UpdateUserController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  async handle(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put(
      "/users/:id/update",
      {
        schema: {
          tags: ["users"],
          summary: "Update a user",
          description: "Update a user with new details",
          params: USER_PARAMS_SCHEMA,
          body: USER_SCHEMA_WITHOUT_ID,
          response: UPDATE_USER_SCHEMA_RESPONSE,
        },
      },
      async (request, reply) => {
        const { name, age, email, password } = request.body;
        const { id } = request.params;

        await this.updateUserUseCase.execute({
          name,
          age,
          email,
          password,
          id,
        });

        return reply.status(200).send();
      },
    );
  }
}
