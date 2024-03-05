import { SlashCommandBuilder } from "@discordjs/builders";

const data = new SlashCommandBuilder()
  .setName("hi")
  .setDescription("Hello, nice to see you!");

async function execute(interaction) {
  await interaction.reply("Good moaning!");
}

export { data, execute };
