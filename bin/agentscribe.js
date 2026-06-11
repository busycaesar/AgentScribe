#!/usr/bin/env node

const { Command } = require("commander");
const pkg = require("../package.json");
const newSkill = require("../src/commands/new");
const sync = require("../src/commands/sync");

const program = new Command();

program
  .name("agentscribe")
  .description(
    "Create AI skills once and sync them across your AI coding tools.",
  )
  .version(pkg.version);

program.command("new").description("Create a new skill").action(newSkill);

program
  .command("sync")
  .description("Sync all skills to all supported tools")
  .action(sync);

program.parseAsync(process.argv);
