import { DomainError } from "./domain-error.js";

export class InvalidIdError extends DomainError {
  constructor(message = "Invalid id") {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
