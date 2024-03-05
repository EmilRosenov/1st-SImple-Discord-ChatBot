// serverCommand.js

import { SlashCommandBuilder } from "@discordjs/builders";
import { client } from "../index.js";

const serverData = new SlashCommandBuilder()
  .setName("server")
  .setDescription("Get information about the server");

async function serverExecute(interaction, client) {
  try {
    console.log("Executing server command");
    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    console.log("Guild fetched:", guild);
    const serverInfo = `Server Name: ${guild.name} Total Members: ${guild.memberCount}`;
    await interaction.reply(serverInfo);
  } catch (error) {
    console.error("Error fetching server information:", error);
    await interaction.reply(
      "Sorry, there was an error processing your request."
    );
  }
}

export { serverData, serverExecute };
