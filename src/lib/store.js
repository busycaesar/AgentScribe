const fs = require("fs-extra");
const path = require("path");
const { TOOL_HOME, SKILL_HOME, ROOT_DIRECTORY } = require("./constants");

const SKILLS_DIR = (root = ROOT_DIRECTORY) =>
  path.join(root, TOOL_HOME, SKILL_HOME);

// Check whether a skill's markdown file exists on disk.
async function skillFileExists(name, local) {
  return fs.pathExists(getSkillPath(name, local));
}

// Resolve the absolute path of a skill's markdown file.
function getSkillPath(name, local) {
  return path.join(SKILLS_DIR(local), `${name}.md`);
}

async function createSkillFile(name, local) {
  const directory = SKILLS_DIR(local);
  await fs.ensureDir(directory);

  const filePath = path.join(directory, `${name}.md`);

  await fs.createFile(filePath);

  return filePath;
}

async function listSkills(local) {
  const directory = SKILLS_DIR(local);

  const pathExists = await fs.pathExists(directory);

  if (!pathExists) return [];

  const skills = await fs.readdir(directory);

  if (skills.length <= 0) return [];

  return skills
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      name: path.basename(file, ".md"),
      filePath: path.join(directory, file),
    }));
}

async function copySkills(skills, targetPath, local) {
  const directory = SKILLS_DIR(local);

  const targetDirectory = path.join(directory, targetPath);

  await fs.ensureDir(targetDirectory);

  for (const skill of skills) {
    const destination = path.join(targetDirectory, `${skill.name}.md`);

    await fs.copy(skill.filePath, destination);
  }
}

// Read the contents of a skill's markdown file.
async function readSkill(name) {
  return fs.readFile(getSkillPath(name), "utf8");
}

// Write contents to a skill's markdown file, creating the store dir as needed.
async function writeSkill(name, content) {
  await fs.ensureDir(SKILLS_DIR);
  const filePath = getSkillPath(name);
  await fs.writeFile(filePath, content, "utf8");
  return filePath;
}

// Delete a skill's markdown file. Returns true if a file was removed.
async function deleteSkillFile(name) {
  const filePath = getSkillPath(name);
  if (!(await fs.pathExists(filePath))) return false;
  await fs.remove(filePath);
  return true;
}

module.exports = {
  SKILLS_DIR,
  getSkillPath,
  skillFileExists,
  readSkill,
  writeSkill,
  deleteSkillFile,
  createSkillFile,
  listSkills,
  copySkills,
};
