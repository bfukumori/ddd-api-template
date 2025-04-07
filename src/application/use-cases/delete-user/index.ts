import { NotFoundError } from "@application/_errors/not-found-error.js";
import type { UserRepository } from "@domain/repositories/user-repository.js";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    await this.userRepository.delete(id);
  }
}
