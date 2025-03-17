export class ApplicationError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
