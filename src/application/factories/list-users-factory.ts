import type { FastifyInstance } from "fastify";

import { ListUsersController } from "@application/controllers/list-users.controller.js";
import { ListUsersUseCase } from "@application/use-cases/list-users/index.js";

export const makeListUsersRoute = (app: FastifyInstance) => {
  const userRepository = app.userRepository;
  const listUsersUseCase = new ListUsersUseCase(userRepository);
  const listUsersController = new ListUsersController(listUsersUseCase);

  return listUsersController.handle(app);
};
