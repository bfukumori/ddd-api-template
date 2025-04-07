import { DeleteUserUseCase } from "@application/use-cases/delete-user/index.js";
import type { FastifyInstance } from "fastify";
import { DeleteUserController } from "src/interfaces/controllers/delete-user.controller.js";

export const makeDeleteUserRoute = (app: FastifyInstance) => {
  const userRepository = app.userRepository;
  const deleteUserUseCase = new DeleteUserUseCase(userRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  return deleteUserController.handle(app);
};
