import type { UserRepository } from "@domain/repositories/user-repository.js";

declare module "fastify" {
  interface FastifyInstance {
    userRepository: UserRepository;
  }
}
