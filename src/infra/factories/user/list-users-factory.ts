import type { FastifyInstance } from "fastify";

import { ListUsersUseCase } from "@application/use-cases/list-users/index.js";
import { ListUsersController } from "src/interfaces/controllers/list-users.controller.js";

export const makeListUsersRoute = (app: FastifyInstance) => {
  const userRepository = app.userRepository;
  const listUsersUseCase = new ListUsersUseCase(userRepository);
  const listUsersController = new ListUsersController(listUsersUseCase);

  return listUsersController.handle(app);
};
