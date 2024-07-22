const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { api_id, api_hash } = require("../config");
const { loadSession, saveSession } = require("../sessions");
const log = require("../logger");

// Create a new session
const stringSession = new StringSession(loadSession());

const client = new TelegramClient(stringSession, api_id, api_hash, {
  connectionRetries: 5,
});

async function startClient() {
  log.info("Starting Telegram client...");
  await client.start({
    phoneNumber: async () => await prompt("Enter your number: "),
    password: async () => await prompt("Enter your password: "),
    phoneCode: async () => await prompt("Enter the code you received: "),
    onError: (err) => log.error("Error during client start:", err),
  });

  log.info("You should now be connected.");
  saveSession(client.session.save()); // Save session
}

function prompt(question) {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(question, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

module.exports = { client, startClient };
