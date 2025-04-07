import assert from "node:assert";
import { beforeEach, describe, it } from "node:test";

import { InMemoryUserRepository } from "@infra/repositories/in-memory/in-memory-user-repository.js";
import type { CreateUserDTO } from "src/interfaces/dtos/user/create-user.dto.js";
import { CreateUserUseCase } from "./index.js";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: CreateUserUseCase;
let data: CreateUserDTO;

describe("CreateUserUseCase", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new CreateUserUseCase(inMemoryUserRepository);

    data = {
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      password: "Aa#1bcde",
    };
  });

  it("should create a user", async () => {
    await sut.execute(data);

    const result = await inMemoryUserRepository.list();

    assert.ok(result);
    assert.ok(result[0].getId());
    assert.strictEqual(result.length, 1);
    assert.deepStrictEqual(result[0].getName(), data.name);
    assert.deepStrictEqual(result[0].getAge(), data.age);
    assert.deepStrictEqual(result[0].getEmail(), data.email);
    assert.deepStrictEqual(result[0].getPassword(), data.password);
  });

  it("should throw an error if user alreadyExists", async () => {
    await sut.execute(data);

    await assert.rejects(sut.execute(data));
  });
});
