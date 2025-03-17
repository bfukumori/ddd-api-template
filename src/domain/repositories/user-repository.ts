import type { User } from "@domain/entities/user.js";

export interface UserRepository {
  save(user: User): Promise<void>;
  list(): Promise<User[]>;
  findByName(name: string): Promise<User | null>;
}
