const path = require("path");
const os = require("os");

const homedir = os.homedir();

// All supported tools and their default skill location (where synced skills
// are written). Each skill is saved as <location>/<skill-name>.md
const tools = {
  claude: path.join(homedir, ".claude", "commands"),
  cursor: path.join(homedir, ".cursor", "rules"),
  gemini: path.join(homedir, ".gemini"),
};

module.exports = tools;
