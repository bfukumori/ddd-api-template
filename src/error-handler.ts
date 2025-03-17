import type { FastifyInstance } from "fastify";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";

import { ApplicationError } from "@application/_errors/application-error.js";
import { DomainError } from "@domain/_errors/domain-error.js";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = async (
  error,
  _request,
  reply,
) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    const errors = error.validation.map((e) => e.message);

    return reply.status(400).send({
      message: "Validation error",
      errors,
    });
  }

  if (error instanceof DomainError) {
    return reply
      .status(422)
      .send({ message: error.name, error: error.message });
  }

  if (error instanceof ApplicationError) {
    return reply
      .status(error.statusCode)
      .send({ message: error.name, error: error.message });
  }

  return reply.status(500).send({ message: "Internal Server Error" });
};
