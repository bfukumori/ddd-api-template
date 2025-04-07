import { NotFoundError } from "@application/_errors/not-found-error.js";
import type { UserRepository } from "@domain/repositories/user-repository.js";
import type { UserDTO } from "src/interfaces/dtos/user/user.dto.js";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ name, age, email, password, id }: UserDTO) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    user.setName(name);
    user.setEmail(email);
    user.setPassword(password);
    user.setAge(age);

    await this.userRepository.update(user);
  }
}
