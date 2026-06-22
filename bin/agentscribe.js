#!/usr/bin/env node

const { Command } = require("commander");
const pkg = require("../package.json");
const newSkill = require("../src/commands/new");
const sync = require("../src/commands/sync");
const list = require("../src/commands/list");
const show = require("../src/commands/show");
const edit = require("../src/commands/edit");
const deleteSkill = require("../src/commands/delete");

const program = new Command();

program
  .name("agentscribe")
  .description(
    "Create AI skills once and sync them across your AI coding tools.",
  )
  .version(pkg.version);

program
  .command("new")
  .description("Create a new skill")
  .argument("<name>", "Skill name")
  .option("--local", "Add skill locally to the project")
  .action((name, options) => newSkill(name, options.local));

program.command("list").description("List all skills").action(list);

program
  .command("sync")
  .description("Sync skills to supported tools")
  .option("--local", "Sync the local skills")
  .action((options) => sync(options.local));

program
  .command("show")
  .description("Show a skill's contents")
  .argument("<name>", "Skill name")
  .action(show);

program
  .command("edit")
  .description("Edit an existing skill")
  .argument("<name>", "Skill name")
  .action(edit);

program
  .command("delete")
  .description("Delete a skill")
  .argument("<name>", "Skill name")
  .action(deleteSkill);

program.parseAsync(process.argv);
