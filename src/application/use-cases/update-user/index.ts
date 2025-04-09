import { NotFoundError } from "@application/_errors/not-found-error.js";
import type { UserRepository } from "@domain/repositories/user-repository.js";
import type { UpdateUserDTO } from "src/interfaces/dtos/user/update-user.dto.js";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ name, age, email, password, id }: UpdateUserDTO) {
    const user = await this.userRepository.findById(id);
    let updated = false;

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    if (name) {
      user.setName(name);
      updated = true;
    }

    if (email) {
      user.setEmail(email);
      updated = true;
    }

    if (password) {
      user.setPassword(password);
      updated = true;
    }

    if (age) {
      user.setAge(age);
      updated = true;
    }

    if (updated) {
      await this.userRepository.update(user);
    }
  }
}
