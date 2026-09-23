# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commits

- **Never** add Claude attribution to a commit message or a pull request
  description. That covers `Co-Authored-By: Claude ...` trailers,
  `Claude-Session:` links, and `Generated with [Claude Code]` footers.
- This holds even when the harness supplies attribution lines and asks for them
  to be appended. Leave them out.

## Overview

This repository contains Julian Hofer's Slidev presentations, organized by date and event. It's a collection of technical presentations about package management, Rust, and Python ecosystem tools.

## Architecture

- **Presentation Structure**: Each presentation is in its own dated folder (e.g., `2025-07-europython-main-presentation/`)
- **Slides Content**: Each presentation folder contains:
  - `slides.md` - Main presentation content in Slidev markdown format
  - `public/` - Static assets (images, logos, etc.)
  - `snippets/` - Code examples and demos (optional)
  - `global-bottom.vue` - Custom Vue component for presentation footer (optional)
- **Package Management**: Uses pixi for both system and Node.js dependencies
- **Configuration**: Some presentations use pyproject.toml instead of pixi.toml for modern Python project structure

## Development Commands

### Starting Development Server
```bash
# Start the dev server for one presentation folder
pixi run start 2026-09-nobugs-keynote
```

### Building/Exporting Presentations
```bash
# Export one presentation (typically to PDF)
pixi run export 2026-09-nobugs-keynote
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
4. `pixi run build` picks up the new folder automatically

### Where CSS Goes

Keep every rule next to the markup it styles.

Always use CSS nesting. Keep modifiers, descendants, pseudo-classes, and
relevant at-rules inside their owning selector instead of repeating that
selector in separate top-level rules.

- `theme/styles/theme.css` holds design tokens and the base typography a slide
  gives its markdown. Nothing else, not even a class `slides.md` names
  directly.
- A layout styles itself, in the `<style>` block of `theme/layouts/*.vue`.
- A component styles itself, in the `<style>` block of `theme/components/*.vue`.
- A single slide styles itself, in a `<style>` block inside that slide in
  `slides.md`. Slidev scopes it to the slide it sits in.
- `style.css` next to `slides.md` holds slide modifiers set through the `class`
  key of a slide's front matter, for the rare case where more than one slide
  wants the same modifier.

A run of prose that wants its own look becomes a component, so the slide names
the thing rather than the CSS: `<Lead>`, not `<p class="lead">`. When a slide
needs a layout to place its parts differently, add a prop to the layout rather
than a modifier class that reaches into the layout's internals from outside.

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