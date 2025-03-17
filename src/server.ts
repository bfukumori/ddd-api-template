import type { FastifyInstance } from "fastify";

import { env } from "@infra/_env/env.js";
import { app } from "./app.js";

const handleShutdown = async (fastify: FastifyInstance, signal: string) => {
  console.log(`Received ${signal}, shutting down gracefully...`);

  await fastify.close();
  console.log("✅ Server closed. Exiting process.");
  process.exit(0);
};

const setupSignalHandlers = (fastify: FastifyInstance) => {
  process.once("SIGINT", () => handleShutdown(fastify, "SIGINT"));
  process.once("SIGTERM", () => handleShutdown(fastify, "SIGTERM"));
};

const start = async () => {
  try {
    await app.listen({ port: env.PORT });
    console.log(`✅ Server is running on port ${env.PORT}`);
    setupSignalHandlers(app);
  } catch (error) {
    console.error("❌", error);
    process.exit(1);
  }
};

start();
