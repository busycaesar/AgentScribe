const logger = require("../utils/logger");

async function list() {
  const skills = await registry.listSkills();

  if (skills.length === 0) {
    logger.warn("No skills yet. Create one with `agentscribe new`.");
    return;
  }

  logger.info(`Found ${skills.length} skill${skills.length === 1 ? "" : "s"}:`);
  for (const skill of skills) {
    const updated = new Date(skill.updatedAt).toLocaleString();
    console.log(`  ${skill.name} — ${skill.description} (updated ${updated})`);
  }
}

module.exports = list;
