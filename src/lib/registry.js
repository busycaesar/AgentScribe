const fs = require("fs-extra");
const path = require("path");
const os = require("os");

const SKILLS_HOME = path.join(os.homedir(), ".skills");
const REGISTRY_FILE = path.join(SKILLS_HOME, "skills.json");

// Ensure ~/.skills/ and skills.json exist
async function initRegistry() {
  await fs.ensureDir(SKILLS_HOME);
  const exists = await fs.pathExists(REGISTRY_FILE);
  if (!exists) {
    await fs.writeJson(REGISTRY_FILE, { skills: [] }, { spaces: 2 });
  }
}

// Read the full registry
async function readRegistry() {
  await initRegistry();
  return fs.readJson(REGISTRY_FILE);
}

// Write the full registry
async function writeRegistry(data) {
  await fs.writeJson(REGISTRY_FILE, data, { spaces: 2 });
}

// Get a single skill by name
async function getSkill(name) {
  const data = await readRegistry();
  return data.skills.find((s) => s.name === name) || null;
}

// Add a new skill to the registry
async function addSkill({ name, description, filePath }) {
  const data = await readRegistry();
  const now = new Date().toISOString();
  data.skills.push({
    name,
    description,
    filePath,
    createdAt: now,
    updatedAt: now,
  });
  await writeRegistry(data);
}

// Update an existing skill in the registry
async function updateSkill(name, updates) {
  const data = await readRegistry();
  const index = data.skills.findIndex((s) => s.name === name);
  if (index === -1) return false;
  data.skills[index] = {
    ...data.skills[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  await writeRegistry(data);
  return true;
}

// Delete a skill from the registry
async function deleteSkill(name) {
  const data = await readRegistry();
  const index = data.skills.findIndex((s) => s.name === name);
  if (index === -1) return false;
  data.skills.splice(index, 1);
  await writeRegistry(data);
  return true;
}

// Get all skills
async function listSkills() {
  const data = await readRegistry();
  return data.skills;
}

module.exports = {
  initRegistry,
  getSkill,
  addSkill,
  updateSkill,
  deleteSkill,
  listSkills,
};
