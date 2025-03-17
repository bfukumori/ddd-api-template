import { Age } from "@domain/value-objects/age.js";
import { Id } from "@domain/value-objects/id.js";
import { Name } from "@domain/value-objects/name.js";

export class User {
  #name: Name;
  #age: Age;
  #id: Id;

  private constructor(name: Name, age: Age, id: Id = new Id()) {
    this.#name = name;
    this.#age = age;
    this.#id = id;
  }

  static create(name: string, age: number) {
    return new User(new Name(name), new Age(age), new Id());
  }

  static restore(name: string, age: number, id: string) {
    return new User(new Name(name), new Age(age), new Id(id));
  }

  getId() {
    return this.#id.value;
  }

  getName() {
    return this.#name.value;
  }

  getAge() {
    return this.#age.value;
  }
}
