const fs = require("fs-extra");
const path = require("path");
const tools = require("../lib/tools");
const logger = require("../utils/logger");
const { listSkills, copySkills } = require("../lib/store");

async function sync(local) {
  let localDirectory = undefined;

  if (local) {
    localDirectory = process.cwd();
  }

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
