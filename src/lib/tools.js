const path = require("path");
const os = require("os");

// All supported tools and their default skill location (where synced skills
// are written). Each skill is saved as <location>/<skill-name>.md
const tools = {
  claude: path.join(os.homedir(), ".claude", "commands"),
  cursor: path.join(os.homedir(), ".cursor", "rules"),
  gemini: path.join(os.homedir(), ".gemini"),
};

module.exports = tools;
