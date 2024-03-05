import { SlashCommandBuilder } from "@discordjs/builders";

const pingData = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

async function pingExecute(interaction) {
  await interaction.reply("Pong!");
}

export { pingData, pingExecute };
