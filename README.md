# AgentScribe

<img width="1031" height="224" alt="agentscribe-poster" src="https://github.com/user-attachments/assets/280166d2-2da0-48a6-8540-6fa7925fd4de" />

[![npm version](https://img.shields.io/npm/v/agentscribe)](https://www.npmjs.com/package/agentscribe)
[![npm downloads](https://img.shields.io/npm/dm/agentscribe)](https://www.npmjs.com/package/agentscribe)
[![Node.js >= 22.12.0](https://img.shields.io/badge/node-%3E%3D22.12.0-brightgreen)](https://nodejs.org)

## Description

A CLI tool to create AI skills (markdown instruction files) once and sync them across multiple AI coding tools — write once, use everywhere. Maintains a central store at `~/.skills/` and syncs skills to each supported tool's folder.

## Tech Stack
![Image Alt](https://skillicons.dev/icons?i=nodejs)

## Features

- Create and manage reusable AI skill files from a central store
- Sync skills across multiple AI coding tools with a single command
- Supports Claude, Cursor, and Gemini out of the box

## Installation

```bash
npm install -g agentscribe
```

Or run without installing:

```bash
npx agentscribe <command>
```

## Usage

```bash
agentscribe <command>
```

### Commands

| Command | Description |
|---|---|
| `new` | Create a new skill |
| `list` | List all saved skills |
| `sync` | Sync all skills to all supported tools |
| `sync --tool <name>` | Sync all skills to a single tool |
| `show <name>` | Display a skill's content |
| `edit <name>` | Edit an existing skill in `$EDITOR` |
| `delete <name>` | Delete a skill |

### Sync Targets

| Tool | Path |
|---|---|
| Claude | `~/.claude/commands/<name>.md` |
| Cursor | `~/.cursor/rules/<name>.md` |
| Gemini | `~/.gemini/<name>.md` |

## Author
[Dev J. Shah](https://github.com/busycaesar)

## Co-Authors
- [Cursor](https://github.com/cursor)
- [Claude Sonnet 4.6](https://github.com/anthropics)
