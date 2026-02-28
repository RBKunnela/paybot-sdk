# sales-squad

Custom squad for sales automation

## Overview

This squad provides agents and tasks for sales domain automation within the AIOS framework.

## Structure

```
sales-squad/
├── squad.yaml              # Squad manifest
├── config/                 # Configuration files
│   ├── coding-standards.md
│   ├── tech-stack.md
│   └── source-tree.md
├── agents/                 # Agent definitions
│   └── example-agent.md
├── tasks/                  # Task definitions (task-first!)
│   └── example-agent-task.md
├── checklists/             # Validation checklists
├── workflows/              # Multi-step workflows
├── templates/              # Document templates
├── tools/                  # Custom tools
├── scripts/                # Utility scripts
└── data/                   # Static data
```

## Getting Started

1. Customize `squad.yaml` with your specific details
2. Create your agents in `agents/`
3. Create tasks in `tasks/` (task-first architecture!)
4. Validate: `@squad-creator *validate-squad sales-squad`

## Author

Adriano

## License

UNLICENSED
