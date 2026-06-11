const inquirer = require("inquirer").default;
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");
const registry = require("../lib/registry");
const logger = require("../utils/logger");

const SKILLS_DIR = path.join(os.homedir(), ".agentscribe", "skills");

async function newSkill() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Skill name:",
      validate: (value) => {
        if (!value.trim()) return "Skill name is required.";
        if (!/^[a-z0-9-]+$/.test(value))
          return "Only lowercase letters, numbers, and hyphens allowed.";
        return true;
      },
    },
    {
      type: "input",
      name: "description",
      message: "Description:",
      validate: (value) => {
        if (!value.trim()) return "Description is required.";
        return true;
      },
    },
  ]);

  const { name, description } = answers;

  // Check if skill already exists
  const existing = await registry.getSkill(name);

  if (existing) {
    logger.error(`A skill named "${name}" already exists.`);
    process.exit(1);
  }

  // Ensure skills directory exists
  await fs.ensureDir(SKILLS_DIR);

  // Create the .md file path
  const filePath = path.join(SKILLS_DIR, `${name}.md`);

  // Pre-populate with a template
  const template = `# ${name}\n\n${description}\n\n## Instructions\n\n<!-- Write your skill instructions here -->\n`;
  await fs.writeFile(filePath, template, "utf8");

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
  }

  // Save to registry after editor closes
  await registry.addSkill({ name, description, filePath });
  logger.success(`Skill "${name}" saved successfully.`);
}

module.exports = newSkill;
