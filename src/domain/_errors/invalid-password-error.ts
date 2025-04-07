import { DomainError } from "./domain-error.js";

export class InvalidPasswordError extends DomainError {
  constructor(message = "Invalid password") {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
