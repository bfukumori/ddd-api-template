import assert from "node:assert";
import { describe, it } from "node:test";

import { randomUUID } from "node:crypto";
import { Age } from "@domain/value-objects/age.js";
import { Id } from "@domain/value-objects/id.js";
import { Name } from "@domain/value-objects/name.js";
import { User } from "./user.js";

describe("User entity", () => {
  it("should create a user with a random ID", () => {
    const age = new Age(30);
    const name = new Name("John Doe");

    const user = User.create(name.value, age.value);

    assert.deepStrictEqual(user.getName(), "John Doe");
    assert.deepStrictEqual(user.getAge(), 30);
  });

  it("should create a user with a prebuild ID", () => {
    const age = new Age(30);
    const name = new Name("John Doe");
    const id = new Id(randomUUID());

    const user = User.restore(name.value, age.value, id.value);

    assert.deepStrictEqual(user.getName(), "John Doe");
    assert.deepStrictEqual(user.getAge(), 30);
    assert.deepStrictEqual(user.getId(), id.value);
  });

  it("should throw an error if user with invalid name", async () => {
    assert.throws(() => new Name(""));
  });

  it("should throw an error if user with invalid age", async () => {
    assert.throws(() => new Age(-30));
  });

  it("should throw an error if user with invalid uuid", async () => {
    assert.throws(() => new Id("1"));
  });
});
