require("dotenv").config();
const chalk = require("chalk");

const config = {
  api_id: Number(process.env.API_ID),
  api_hash: process.env.API_HASH,
  discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
  sessionFilePath: "./sessions/session.txt",
  monitoredChatIds: [], // Optional: Add chat IDs to filter specific chats
};

function validateConfig(config) {
  let isValid = true;

  if (!config.api_id || isNaN(config.api_id)) {
    console.error(
      chalk.red(
        "Error: Invalid or missing API_ID. Please set it in the .env file."
      )
    );
    isValid = false;
  }
  if (!config.api_hash) {
    console.error(
      chalk.red(
        "Error: Invalid or missing API_HASH. Please set it in the .env file."
      )
    );
    isValid = false;
  }
  if (!config.discordWebhookUrl) {
    console.error(
      chalk.red(
        "Error: Invalid or missing DISCORD_WEBHOOK_URL. Please set it in the .env file."
      )
    );
    isValid = false;
  }

  if (!isValid) {
    process.exit(1); // Exit the process with an error code
  }
}

validateConfig(config);

module.exports = config;
