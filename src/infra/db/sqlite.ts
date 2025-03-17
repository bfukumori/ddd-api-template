import { DatabaseSync } from "node:sqlite";

export const db = new DatabaseSync("./src/infra/db/data.sqlite");

db.exec(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL
    )`);

process.on("exit", () => db.close());
