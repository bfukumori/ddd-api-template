import fastify from "fastify";
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { makeCreateUserRoute } from "@infra/factories/user/create-user-factory.js";
import { makeDeleteUserRoute } from "@infra/factories/user/delete-user-factory.js";
import { makeListUsersRoute } from "@infra/factories/user/list-users-factory.js";
import { makeUpdateUserRoute } from "@infra/factories/user/update-user-factory.js";
import { SQLiteUserRepository } from "@infra/repositories/implementation/sqlite-user-repository.js";
import { errorHandler } from "./error-handler.js";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "DDD API",
      description: "DDD API Documentation",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.setErrorHandler(errorHandler);

app.decorate("userRepository", new SQLiteUserRepository());

app.register(makeCreateUserRoute);
app.register(makeListUsersRoute);
app.register(makeUpdateUserRoute);
app.register(makeDeleteUserRoute);
