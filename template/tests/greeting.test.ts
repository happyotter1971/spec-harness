import { describe, expect, it } from "vitest";

import { greet } from "../src/greeting.ts";

describe("greet", () => {
  it("greets by name", () => {
    expect(greet("  Ada ")).toBe("Hello, Ada.");
  });

  it("gives a general greeting for a blank name", () => {
    expect(greet("   ")).toBe("Hello.");
  });
});
