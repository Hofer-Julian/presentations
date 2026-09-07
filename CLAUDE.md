# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This repository contains Julian Hofer's Slidev presentations, organized by date and event. It's a collection of technical presentations about package management, Rust, and Python ecosystem tools.

## Architecture

- **Presentation Structure**: Each presentation is in its own dated folder (e.g., `2025-07-europython-main-presentation/`)
- **Slides Content**: Each presentation folder contains:
  - `slides.md` - Main presentation content in Slidev markdown format
  - `public/` - Static assets (images, logos, etc.)
  - `snippets/` - Code examples and demos (optional)
  - `global-bottom.vue` - Custom Vue component for presentation footer (optional)
- **Picker Script**: `scripts/picker.ts` provides an interactive CLI to select which presentation to run
- **Package Management**: Uses pixi for both system and Node.js dependencies
- **Configuration**: Some presentations use pyproject.toml instead of pixi.toml for modern Python project structure

## Development Commands

### Starting Development Server
```bash
# Interactive picker to choose presentation
pixi run start
```

### Building/Exporting Presentations
```bash
# Export presentations (typically to PDF)
pixi run export
```

### Installation
```bash
# Install dependencies
pixi install
```

## Working with Presentations

### Adding New Presentations
1. Create folder with format: `YYYY-MM-event-name/`
2. Add `slides.md` with Slidev frontmatter
3. Create `public/` folder for assets
4. The picker script will automatically detect the new presentation

### Presentation Themes
- Uses Slidev themes: `seriph` and `default`
- Custom styling with dark color scheme
- Consistent branding with company logos and colors

### Content Structure
- Presentations focus on: conda/pixi package management, Rust ecosystem, Python tooling
- Include code snippets, live demos, and technical examples
- Company branding for Prefix.dev GmbH presentations
- **pyproject.toml Migration**: EuroPython 2025 main presentation demonstrates modern Python project structure using pyproject.toml instead of pixi.toml, showcasing Pixi's automatic Python management

## Dependencies

### Node.js Dependencies
- `@slidev/cli` - Core Slidev presentation framework
- `@slidev/theme-*` - Presentation themes
- `typescript` - TypeScript support
- `prompts` - Interactive CLI prompts
- `execa` - Process execution for scripts

### System Dependencies (via pixi)
- `pnpm` - Package manager for Node.js dependencies

## File Patterns

- Presentation folders: `YYYY-MM-*` format
- Slide files: `slides.md` in each presentation folder
- Assets: `public/` directory with images, logos, language icons
- Code examples: `snippets/` directory with working code samples
- Vue components: `global-bottom.vue` for shared UI components
- Configuration files: `pixi.toml` or `pyproject.toml` (depending on presentation)

## Notes

- EuroPython 2025 main presentation uses `pyproject.toml` to demonstrate modern Python project structure
- Dependencies can be specified in `project.dependencies` (PyPI) or `tool.pixi.dependencies` (conda)
- Pixi automatically manages Python interpreter when `requires-python` is specified in pyproject.toml