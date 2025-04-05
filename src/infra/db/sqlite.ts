import { DatabaseSync } from "node:sqlite";
import { CREATE_USER_TABLE_SQL } from "./scripts.js";

export const db = new DatabaseSync("./src/infra/db/data.sqlite");

db.exec(CREATE_USER_TABLE_SQL);

process.on("exit", () => db.close());
