const tools = require("../lib/tools");
const logger = require("../utils/logger");
const { listSkills, copySkills } = require("../lib/store");
const { resolveLocalDirectory } = require("../utils/paths");

async function sync(local) {
  const localDirectory = resolveLocalDirectory(local);

  const skills = await listSkills(localDirectory);

  for (const [toolName, targetPath] of Object.entries(tools)) {
    const count = skills.length;

    await copySkills(skills, targetPath, localDirectory);

    logger.success(
      `Synced ${count} skill${count === 1 ? "" : "s"} to ${toolName} (${targetPath}).`,
    );
  }
}

module.exports = sync;
