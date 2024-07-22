const { client, startClient } = require("./telegram/client");
const {
  handleNewMessage,
  handleShortChatMessage,
} = require("./handlers/messageHandler");
const log = require("./logger");
const { safeStringify } = require("./telegram/utils");
const { monitoredChatIds } = require("./config");

async function monitorChats() {
  await startClient();

  client.addEventHandler(async (update) => {
    log.info(
      "Received update:",
      JSON.stringify(safeStringify(update), null, 2)
    );

    if (
      (update.className === "UpdateNewChannelMessage" ||
        update.className === "UpdateNewMessage") &&
      update.message
    ) {
      const chatId = update.message.peerId.chatId
        ? update.message.peerId.chatId.toString()
        : update.message.peerId.channelId.toString();
      if (monitoredChatIds.length === 0 || monitoredChatIds.includes(chatId)) {
        log.info("Processing new message from monitored chat...");
        await handleNewMessage(update.message);
      } else {
        log.info("Message from unmonitored chat, ignoring...");
      }
    } else if (update.className === "UpdateShortChatMessage") {
      const chatId = update.peerId.chatId.toString();
      if (monitoredChatIds.length === 0 || monitoredChatIds.includes(chatId)) {
        log.info("Processing short chat message from monitored chat...");
        await handleShortChatMessage(update);
      } else {
        log.info("Short chat message from unmonitored chat, ignoring...");
      }
    } else {
      log.warn(
        "Update is not a new channel message, new message, or short chat message."
      );
    }
  });
}

async function getChatId() {
  await startClient();

  client.addEventHandler(async (update) => {
    if (update.message && update.message.peerId) {
      const chatId = update.message.peerId.chatId
        ? update.message.peerId.chatId.toString()
        : update.message.peerId.channelId.toString();
      const messagePreview = update.message.message.slice(0, 50); // Log the first 50 characters of the message
      log.info(`Chat ID: '${chatId}', Message Preview: '${messagePreview}'`);
    }
  });

  console.log("Listening for messages to get chat ID. Press Ctrl+C to exit.");
}

module.exports = { monitorChats, getChatId };
