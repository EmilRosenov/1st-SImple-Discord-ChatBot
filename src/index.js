import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import { messageCreate } from "./messageCreate.js";
import { IntentsBitField } from "discord.js";
import { execute } from "./commands/hiCommand.js";
import { serverData, serverExecute } from "./commands/serverCommand.js";

const myIntents = new IntentsBitField();
myIntents.add(
  IntentsBitField.Flags.GuildPresences,
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMembers,
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.MessageContent
);

const client = new Client({ intents: myIntents });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Use interactionCreate instead of messageCreate
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "hi") {
    await execute(interaction); // Handle /hi command
  } else if (commandName === "server") {
    await serverExecute(interaction); // Handle /hi command
  } else if (commandName === "user") {
    await userExecute(interaction); // Handle /hi command
  }
});

client.on("messageCreate", async (message) => {
  messageCreate(message);
});

client.login(process.env.TOKEN);

export { client };
