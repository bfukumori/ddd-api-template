import { DomainError } from "./domain-error.js";

export class InvalidNameError extends DomainError {
  constructor(message = "Invalid name") {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
