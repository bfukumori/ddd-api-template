import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import type { ListUsersUseCase } from "@application/use-cases/list-users/index.js";
import { LIST_USERS_SCHEMA_RESPONSE } from "@application/use-cases/list-users/list-users.schema.js";

export class ListUsersController {
  constructor(private readonly listUsersUseCase: ListUsersUseCase) {}

  async handle(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/users",
      {
        schema: {
          tags: ["users"],
          summary: "List users",
          description: "List all users",
          response: LIST_USERS_SCHEMA_RESPONSE,
        },
      },
      async (_, reply) => {
        const users = await this.listUsersUseCase.execute();

        return reply.status(200).send({ users });
      },
    );
  }
}
