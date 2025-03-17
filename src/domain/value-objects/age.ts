import { InvalidAgeError } from "@domain/_errors/invalid-age-error.js";

export class Age {
  #value: number;

  constructor(age: number) {
    Age.validate(age);
    this.#value = age;
  }

  get value() {
    return this.#value;
  }

  static validate(age: number) {
    if (age < 0) {
      throw new InvalidAgeError("Invalid age. Must be above 0.");
    }

    return age;
  }
}
