import { OpenAI } from "openai";
import { pingExecute } from "./commands/pingCommand.js";

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

let messageSent = false;

export const messageCreate = async (message) => {
  if (message.author.bot) return;

  // Check if the message is a command
  if (message.content.startsWith("/")) {
    const [command, ...args] = message.content.slice(1).split(" ");

    // Handle other commands here if needed

    if (command === "ping") {
      // Handle /ping command
      await pingExecute(message);
    } else if (command === "hi") {
      // Handle /hi command separately
      await message.reply("Good moaning!");
      return; // Exit early to avoid the OpenAI response
    }
  }

  try {
    // Assuming you want to send the user's message to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message.content },
      ],
    });

    //console.log(response);
    const botResponse = response.choices[0].message.content;
    await message.reply(botResponse);
  } catch (error) {
    console.error("Error generating OpenAI response:", error);
    await message.channel.send(
      "Sorry, there was an error processing your request."
    );
  }

  // Send a typing indicator before processing the next message
  await message.channel.sendTyping();

  const user = message.author;

  if (!messageSent) {
    user.send("Hello! This is a direct message from the bot.");
    messageSent = true;
  }
};
