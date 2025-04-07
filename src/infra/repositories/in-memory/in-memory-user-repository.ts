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

  async findById(id: string): Promise<User | null> {
    return this.#users.find((user) => user.getId() === id) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.#users.find((user) => user.getEmail() === email) ?? null;
  }

  async update(user: User): Promise<void> {
    const userIndex = this.#users.findIndex((u) => u.getId() === user.getId());

    if (userIndex !== -1) {
      this.#users[userIndex] = user;
    }
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.#users.findIndex((user) => user.getId() === id);

    if (userIndex !== -1) {
      this.#users.splice(userIndex, 1);
    }
  }
}
