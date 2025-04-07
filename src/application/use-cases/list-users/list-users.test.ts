import assert from "node:assert";
import { beforeEach, describe, it } from "node:test";

import { User } from "@domain/entities/user.js";
import { InMemoryUserRepository } from "@infra/repositories/in-memory/in-memory-user-repository.js";
import type { CreateUserDTO } from "src/interfaces/dtos/user/create-user.dto.js";
import { ListUsersUseCase } from "./index.js";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: ListUsersUseCase;
let data: CreateUserDTO;

describe("ListUsersUseCase", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new ListUsersUseCase(inMemoryUserRepository);
    data = {
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      password: "Aa#1bcde",
    };
  });

  it("should list users", async () => {
    await inMemoryUserRepository.save(User.create(data));

    const result = await sut.execute();

    assert.ok(result[0].id);
    assert.strictEqual(result.length, 1);
    assert.deepStrictEqual(result[0].name, data.name);
    assert.deepStrictEqual(result[0].age, data.age);
    assert.deepStrictEqual(result[0].email, data.email);
  });

  it("should return an empty array if there is no users", async () => {
    const result = await sut.execute();

    assert.strictEqual(result.length, 0);
  });
});
