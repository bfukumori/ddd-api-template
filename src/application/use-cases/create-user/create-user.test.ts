import assert from "node:assert";
import { beforeEach, describe, it } from "node:test";

import { InMemoryUserRepository } from "@infra/repositories/in-memory/in-memory-user-repository.js";
import { CreateUserUseCase } from "./index.js";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: CreateUserUseCase;

describe("CreateUserUseCase", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new CreateUserUseCase(inMemoryUserRepository);
  });

  it("should create a user", async () => {
    const data = { name: "John Doe", age: 30 };

    await sut.execute(data);

    const result = await inMemoryUserRepository.list();

    assert.strictEqual(result.length, 1);
    assert.deepStrictEqual(result[0].getName(), data.name);
    assert.deepStrictEqual(result[0].getAge(), data.age);
  });

  it("should throw an error if user alreadyExists", async () => {
    const data = { name: "John Doe", age: 30 };

    await sut.execute(data);

    await assert.rejects(sut.execute(data));
  });
});
