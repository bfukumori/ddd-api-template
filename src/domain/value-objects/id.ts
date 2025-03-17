import { randomUUID } from "node:crypto";

import { InvalidIdError } from "@domain/_errors/invalid-id-error.js";

export class Id {
  #value: string;

  constructor(id?: string) {
    if (id && !this.isValidUUID(id)) {
      throw new InvalidIdError("Invalid id. Must be an uuid.");
    }

    this.#value = id ?? randomUUID();
  }

  get value() {
    return this.#value;
  }

  private isValidUUID(id: string) {
    const exp =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    return exp.test(id);
  }
}
