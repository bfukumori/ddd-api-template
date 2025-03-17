import assert from "node:assert";
import { beforeEach, describe, it } from "node:test";

import { InMemoryUserRepository } from "@application/repositories/in-memory/in-memory-user-repository.js";
import { User } from "@domain/entities/user.js";
import { ListUsersUseCase } from "./index.js";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: ListUsersUseCase;

describe("ListUsersUseCase", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new ListUsersUseCase(inMemoryUserRepository);
  });

  it("should list users", async () => {
    const data = { name: "John Doe", age: 30 };

    await inMemoryUserRepository.save(User.create(data.name, data.age));

    await sut.execute();

    const result = await inMemoryUserRepository.list();

    assert.strictEqual(result.length, 1);
    assert.deepStrictEqual(result[0].getName(), data.name);
    assert.deepStrictEqual(result[0].getAge(), data.age);
  });

  it("should return an empty array if there is no users", async () => {
    const result = await sut.execute();

    assert.strictEqual(result.length, 0);
  });
});
