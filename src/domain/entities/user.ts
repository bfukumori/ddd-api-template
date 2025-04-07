import { randomUUID } from "node:crypto";
import { Age } from "@domain/value-objects/age.js";
import { Email } from "@domain/value-objects/email.js";
import { Password } from "@domain/value-objects/password.js";

export class User {
  constructor(
    private _name: string,
    private _email: Email,
    private _age: Age,
    private _password: Password,
    private readonly _id: string,
  ) {}

  static create({
    name,
    email,
    age,
    password,
    id = randomUUID(),
  }: {
    name: string;
    email: string;
    age: number;
    password: string;
    id?: string;
  }) {
    return new User(
      name,
      new Email(email),
      new Age(age),
      new Password(password),
      id,
    );
  }

  getId() {
    return this._id;
  }

  getName() {
    return this._name;
  }

  setName(name: string) {
    this._name = name;
  }

  setEmail(email: string) {
    this._email = new Email(email);
  }

  setAge(age: number) {
    this._age = new Age(age);
  }

  setPassword(password: string) {
    this._password = new Password(password);
  }

  getEmail() {
    return this._email.value;
  }

  getAge() {
    return this._age.value;
  }

  getPassword() {
    return this._password.value;
  }
}
