import { DomainError } from "./domain-error.js";

export class InvalidAgeError extends DomainError {
  constructor(message = "Invalid age") {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
