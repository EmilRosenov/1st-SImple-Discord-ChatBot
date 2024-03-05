import {
  serverData as testServerData,
  serverExecute as testServerExecute,
} from "../src/commands/serverCommand.js";
import assert from "assert";
import { describe, it } from "node:test";

// ... (previous imports)

const mockClient = {
  guilds: {
    fetch: async (guildId) => {
      // Implement mock guild fetch logic if needed
      return {
        id: 1206989483946418236, // process.env.GUILD_ID,
        name: "Your Mock Guild",
        memberCount: 3,
      };
    },
  },
};

describe("Server Command", () => {
  it("should reply with server information", async () => {
    // return {
    //   id: 1206989483946418236, // process.env.GUILD_ID,
    //   name: "Your Mock Guild",
    //   memberCount: 3,
    // };
    const mockInteraction = {
      reply: async (message) => {
        console.log("Received message:", message); // Log the message
        // Assuming the server information is included in the message
        assert.strictEqual(
          message.includes("TestServer") &&
            message.includes("Total Members: 3"),
          true
        );
      },
    };

    // Execute the server command with the mock client
    await testServerExecute(mockInteraction, mockClient);
  });

  it("should handle errors and reply with an error message", async () => {
    // ... (unchanged)
  });
});
