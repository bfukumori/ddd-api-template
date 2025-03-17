import { InvalidNameError } from "@domain/_errors/invalid-name-error.js";

export class Name {
  #value: string;

  constructor(name: string) {
    Name.validate(name);
    this.#value = name;
  }

  get value() {
    return this.#value;
  }

  static validate(name: string) {
    const exp = /^[a-zA-Z\s]+$/;

    if (!exp.test(name)) {
      throw new InvalidNameError("Invalid name. Must contain only letters.");
    }

    return name;
  }
}
