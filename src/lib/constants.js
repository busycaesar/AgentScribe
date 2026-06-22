const os = require("os");

const TOOL_HOME = ".agentscribe";
const SKILL_HOME = "skills";
const ROOT_DIRECTORY = `${os.homedir()}`;

const MARKERS = [".git"];

module.exports = {
  TOOL_HOME,
  SKILL_HOME,
  MARKERS,
  ROOT_DIRECTORY,
};
