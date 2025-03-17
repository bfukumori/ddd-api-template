import type { FastifyInstance } from "fastify";

import { CreateUserController } from "@application/controllers/create-user.controller.js";
import { CreateUserUseCase } from "@application/use-cases/create-user/index.js";

export const makeCreateUserRoute = (app: FastifyInstance) => {
  const userRepository = app.userRepository;
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController.handle(app);
};
