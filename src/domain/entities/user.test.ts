import assert from "node:assert";
import { beforeEach, describe, it } from "node:test";

import { randomUUID } from "node:crypto";
import { Age } from "@domain/value-objects/age.js";
import { Email } from "@domain/value-objects/email.js";
import { Password } from "@domain/value-objects/password.js";
import type { CreateUserDTO } from "src/interfaces/dtos/user/create-user.dto.js";
import { User } from "./user.js";

let data: CreateUserDTO;

describe("User entity", () => {
  beforeEach(() => {
    data = {
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      password: "Aa#1bcde",
    };
  });

  it("should create a user with a random ID", () => {
    const user = User.create(data);

    assert.ok(user.getId());
    assert.deepStrictEqual(user.getName(), "John Doe");
    assert.deepStrictEqual(user.getAge(), 30);
    assert.deepStrictEqual(user.getEmail(), "johndoe@example.com");
    assert.deepStrictEqual(user.getPassword(), "Aa#1bcde");
  });

  it("should create a user with a prebuild ID", () => {
    const id = randomUUID();
    const user = User.create({ ...data, id });

    assert.ok(user.getId());
    assert.deepStrictEqual(user.getName(), "John Doe");
    assert.deepStrictEqual(user.getAge(), 30);
    assert.deepStrictEqual(user.getEmail(), "johndoe@example.com");
    assert.deepStrictEqual(user.getPassword(), "Aa#1bcde");
  });

  it("should throw an error if user with invalid age", async () => {
    assert.throws(() => new Age(-30));
  });

  it("should throw an error if user with invalid email", async () => {
    assert.throws(() => new Email(""));
  });

  it("should throw an error if user with invalid password", async () => {
    assert.throws(() => new Password("A1!a"), {
      message: "Invalid password. Must be at least 8 characters long.",
    });
    assert.throws(() => new Password("Abc def1!"), {
      message: "Invalid password. Must not contain spaces.",
    });
    assert.throws(() => new Password("abcdef1!"), {
      message: "Invalid password. Must contain at least one uppercase letter.",
    });
    assert.throws(() => new Password("ABCDEF1!"), {
      message: "Invalid password. Must contain at least one lowercase letter.",
    });
    assert.throws(() => new Password("Abcdefg!"), {
      message: "Invalid password. Must contain at least one number.",
    });
    assert.throws(() => new Password("Abcdefg1"), {
      message: "Invalid password. Must contain at least one special character.",
    });
  });
});
