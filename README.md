# AgentScribe

<img width="1031" height="224" alt="agentscribe-poster" src="https://github.com/user-attachments/assets/280166d2-2da0-48a6-8540-6fa7925fd4de" />

## Description

A CLI tool to create AI skills (markdown instruction files) once and sync them across multiple AI coding tools — write once, use everywhere. Maintains a central store at `~/.skills/` and syncs skills to each supported tool's folder.

## Tech Stack
![Image Alt](https://skillicons.dev/icons?i=nodejs)

## Features

- Create and manage reusable AI skill files from a central store
- Sync skills across multiple AI coding tools with a single command
- Supports Claude, Cursor, and Gemini out of the box

## How to run the project?

```bash
npm install
node bin/agentscribe.js <command>
```

### Commands

| Command | Description |
|---|---|
| `new` | Create a new skill |
| `list` | List all saved skills |
| `sync [--tool <name>]` | Sync skills to one or all tools |
| `edit <name>` | Edit an existing skill |
| `delete <name>` | Delete a skill |
| `show <name>` | Display a skill's content |

### Sync Targets

| Tool | Path |
|---|---|
| Claude | `.claude/commands/<name>.md` |
| Cursor | `.cursor/rules/<name>.md` |
| Gemini | `.gemini/<name>.md` |

## Author
[Dev J. Shah](https://github.com/busycaesar)

## Co-Authors
- [Cursor](https://github.com/cursor)
- [Claude Sonnet 4.6](https://github.com/anthropics)
