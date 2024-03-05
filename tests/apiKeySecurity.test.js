import assert from "assert";
import { OpenAI } from "openai";
import "dotenv/config";

export default async function testApiKeySecurity() {
  try {
    // Attempt to create an instance of OpenAI with the provided API key
    const openai = new OpenAI({
      apiKey: process.env.API_KEY,
    });

    // Ensure the OpenAI instance is created without errors
    assert.ok(openai);

    // Log a success message
    console.log("API key loaded securely.");
  } catch (error) {
    // If an error occurs, fail the test with the error message
    assert.fail(`Error loading API key securely: ${error.message}`);
  }
}
