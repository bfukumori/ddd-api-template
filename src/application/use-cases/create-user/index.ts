import { ConflictError } from "@application/_errors/conflict-error.js";
import { User } from "@domain/entities/user.js";
import type { UserRepository } from "@domain/repositories/user-repository.js";
import type { CreateUserDTO } from "src/interfaces/dtos/user/create-user.dto.js";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ name, age, email, password }: CreateUserDTO) {
    const alreadyExists = await this.userRepository.findByEmail(email);

    if (alreadyExists) {
      throw new ConflictError("User already exists.");
    }

    const user = User.create({ name, email, age, password });

    await this.userRepository.save(user);
  }
}
