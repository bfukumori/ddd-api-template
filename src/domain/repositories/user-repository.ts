import type { User } from "@domain/entities/user.js";

export interface UserRepository {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
  list(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
