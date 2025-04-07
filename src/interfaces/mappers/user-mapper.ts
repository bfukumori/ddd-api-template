import { User } from "@domain/entities/user.js";
import type { UserDTO } from "../dtos/user/user.dto.js";

export const userMapper = {
  toDomain(dto: UserDTO): User {
    return User.create(dto);
  },

  toResponse(user: User): Omit<UserDTO, "password"> {
    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      age: user.getAge(),
    };
  },
};
