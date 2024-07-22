const axios = require("axios");
const { client } = require("../telegram/client");
const log = require("../logger");
const { discordWebhookUrl } = require("../config");

async function handleNewMessage(message) {
  const text = message.message;
  const fromId = message.fromId ? message.fromId.userId : "unknown";
  const chatId = message.peerId
    ? message.peerId.chatId || message.peerId.channelId
    : "unknown";

  log.info("Processing new message:", text);
  log.info("From ID:", fromId);
  log.info("Chat ID:", chatId);

  let senderName = fromId;
  let chatName = chatId;

  // Get chat details
  if (message.peerId && message.peerId.channelId) {
    try {
      const channel = await client.getEntity(message.peerId.channelId);
      chatName = channel.title || "unknown";
      log.info("Channel name:", chatName);
    } catch (err) {
      log.error("Error getting channel entity:", err);
      chatName = "unknown";
    }
  }

  // Get user details
  if (message.fromId && message.fromId.userId) {
    try {
      const user = await getUserEntity(client, message.fromId.userId);
      senderName = `${user.firstName} ${user.lastName || ""}`.trim();
      log.info("Sender name:", senderName);
    } catch (err) {
      log.error("Error getting user entity:", err);
      senderName = "unknown";
    }
  }

  log.info(`Message received from ${senderName} in chat ${chatName}: ${text}`);

  // Send message to Discord
  await sendToDiscord(senderName, chatName, text);
}

async function handleShortChatMessage(update) {
  const text = update.message;
  const fromId = update.fromId ? update.fromId.userId : "unknown";
  const chatId = update.peerId ? update.peerId.chatId : "unknown";

  log.info("Processing short chat message:", text);
  log.info("From ID:", fromId);
  log.info("Chat ID:", chatId);

  let senderName = fromId;
  let chatName = chatId;

  // Get chat details
  if (update.peerId) {
    try {
      const chat = await client.getEntity(update.peerId.chatId);
      chatName = chat.title || "unknown";
      log.info("Chat name:", chatName);
    } catch (err) {
      log.error("Error getting chat entity:", err);
      chatName = "unknown";
    }
  }

  // Get user details
  if (update.fromId) {
    try {
      const user = await getUserEntity(client, update.fromId);
      senderName = `${user.firstName} ${user.lastName || ""}`.trim();
      log.info("Sender name:", senderName);
    } catch (err) {
      log.error("Error getting user entity:", err);
      senderName = "unknown";
    }
  }

  log.info(`Message received from ${senderName} in chat ${chatName}: ${text}`);

  // Send message to Discord
  await sendToDiscord(senderName, chatName, text);
}

async function sendToDiscord(senderName, chatName, text) {
  log.info("Sending message to Discord...");
  axios
    .post(discordWebhookUrl, {
      content: `Message from ${senderName} in Telegram chat ${chatName}: ${text}`,
    })
    .then((response) => {
      log.info("Message sent to Discord successfully");
    })
    .catch((error) => {
      log.error("Error sending message to Discord:", error);
    });
}

async function getUserEntity(client, userId) {
  try {
    return await client.getEntity(userId);
  } catch (err) {
    log.warn(
      `Could not get user entity from cache for userId ${userId}, trying to fetch directly...`
    );
    // Try to fetch the user entity directly by creating an input user
    const inputUser = {
      _: "inputUser",
      user_id: userId,
      access_hash: 0, // Access hash is required, but if unknown, it can be set to 0 (might not always work)
    };
    return await client
      .invoke({
        _: "users.getUsers",
        id: [inputUser],
      })
      .then((result) => result[0])
      .catch((error) => {
        log.error("Failed to get user entity directly:", error);
        throw error;
      });
  }
}

module.exports = { handleNewMessage, handleShortChatMessage };
