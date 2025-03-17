import type { UserRepository } from "@domain/repositories/user-repository.js";

export class ListUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    const users = await this.userRepository.list();

    const usersDTO = users.map((user) => ({
      id: user.getId(),
      name: user.getName(),
      age: user.getAge(),
    }));

    return usersDTO;
  }
}
