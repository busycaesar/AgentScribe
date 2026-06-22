const store = require("../lib/store");
const prompt = require("../utils/prompt");
const logger = require("../utils/logger");

async function deleteSkill(name) {
  const skill = await registry.getSkill(name);

  if (!skill) {
    logger.error(
      `No skill named "${name}". Run \`agentscribe list\` to see all skills.`,
    );
    process.exit(1);
  }

  const confirmed = await prompt.confirmAction(
    `Delete skill "${name}"? This cannot be undone.`,
  );

  if (!confirmed) {
    logger.info("Aborted. Nothing was deleted.");
    return;
  }

  await store.deleteSkillFile(name);
  await registry.deleteSkill(name);
  logger.success(`Skill "${name}" deleted.`);
}

module.exports = deleteSkill;
