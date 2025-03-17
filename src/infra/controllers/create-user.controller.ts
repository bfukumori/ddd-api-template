import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import {
  CREATE_USER_SCHEMA_REQUEST,
  CREATE_USER_SCHEMA_RESPONSE,
} from "@application/use-cases/create-user/create-user.schema.js";
import type { CreateUserUseCase } from "@application/use-cases/create-user/index.js";

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
      "/users/create",
      {
        schema: {
          tags: ["users"],
          summary: "Create a new user",
          description: "Create a new user with the given name and age",
          body: CREATE_USER_SCHEMA_REQUEST,
          response: CREATE_USER_SCHEMA_RESPONSE,
        },
      },
      async (request, reply) => {
        const { name, age } = request.body;

        await this.createUserUseCase.execute({ name, age });

        return reply.status(201).send();
      },
    );
  }
}
