import type { User } from "@domain/entities/user.js";
import type { UserRepository } from "@domain/repositories/user-repository.js";

export class InMemoryUserRepository implements UserRepository {
  #users: User[] = [];

  async save(user: User): Promise<void> {
    this.#users.push(user);
  }

  async list(): Promise<User[]> {
    return this.#users;
  }

  async findByName(name: string): Promise<User | null> {
    return this.#users.find((user) => user.getName() === name) ?? null;
  }
}
