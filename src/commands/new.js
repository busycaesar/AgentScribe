const { execSync } = require("child_process");
const logger = require("../utils/logger");
const sync = require("./sync");
const { skillFileExists, createSkillFile } = require("../lib/store");
const { resolveLocalDirectory } = require("../utils/paths");

async function newSkill(name, local) {
  const localDirectory = resolveLocalDirectory(local);

  // Check if skill already exists
  if (await skillFileExists(name, localDirectory)) {
    logger.error(`A skill named "${name}" already exists.`);
    process.exit(1);
  }

  const filePath = await createSkillFile(name, localDirectory);

  // Open in default editor
  const editor = process.env.EDITOR || process.env.VISUAL || "vim";
  logger.info("Opening in your editor...");

  try {
    execSync(`${editor} "${filePath}"`, { stdio: "inherit" });
  } catch (err) {
    logger.error(
      "Could not open editor. Please set your $EDITOR environment variable.",
    );
    process.exit(1);
  } finally {
    logger.success(`Skill "${name}" saved successfully.`);

    await sync(local);
  }
}

module.exports = newSkill;
