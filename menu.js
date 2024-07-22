const input = require("input"); // npm install input
const { monitorChats, getChatId } = require("./index");

async function showMenu() {
  console.log("Please choose an option:");
  console.log("1. Start monitoring chats");
  console.log("2. Get chat ID from messages");

  const choice = await input.text("Enter your choice (1 or 2): ");

  switch (choice) {
    case "1":
      await monitorChats();
      break;
    case "2":
      await getChatId();
      break;
    default:
      console.log("Invalid choice, please enter 1 or 2.");
      showMenu();
      break;
  }
}

showMenu();
