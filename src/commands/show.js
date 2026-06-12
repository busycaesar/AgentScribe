const registry = require("../lib/registry");
const store = require("../lib/store");
const logger = require("../utils/logger");

async function show(name) {
  const skill = await registry.getSkill(name);

  if (!skill) {
    logger.error(`No skill named "${name}". Run \`agentscribe list\` to see all skills.`);
    process.exit(1);
  }

  if (!(await store.skillFileExists(name))) {
    logger.error(`Source file missing for "${name}": ${store.getSkillPath(name)}`);
    process.exit(1);
  }

  const content = await store.readSkill(name);
  console.log(content);
}

module.exports = show;
