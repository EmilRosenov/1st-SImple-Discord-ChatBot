// import { pingData, pingExecute } from "../src/commands/pingCommand.js";

// import assert from "assert";
// import { describe, it } from "node:test";
// //import {pingData, pingExecute} from ("../src/commands/pingCommand.js");

// describe("Ping Command", () => {
//   it("should have the correct name and description", () => {
//     assert.strictEqual(pingData.data.name, "ping");
//     assert.strictEqual(pingData.data.description, "Replies with Pong!");
//   });

//   it('should reply with "Pong!"', async () => {
//     // Create a mock interaction object (you may need to adjust based on your actual interaction object structure)
//     const mockInteraction = {
//       reply: async (message) => {
//         assert.strictEqual(message, "Pong!");
//       },
//     };

//     // Execute the ping command
//     await pingExecute.execute(mockInteraction);
//   });

//   // Add more tests as needed
// });

import { pingData, pingExecute } from "../src/commands/pingCommand.js";
import assert from "assert";
import { describe, it } from "node:test";

describe("Ping Command", () => {
  it("should have the correct name and description", () => {
    assert.strictEqual(pingData.name, "ping");
    assert.strictEqual(pingData.description, "Replies with Pong!");
  });

  it('should reply with "Pong!"', async () => {
    // Create a mock interaction object (you may need to adjust based on your actual interaction object structure)
    const mockInteraction = {
      reply: async (message) => {
        assert.strictEqual(message, "Pong!");
      },
    };

    // Execute the ping command
    await pingExecute(mockInteraction); // directly invoke the function
  });
});
