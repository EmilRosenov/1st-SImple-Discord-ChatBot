// const { Client, Intents } = require("discord.js");
// const OpenAI = require("openai");
// const config = require("./config.json");

// // Your Discord bot token
// const token = config.EMOOTOKEN;

// // Your OpenAI API key
// const openaiApiKey = config.OPEN_AI_KEY;

// // Create a new Discord client
// const client = new Client({
//   intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
// });

// // Initialize the OpenAI API client
// if (!openaiApiKey) {
//   throw new Error(
//     "OpenAI API key is missing. Please provide it in the config file."
//   );
// }
// const openai = new OpenAI({ apiKey: openaiApiKey });

// // Set up event listeners and bot logic
// client.on("ready", () => {
//   console.log(`Logged in as ${client.user.tag}`);
// });

// client.on("messageCreate", async (message) => {
//   // Check if the message is from a bot or if the author is the client itself
//   if (message.author.bot || message.author.id === client.user.id) {
//     return;
//   }

//   // Use OpenAI to generate a response based on the user's message
//   const userMessage = message.content;
//   try {
//     const openaiResponse = await openai.Completions.create({
//       engine: "gpt-3.5-turbo", // You may adjust the engine based on your requirements
//       prompt: userMessage,
//       max_tokens: 50, // Adjust the maximum number of tokens in the response
//     });

//     const botResponse = openaiResponse.data.choices[0].text.trim();

//     // Respond with the generated message
//     message.reply(botResponse);
//   } catch (error) {
//     console.error("Error from OpenAI:", error);
//     message.reply("An error occurred while processing your request.");
//   }
// });

// // Log in to Discord
// client.login(token);

// const { REST, Routes } = require("discord.js");
// const { clientId, guildId, token } = require("./config.json");
// const fs = require("node:fs");
// const path = require("node:path");
// const { SlashCommandBuilder } = require("@discordjs/builders");
// const { Client, Collection, Events, Intents } = require("discord.js");
// const { EMOOTOKEN } = require("./config.json");

// // Create a new client instance
// const client = new Client({
//   intents: [
//     Intents.FLAGS.GUILDS,
//     Intents.FLAGS.GUILD_MESSAGES,
//     // Add other necessary intents here
//   ],
// });

// client.commands = new Collection();

// const commands = [];

// // Function to recursively read command files from a directory
// const readCommands = (directory) => {
//   const commandFiles = fs.readdirSync(directory, { withFileTypes: true });

//   for (const file of commandFiles) {
//     if (file.isDirectory()) {
//       readCommands(path.join(directory, file.name));
//     } else if (file.name.endsWith(".js")) {
//       const command = require(path.join(directory, file.name));
//       if ("data" in command && "execute" in command) {
//         client.commands.set(command.data.name, command);
//         commands.push(command.data.toJSON());
//       } else {
//         console.log(
//           `[WARNING] The command at ${file.name} is missing a required "data" or "execute" property.`
//         );
//       }
//     }
//   }
// };

// const foldersPath = path.join(__dirname, "botCommands");
// const commandFolders = fs.readdirSync(foldersPath);

// for (const folder of commandFolders) {
//   const commandsPath = path.join(foldersPath, folder);
//   const commandFiles = fs
//     .readdirSync(commandsPath)
//     .filter((file) => file.endsWith(".js"));
//   for (const file of commandFiles) {
//     const filePath = path.join(commandsPath, file);
//     const command = require(filePath);
//     // Set a new item in the Collection with the key as the command name and the value as the exported module
//     if ("data" in command && "execute" in command) {
//       client.commands.set(command.data.name, command);
//     } else {
//       console.log(
//         `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
//       );
//     }
//   }
// }

// // When the client is ready, run this code (only once).
// client.once("ready", () => {
//   console.log(`Ready! Logged in as ${client.user.tag}`);
// });

// client.on("interactionCreate", async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   const command = interaction.client.commands.get(interaction.commandName);

//   if (!command) {
//     console.error(`No command matching ${interaction.commandName} was found.`);
//     return;
//   }

//   try {
//     await command.execute(interaction);
//   } catch (error) {
//     console.error(error);
//     if (interaction.replied || interaction.deferred) {
//       await interaction.followUp({
//         content: "There was an error while executing this command!",
//         ephemeral: true,
//       });
//     } else {
//       await interaction.reply({
//         content: "There was an error while executing this command!",
//         ephemeral: true,
//       });
//     }
//   }
// });
// // Log in to Discord with your client's token
// client.login(EMOOTOKEN);

// const { Routes } = require("discord.js");
// const { REST } = require("discord-api-types/v9");
// const fs = require("node:fs");
// const path = require("node:path");
// const { Client, Collection, Intents } = require("discord.js");
// const { EMOOTOKEN, clientId, guildId, token } = require("./config.json");

// // Create a new client instance
// const client = new Client({
//   intents: [
//     Intents.FLAGS.GUILDS,
//     Intents.FLAGS.GUILD_MESSAGES,
//     // Add other necessary intents here
//   ],
// });

// client.commands = new Collection();

// // Function to load commands
// const loadCommands = () => {
//   const commands = [];
//   const foldersPath = path.join(__dirname, "botCommands");
//   const commandFolders = fs.readdirSync(foldersPath);

//   for (const folder of commandFolders) {
//     const commandsPath = path.join(foldersPath, folder);
//     const commandFiles = fs
//       .readdirSync(commandsPath)
//       .filter((file) => file.endsWith(".js"));

//     for (const file of commandFiles) {
//       const filePath = path.join(commandsPath, file);
//       const command = require(filePath);

//       if ("data" in command && "execute" in command) {
//         client.commands.set(command.data.name, command);
//         commands.push(command.data.toJSON());
//       } else {
//         console.log(
//           `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
//         );
//       }
//     }
//   }

//   return commands;
// };

// // When the client is ready, run this code (only once).
// client.once("ready", () => {
//   console.log(`Ready! Logged in as ${client.user.tag}`);

//   // Load commands and register them with Discord API
//   const commands = loadCommands();
//   deployCommands(commands);
// });

// // Event listener for when an interaction is created
// client.on("interactionCreate", async (interaction) => {
//   if (!interaction.isCommand()) return;

//   const command = client.commands.get(interaction.commandName);

//   if (!command) return;

//   try {
//     await command.execute(interaction);
//   } catch (error) {
//     console.error(error);
//     await interaction.reply({
//       content: "There was an error while executing this command!",
//       ephemeral: true,
//     });
//   }
// });

// // Log in to Discord with your client's token
// client.login(EMOOTOKEN);

// // Function to deploy commands using the provided deployment script
// const deployCommands = async (commands) => {
//   try {
//     console.log(
//       `Started refreshing ${commands.length} application (/) commands.`
//     );

//     const rest = new REST().setToken(token);
//     const data = await rest.put(
//       Routes.applicationGuildCommands(clientId, guildId),
//       { body: commands }
//     );

//     console.log(
//       `Successfully reloaded ${data.length} application (/) commands.`
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

const fs = require("fs");
const path = require("path");
const { Client, Collection, Intents } = require("discord.js");
const deployCommands = require("./deploy-commands");
const { EMOOTOKEN } = require("./config.json");

// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    // Add other necessary intents here
  ],
});

client.commands = new Collection();

// Function to load commands
const loadCommands = () => {
  const commands = [];
  const foldersPath = path.join(__dirname, "botCommands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);

      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }

  return commands;
};

// When the client is ready, run this code (only once).
client.once("ready", async () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);

  // Load commands
  const commands = loadCommands();

  // Deploy commands
  deployCommands(commands);
});

// Event listener for when an interaction is created
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Log in to Discord with your client's token
client.login(EMOOTOKEN);
