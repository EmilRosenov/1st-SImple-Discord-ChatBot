// deploy-commands.js
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const path = require("path");

const { CLIENT_ID, GUILD_ID, EMOOTOKEN } = require("./config.json");

const deployCommands = async (commands) => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const rest = new REST({ version: "9" }).setToken(EMOOTOKEN);
    const data = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = deployCommands;
