import { data, execute } from "../src/commands/hiCommand.js";
import assert from "assert";
import { describe, it } from "node:test";

describe("Hi Command", () => {
  it("should have the correct name and description", () => {
    assert.strictEqual(data.name, "hi");
    assert.strictEqual(data.description, "Hello, nice to see you!");
  });

  it('should reply with "Good moaning!"', async () => {
    // Create a mock interaction object (you may need to adjust based on your actual interaction object structure)
    const mockInteraction = {
      reply: async (message) => {
        assert.strictEqual(message, "Good moaning!");
      },
    };

    // Execute the hi command
    await execute(mockInteraction);
  });

  // Add more tests as needed
});
