const path = require("path");
const os = require("os");

// All supported tools and their default skill location (where synced skills
// are written). Each skill is saved as <location>/<skill-name>.md
const tools = {
  claude: path.join(".claude", "commands"),
  cursor: path.join(".cursor", "rules"),
  gemini: path.join(".gemini"),
};

module.exports = tools;
