import { ApplicationError } from "./application-error.js";

export class ConflictError extends ApplicationError {
  constructor(message: string) {
    super(409, message);
  }
}
