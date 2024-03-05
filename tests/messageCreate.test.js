import { Client } from "discord.js";
import assert from "assert";
import { messageCreate } from "../src/messageCreate.js";
import { IntentsBitField } from "discord.js";

export default async function testMessageListener() {
  // Create a new Discord client
  const myIntents = new IntentsBitField();
  myIntents.add(
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  );
  // Attempt to create a new Discord client
  const client = new Client({ intents: myIntents });

  // Simulate the "message" event with a sample message
  const sampleMessage = {
    content: "test",
    author: {
      bot: false,
    },
    reply: (response) => {
      // Check if the response is what you expect
      assert.strictEqual(
        response.replace(/\r?\n|\r/g, ""), // Remove line breaks for comparison
        "You are a helpful assistant.Hello! This is a direct message from the bot."
      );
    },
  };

  // Attach the messageCreate listener
  client.on("messageCreate", async (message) => {
    // Call your messageCreate function
    await messageCreate(message);
  });

  // Emit the "message" event with the sample message
  client.emit("messageCreate", sampleMessage);

  // Ensure the client is logged out after the test (optional)
  setTimeout(() => {
    client.destroy();
  }, 1000); // Adjust the delay as needed
}
