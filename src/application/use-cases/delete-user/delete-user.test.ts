import assert from "node:assert";
import { randomUUID } from "node:crypto";
import { beforeEach, describe, it } from "node:test";

import { User } from "@domain/entities/user.js";
import { InMemoryUserRepository } from "@infra/repositories/in-memory/in-memory-user-repository.js";
import { DeleteUserUseCase } from "./index.js";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: DeleteUserUseCase;

describe("DeleteUserUseCase", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new DeleteUserUseCase(inMemoryUserRepository);
  });

  it("should delete a user", async () => {
    const id = randomUUID();
    const user = User.create({
      id,
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      password: "Aa#1bcde",
    });

    await inMemoryUserRepository.save(user);
    const users = await inMemoryUserRepository.list();
    assert.strictEqual(users.length, 1);

    await sut.execute(id);

    assert.strictEqual(users.length, 0);
  });

  it("should throw an error if user not found", async () => {
    await assert.rejects(sut.execute(randomUUID()));
  });
});
