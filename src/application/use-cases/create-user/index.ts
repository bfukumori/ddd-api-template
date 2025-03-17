import { ConflictError } from "@application/_errors/conflict-error.js";
import { User } from "@domain/entities/user.js";
import type { UserRepository } from "@domain/repositories/user-repository.js";
import type { CreateUserDTO } from "./create-user.dto.js";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ name, age }: CreateUserDTO) {
    const alreadyExists = await this.userRepository.findByName(name);

    if (alreadyExists) {
      throw new ConflictError("User already exists.");
    }

    const user = User.create(name, age);

    await this.userRepository.save(user);
  }
}
