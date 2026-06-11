const fs = require("fs-extra");
const path = require("path");
const registry = require("../lib/registry");
const tools = require("../lib/tools");
const logger = require("../utils/logger");

async function sync() {
  const skills = await registry.listSkills();

  if (skills.length === 0) {
    logger.warn("No skills to sync. Create one with `agentscribe new`.");
    return;
  }

  for (const [toolName, targetDir] of Object.entries(tools)) {
    await fs.ensureDir(targetDir);

    let count = 0;
    for (const skill of skills) {
      if (!(await fs.pathExists(skill.filePath))) {
        logger.warn(
          `Skipping "${skill.name}" — source file not found: ${skill.filePath}`,
        );
        continue;
      }
      const dest = path.join(targetDir, `${skill.name}.md`);
      await fs.copy(skill.filePath, dest);
      count++;
    }

    logger.success(
      `Synced ${count} skill${count === 1 ? "" : "s"} to ${toolName} (${targetDir}).`,
    );
  }
}

module.exports = sync;
