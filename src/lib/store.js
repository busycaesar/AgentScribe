const fs = require("fs-extra");
const path = require("path");
const os = require("os");

const SKILLS_DIR = path.join(os.homedir(), ".skills", "skills");

// Resolve the absolute path of a skill's markdown file.
function getSkillPath(name) {
  return path.join(SKILLS_DIR, `${name}.md`);
}

// Check whether a skill's markdown file exists on disk.
async function skillFileExists(name) {
  return fs.pathExists(getSkillPath(name));
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
};
