// botInitialization.test.js
import { Client } from "discord.js";
import assert from "assert";
import { IntentsBitField } from "discord.js";

export default function testBotInitialization() {
  // Specify the intents your bot needs
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

  // Add a listener for the ready event
  client.once("ready", () => {
    // Check if the client is ready
    assert.ok(client.isReady());

    // Log a success message
    console.log("Discord client initialized and logged in successfully.");

    // Ensure the client is logged out after the test (optional)
    setTimeout(() => {
      client.destroy();
    }, 1000); // Adjust the delay as needed
  });

  // Log in the client using the provided token
  client.login(process.env.TOKEN);
}

// Run the test

import "dotenv/config";

testBotInitialization();
