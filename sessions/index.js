const fs = require("fs");
const log = require("../logger");
const { sessionFilePath } = require("../config");

// Function to load the session
function loadSession() {
  if (fs.existsSync(sessionFilePath)) {
    log.info("Loading session from file...");
    return fs.readFileSync(sessionFilePath, "utf8");
  }
  return "";
}

// Function to save the session
function saveSession(session) {
  log.info("Saving session to file...");
  fs.writeFileSync(sessionFilePath, session, "utf8");
}

module.exports = { loadSession, saveSession };
