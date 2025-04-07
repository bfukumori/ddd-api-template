import type { User } from "@domain/entities/user.js";
import type { UserRepository } from "@domain/repositories/user-repository.js";
import { db } from "@infra/db/sqlite.js";
import type { UserDTO } from "src/interfaces/dtos/user/user.dto.js";
import { userMapper } from "src/interfaces/mappers/user-mapper.js";

export class SQLiteUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    const insert = db.prepare(
      "INSERT INTO users (id, name, email, age, password) VALUES (?, ?, ?, ?, ?)",
    );
    insert.run(
      user.getId(),
      user.getName(),
      user.getEmail(),
      user.getAge(),
      user.getPassword(),
    );
  }

  async list(): Promise<User[]> {
    const query = db.prepare(
      "SELECT id, name, email, age, password FROM users",
    );
    const result = query.all() as UserDTO[];

    return result.map((row) => userMapper.toDomain(row));
  }

  async findById(id: string): Promise<User | null> {
    const query = db.prepare(
      "SELECT id, name, email, age, password FROM users WHERE id = ?",
    );
    const result = query.get(id) as UserDTO | null;

    if (!result) {
      return null;
    }

    return userMapper.toDomain(result);
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = db.prepare(
      "SELECT id, name, email, age, password FROM users WHERE email = ?",
    );
    const result = query.get(email) as UserDTO | null;

    if (!result) {
      return null;
    }

    return userMapper.toDomain(result);
  }

  async update(user: User): Promise<void> {
    const update = db.prepare(
      "UPDATE users SET name = ?, email = ?, age = ?, password = ? WHERE id = ?",
    );
    update.run(
      user.getName(),
      user.getEmail(),
      user.getAge(),
      user.getPassword(),
      user.getId(),
    );
  }

  async delete(id: string): Promise<void> {
    const deleteUser = db.prepare("DELETE FROM users WHERE id = ?");
    deleteUser.run(id);
  }
}
