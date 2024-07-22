# Telegram to Discord Monitor

This project monitors specific Telegram group chats and forwards messages to a Discord webhook. It also provides functionality to get the chat ID of Telegram groups.

## Table of Contents

- [Telegram to Discord Monitor](#telegram-to-discord-monitor)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Project](#running-the-project)
  - [Getting Telegram API ID and Hash](#getting-telegram-api-id-and-hash)
  - [Getting Chat IDs](#getting-chat-ids)
  - [Monitoring Chats](#monitoring-chats)
  - [Optional Chat ID Filtering](#optional-chat-id-filtering)
  - [License](#license)

## Features

- Monitors specified Telegram group chats and forwards messages to a Discord webhook.
- Provides an interactive menu to either start monitoring or get chat IDs from incoming messages.
- Uses Telegram's MTProto API for secure communication.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- A Telegram account
- A Discord account and webhook URL

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/saschadotcom/telegram-to-discord-monitor.git
   cd telegram-to-discord-monitor
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

## Configuration

1. **Create a `.env` file**:

   Create a file named `.env` in the root directory of your project with the following content:

   ```plaintext
   API_ID=your_actual_api_id
   API_HASH=your_actual_api_hash
   DISCORD_WEBHOOK_URL=your_discord_webhook_url
   ```

2. **Update the `config/index.js` file**:

   The `config/index.js` file is already set up to read from the `.env` file and validate the configuration values. If any of the required values are missing or invalid, a clear and colored error message will be displayed, and the process will exit.

## Running the Project

1. **Start the interactive menu**:

   ```sh
   npm start
   ```

   The menu will provide options to either start monitoring the chats or get chat IDs from incoming messages.

## Getting Telegram API ID and Hash

1. **Log in to [my.telegram.org](https://my.telegram.org)**:

   - Use your Telegram account credentials to log in.

2. **Create a new application**:

   - Fill in the required fields to create a new application. This will provide you with an API ID and an API Hash.

3. **Copy your API ID and API Hash**:
   - Use these values in the `.env` file.

## Getting Chat IDs

To get the chat IDs of the Telegram groups you want to monitor, follow these steps:

1. **Run the interactive menu** and select the option to get chat IDs:

   ```sh
   npm start
   ```

2. **Send a message in the Telegram group** you want to monitor. The chat ID and a preview of the message will be logged in the console in the following format:

   ```
   [INFO] - Chat ID: '1234567890', Message Preview: 'Hello, this is a test message...'
   ```

3. **Copy the chat ID** from the console output and add it to the `monitoredChatIds` array in the `config/index.js` file.

## Monitoring Chats

1. **Run the interactive menu** and select the option to start monitoring chats:

   ```sh
   npm start
   ```

2. The script will now monitor the specified chats and forward messages to the configured Discord webhook. If no chat IDs are specified, the script will monitor all incoming messages.

## Optional Chat ID Filtering

If you want to monitor specific Telegram group chats, you can add their chat IDs to the `monitoredChatIds` array in the `config/index.js` file. If you leave the `monitoredChatIds` array empty, the script will monitor all incoming messages without filtering.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Notes:

- Replace `your_actual_api_id`, `your_actual_api_hash`, and `your_discord_webhook_url` with your actual values.
- Ensure you keep your `API_ID` and `API_HASH` secure and do not share them publicly.
