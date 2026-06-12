const { execSync } = require("child_process");
const registry = require("../lib/registry");
const store = require("../lib/store");
const logger = require("../utils/logger");

async function edit(name) {
  const skill = await registry.getSkill(name);

  if (!skill) {
    logger.error(`No skill named "${name}". Run \`agentscribe list\` to see all skills.`);
    process.exit(1);
  }

  if (!(await store.skillFileExists(name))) {
    logger.error(`Source file missing for "${name}": ${store.getSkillPath(name)}`);
    process.exit(1);
  }

  const filePath = store.getSkillPath(name);
  const editor = process.env.EDITOR || process.env.VISUAL || "vim";
  logger.info("Opening in your editor...");

  try {
    execSync(`${editor} "${filePath}"`, { stdio: "inherit" });
  } catch (err) {
    logger.error(
      "Could not open editor. Please set your $EDITOR environment variable.",
    );
    process.exit(1);
  }

  await registry.updateSkill(name, {});
  logger.success(`Skill "${name}" updated. Run \`agentscribe sync\` to propagate changes.`);
}

module.exports = edit;
