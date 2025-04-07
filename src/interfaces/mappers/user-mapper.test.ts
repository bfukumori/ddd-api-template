import assert from "node:assert";

import { describe, it } from "node:test";
import { userMapper } from "./user-mapper.js";

const userDTO = {
  id: "123",
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  password: "Aa#1bcde",
};

describe("User Mapper", () => {
  it("should map UserDTO to User domain entity", () => {
    const user = userMapper.toDomain(userDTO);

    assert.strictEqual(user.getId(), userDTO.id, "ID incorreto no domain");
    assert.strictEqual(
      user.getName(),
      userDTO.name,
      "Nome incorreto no domain",
    );
    assert.strictEqual(
      user.getEmail(),
      userDTO.email,
      "Email incorreto no domain",
    );
    assert.strictEqual(user.getAge(), userDTO.age, "Idade incorreta no domain");
  });
});

it("should map User domain entity to UserDTO response", () => {
  const user = userMapper.toDomain(userDTO);

  const responseDTO = userMapper.toResponse(user);
  const expectedResponse = {
    id: userDTO.id,
    name: userDTO.name,
    email: userDTO.email,
    age: userDTO.age,
  };

  assert.deepStrictEqual(responseDTO, expectedResponse, "toResponse falhou");
  assert.strictEqual(user.getId(), userDTO.id, "ID incorreto no domain");
  assert.strictEqual(
    user.getEmail(),
    userDTO.email,
    "Email incorreto no domain",
  );
});
