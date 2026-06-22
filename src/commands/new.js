const inquirer = require("inquirer").default;
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");
const logger = require("../utils/logger");
const sync = require("./sync");
const { skillFileExists, createSkillFile } = require("../lib/store");

const SKILLS_DIR = path.join(os.homedir(), ".agentscribe", "skills");

async function newSkill(name, local) {
  let localDirectory = null;

  if (local) {
    localDirectory = process.cwd();
  }

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

    // await sync();
  }
}

module.exports = newSkill;
