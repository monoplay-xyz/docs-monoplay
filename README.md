# MonoPlay Documentation

Documentation site for the MonoPlay platform -- the decentralized game store, AI game builder (Forge), SDK, and GRID seeder network. Built with Docusaurus 3.9 and deployed to [docs.monoplay.xyz](https://docs.monoplay.xyz).

## Tech Stack

- Docusaurus 3.9.2 (v4 future flag enabled)
- React 19
- TypeScript 5.6
- Local search plugin (`@easyops-cn/docusaurus-search-local`)

## Quick Start

```bash
cd website

# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve
```

The dev server runs on `http://localhost:3000` with live reload.

## Documentation Sections

| Section | Path | Content |
|---------|------|---------|
| Platform | `docs/getting-started/`, `docs/platform/` | Account creation, storefront, launcher, licenses, payments |
| Forge | `docs/forge/` | AI game builder: overview, prompting guide, templates, GitHub integration, publishing |
| SDK | `docs/sdk/` | MonoPlay SDK crate docs: core, input, physics, UI, audio, multiplayer, mono, world |
| Publishing | `docs/publishing/` | Game submission process, security scanning, code signing, content guidelines |
| GRID | `docs/grid/` | Seeder network: setup, Raspberry Pi nodes, Docker, LYTH rewards, dashboard |
| Developers | `docs/developers/` | Developer console, API reference, smart contracts |
| Reference | `docs/reference/` | Supported platforms, system requirements, FAQ, glossary |

## Adding Documentation

1. Create a new `.md` file in the appropriate `website/docs/` subdirectory.

2. Add frontmatter at the top:

```markdown
---
title: Page Title
sidebar_position: 3
---

Your content here.
```

3. Add the document ID to `website/sidebars.ts` under the relevant sidebar section.

4. Run `npm start` to preview.

## Project Structure

```
website/
  docs/                 Source documentation (Markdown)
    getting-started/    Account setup and quick start
    platform/           Storefront, launcher, licenses, payments
    forge/              AI game builder (Forge)
    sdk/                MonoPlay SDK crate documentation
    publishing/         Game submission and review
    grid/               GRID seeder network
    developers/         API reference and smart contracts
    reference/          FAQ, glossary, system requirements
  src/
    css/custom.css      Theme customization
  sidebars.ts           Sidebar configuration
  docusaurus.config.ts  Site configuration
  static/               Static assets (images, favicon)
```

## Syntax Highlighting

The site supports syntax highlighting for: Bash, JSON, TOML, YAML, Rust, and Solidity.

## License

MIT
