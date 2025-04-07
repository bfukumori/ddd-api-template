import type { UserRepository } from "@domain/repositories/user-repository.js";
import { userMapper } from "src/interfaces/mappers/user-mapper.js";

export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    const users = await this.userRepository.list();

    return users.map(userMapper.toResponse);
  }
}
