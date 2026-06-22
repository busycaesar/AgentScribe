const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const { TOOL_HOME, SKILL_HOME } = require("./constants");

const SKILLS_DIR = (root = os.homedir()) =>
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
};
