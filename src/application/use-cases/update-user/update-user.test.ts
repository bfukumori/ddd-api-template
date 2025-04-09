import assert from "node:assert";
import { randomUUID } from "node:crypto";
import { beforeEach, describe, it } from "node:test";

import { User } from "@domain/entities/user.js";
import { InMemoryUserRepository } from "@infra/repositories/in-memory/in-memory-user-repository.js";
import type { UpdateUserDTO } from "src/interfaces/dtos/user/update-user.dto.js";
import { UpdateUserUseCase } from "./index.js";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: UpdateUserUseCase;
let data: UpdateUserDTO;

describe("UpdateUserUseCase", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new UpdateUserUseCase(inMemoryUserRepository);
  });

  it("should update a user", async () => {
    const id = randomUUID();
    const user = User.create({
      id,
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      password: "Aa#1bcde",
    });

    await inMemoryUserRepository.save(user);

    data = {
      name: "Jane Doe",
      age: 25,
      email: "janedoe@example.com",
      password: "Aa#1bcde",
      id,
    };

    await sut.execute(data);

    const result = await inMemoryUserRepository.findById(id);

    assert.ok(result);
    assert.strictEqual(result.getId(), id);
    assert.deepStrictEqual(result.getName(), data.name);
    assert.deepStrictEqual(result.getAge(), data.age);
    assert.deepStrictEqual(result.getEmail(), data.email);
    assert.deepStrictEqual(result.getPassword(), data.password);
  });

  it("should throw an error if user not found", async () => {
    await assert.rejects(sut.execute({ ...data, id: randomUUID() }));
  });
});
