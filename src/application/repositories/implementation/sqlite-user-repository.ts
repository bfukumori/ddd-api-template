import type { UserDTO } from "@application/use-cases/list-users/list-users.dto.js";
import { User } from "@domain/entities/user.js";
import type { UserRepository } from "@domain/repositories/user-repository.js";
import { db } from "@infra/db/sqlite.js";

export class SQLiteUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    const insert = db.prepare(
      "INSERT INTO users (id, name, age) VALUES (?, ?, ?)",
    );
    insert.run(user.getId(), user.getName(), user.getAge());
  }

  async list(): Promise<User[]> {
    const query = db.prepare("SELECT * FROM users");
    const result = query.all() as UserDTO[];

    return result.map((row) => User.restore(row.name, row.age, row.id));
  }

  async findByName(name: string): Promise<User | null> {
    const query = db.prepare("SELECT * FROM users WHERE name = ?");
    const result = query.get(name) as UserDTO | null;

    if (!result) {
      return null;
    }

    return User.restore(result.name, result.age, result.id);
  }
}
