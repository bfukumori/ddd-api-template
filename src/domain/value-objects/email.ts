import { InvalidEmailError } from "@domain/_errors/invalid-email-error.js";

export class Email {
  #value: string;

  constructor(email: string) {
    Email.validate(email);
    this.#value = email;
  }

  get value() {
    return this.#value;
  }

  static validate(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new InvalidEmailError("Invalid email format.");
    }

    return email;
  }
}
