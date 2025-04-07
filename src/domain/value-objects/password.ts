export class Password {
  #value: string;

  constructor(value: string) {
    Password.validate(value);
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  static validate(password: string) {
    if (password.length < 8) {
      throw new Error("Invalid password. Must be at least 8 characters long.");
    }

    if (password.includes(" ")) {
      throw new Error("Invalid password. Must not contain spaces.");
    }

    if (!/[A-Z]/.test(password)) {
      throw new Error(
        "Invalid password. Must contain at least one uppercase letter.",
      );
    }

    if (!/[a-z]/.test(password)) {
      throw new Error(
        "Invalid password. Must contain at least one lowercase letter.",
      );
    }

    if (!/[0-9]/.test(password)) {
      throw new Error("Invalid password. Must contain at least one number.");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      throw new Error(
        "Invalid password. Must contain at least one special character.",
      );
    }

    return password;
  }
}
