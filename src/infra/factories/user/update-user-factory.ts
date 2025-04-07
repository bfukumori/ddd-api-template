import { UpdateUserUseCase } from "@application/use-cases/update-user/index.js";
import type { FastifyInstance } from "fastify";
import { UpdateUserController } from "src/interfaces/controllers/update-user.controller.js";

export const makeUpdateUserRoute = (app: FastifyInstance) => {
  const userRepository = app.userRepository;
  const updateUsersUseCase = new UpdateUserUseCase(userRepository);
  const updateUsersController = new UpdateUserController(updateUsersUseCase);

  return updateUsersController.handle(app);
};
