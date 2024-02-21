const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hi")
    .setDescription("Hello, nice to see you!"),
  async execute(interaction) {
    await interaction.reply("Hello, nice to see you!");
  },
};
