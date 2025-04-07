import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import type { DeleteUserUseCase } from "@application/use-cases/delete-user/index.js";
import { DELETE_USER_SCHEMA_RESPONSE } from "../validators/user/delete-user.schema.js";
import { USER_PARAMS_SCHEMA } from "../validators/user/user.schema.js";

export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  async handle(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().delete(
      "/users/:id/delete",
      {
        schema: {
          tags: ["users"],
          summary: "Delete a user",
          description: "Delete a user with the given ID",
          params: USER_PARAMS_SCHEMA,
          response: DELETE_USER_SCHEMA_RESPONSE,
        },
      },
      async (request, reply) => {
        const { id } = request.params;

        await this.deleteUserUseCase.execute(id);

        return reply.status(204).send();
      },
    );
  }
}
