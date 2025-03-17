import type { FastifyInstance } from "fastify";

import { CreateUserUseCase } from "@application/use-cases/create-user/index.js";
import { CreateUserController } from "@infra/controllers/create-user.controller.js";

export const makeCreateUserRoute = (app: FastifyInstance) => {
  const userRepository = app.userRepository;
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController.handle(app);
};
