import fastify from "fastify";
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { makeCreateUserRoute } from "@application/factories/create-user-factory.js";
import { makeListUsersRoute } from "@application/factories/list-users-factory.js";
import { SQLiteUserRepository } from "@application/repositories/implementation/sqlite-user-repository.js";
import { errorHandler } from "./error-handler.js";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

app.decorate("userRepository", new SQLiteUserRepository());

app.register(makeCreateUserRoute);
app.register(makeListUsersRoute);
