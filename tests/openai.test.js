// tests/openai.test.js
import { OpenAI } from "openai";
import assert from "assert";

export default async function testOpenAIIntegration() {
  // Replace 'YOUR_API_KEY' with your actual OpenAI API key or set it as an environment variable
  //const apiKey = process.env.API_KEY;

  // Create an instance of OpenAI with the provided API key
  const openai = new OpenAI({
    apiKey: process.env.API_KEY,
  });

  // Sample user message
  const userMessage = "Tell me a joke.";

  try {
    // Attempt to generate a chat completion using OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userMessage },
      ],
    });

    // Check if the response contains the expected structure
    assert.ok(
      response &&
        response.choices &&
        response.choices[0] &&
        response.choices[0].message.content
    );

    // Log the generated completion for reference
    console.log("Generated completion:", response.choices[0].message.content);
  } catch (error) {
    // If an error occurs, fail the test with the error message
    assert.fail(`Error generating OpenAI response: ${error.message}`);
  }
}
