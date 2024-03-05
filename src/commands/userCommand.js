// userCommand.js

import { SlashCommandBuilder } from "@discordjs/builders";

const userData = new SlashCommandBuilder()
  .setName("user")
  .setDescription("Get information about the user");

async function userExecute(interaction) {
  try {
    // Extract relevant information from the user
    const userInfo = `Your username: ${interaction.user.username}Your ID: ${interaction.user.id}`;
    await interaction.reply(userInfo);
  } catch (error) {
    console.error("Error fetching user information:", error);
    await interaction.reply(
      "Sorry, there was an error processing your request."
    );
  }
}

export { userData, userExecute };
