import testDiscordIntegration from "./discordIntegration.test.js";
import testOpenAIIntegration from "./openai.test.js";
import testApiKeySecurity from "./apiKeySecurity.test.js";
import testBotInitialization from "./botInitialization.test.js";
//import testMessageListener from "./tests/messageCreate.test.js";
// import "./hiCommand.test.js";
import "dotenv/config";

testDiscordIntegration();
testOpenAIIntegration();
testApiKeySecurity();
testBotInitialization();
//testMessageListener();
// runHiTests();
