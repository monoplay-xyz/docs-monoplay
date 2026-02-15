---
sidebar_position: 4
title: Templates
---

# Templates

Templates are pre-configured starting points for your games. Each template includes a foundational game structure with core systems, sample gameplay, and placeholder assets. Starting from a template is faster than building from scratch and helps you understand what's possible with Forge.

## Available Templates

### platformer-2d

**Best for:** Side-scrolling action games, precision platformers, Metroidvania-style exploration

A 2D platformer with physics-based character movement, jumping mechanics, and platform collision. The template includes:

- **Character Controller** — Smooth left/right movement with acceleration and deceleration
- **Jump System** — Configurable jump height and gravity with ground detection
- **Platform Collision** — One-way platforms, solid ground, and wall detection
- **Camera** — Side-scrolling camera that follows the player smoothly
- **Sample Level** — Basic platform layout demonstrating different heights and gaps

**SDK Dependencies:**
- `monoplay-core` — Entity and resource management
- `monoplay-input` — Keyboard and gamepad input
- `monoplay-physics` — 2D collision detection and rigid body physics
- `monoplay-ui` — Basic HUD elements

**Example Games You Can Build:**
- Precision platformers (Super Meat Boy, Celeste)
- Puzzle-platformers (Braid, Limbo)
- Action-platformers (Mega Man, Shovel Knight)
- Exploration games (Hollow Knight, Ori)

**Common Iterations:**
```
Add double jump mechanic
Add wall-sliding and wall-jumping
Add moving platforms that go back and forth
Add collectible coins and a counter
Add enemy patrolling enemies with simple AI
Add checkpoints that save player position
```

---

### survival-3d

**Best for:** First-person survival, resource gathering, base building, open-world exploration

A 3D first-person game with resource collection, crafting, and environmental survival mechanics. The template includes:

- **First-Person Controller** — WASD movement and mouse look with smooth camera
- **Resource System** — Inventory for collecting and storing items
- **Crafting Framework** — Recipe system for combining resources
- **Day/Night Cycle** — Time progression with configurable speed
- **Basic Terrain** — Procedurally generated landscape with trees and rocks
- **Health and Hunger** — Survival stats that deplete over time

**SDK Dependencies:**
- `monoplay-core` — Game loop and state management
- `monoplay-input` — Mouse, keyboard, and gamepad input
- `monoplay-physics` — 3D collision and ray casting
- `monoplay-ui` — Inventory, crafting menu, and stat displays
- `monoplay-world` — Terrain generation and biome management

**Example Games You Can Build:**
- Survival crafting (Minecraft, Rust, The Forest)
- Exploration games (Subnautica, No Man's Sky)
- Horror survival (The Long Dark, Green Hell)
- Base defense (7 Days to Die, Project Zomboid)

**Common Iterations:**
```
Add hostile creatures that spawn at night
Add building system with placeable structures
Add temperature system and campfires
Add fishing and cooking mechanics
Add tool durability and repair system
Add randomized loot chests in the world
```

---

### rpg-topdown

**Best for:** Classic RPGs, adventure games, dungeon crawlers, story-driven games

A top-down RPG with character stats, combat, inventory, and dialogue systems. The template includes:

- **Top-Down Movement** — 8-directional character movement with collision
- **Combat System** — Turn-based or real-time combat framework
- **Inventory and Equipment** — Item management with equipment slots
- **Stats and Leveling** — HP, MP, attack, defense, and experience points
- **NPC Framework** — Non-player characters with interaction triggers
- **Sample Dungeon** — Tilemap-based environment with rooms and corridors

**SDK Dependencies:**
- `monoplay-core` — Entity component system
- `monoplay-input` — Directional input and action buttons
- `monoplay-physics` — Grid-based collision or free movement
- `monoplay-ui` — Menus, dialogue boxes, and stat screens
- `monoplay-world` — Dungeon generation and room layouts

**Example Games You Can Build:**
- Classic JRPGs (Final Fantasy, Dragon Quest)
- Action RPGs (Secret of Mana, Diablo)
- Roguelike RPGs (Binding of Isaac, Enter the Gungeon)
- Adventure games (Zelda, Hyper Light Drifter)

**Common Iterations:**
```
Add a turn-based battle system with enemy encounters
Add magic spells with mana costs
Add quest tracking and objectives
Add shops where NPCs sell items
Add randomized dungeon generation
Add treasure chests with random loot
Add boss encounters with multiple phases
```

---

### puzzle-2d

**Best for:** Logic puzzles, match-3 games, physics puzzles, brain teasers

A 2D grid-based puzzle framework with tile manipulation and rule validation. The template includes:

- **Grid System** — Configurable grid size with tile placement
- **Input Handling** — Click or keyboard selection of tiles
- **Match Detection** — Pattern recognition for puzzle solving
- **Move Validation** — Rule enforcement for legal moves
- **Undo System** — Ability to reverse actions
- **Level Framework** — Multiple levels with increasing difficulty

**SDK Dependencies:**
- `monoplay-core` — Game state and level management
- `monoplay-input` — Mouse and touch input
- `monoplay-ui` — Grid display, move counter, and menus

**Example Games You Can Build:**
- Match-3 puzzles (Candy Crush, Bejeweled)
- Sokoban-style box pushing
- Tetris and block-stacking games
- Physics-based puzzles (Cut the Rope, Angry Birds)
- Logic puzzles (Sudoku, Minesweeper)

**Common Iterations:**
```
Add a move counter with a maximum limit
Add a scoring system with combo bonuses
Add power-ups that clear entire rows or colors
Add obstacles like locked tiles or ice blocks
Add a timer for time-attack mode
Add procedurally generated levels
Add special tiles with unique rules
```

---

### arena-pvp

**Best for:** Multiplayer combat, battle royale, deathmatch, competitive games

A multiplayer arena combat framework with networking, player spawning, and score tracking. The template includes:

- **Multiplayer Networking** — Client-server architecture with state sync
- **Player Management** — Multiple player instances with spawn points
- **Combat System** — Health, damage, and respawn mechanics
- **Scoring** — Kill/death tracking and leaderboards
- **Arena Map** — Enclosed combat area with cover and power-up spawns
- **Matchmaking Framework** — Lobby system and game start logic

**SDK Dependencies:**
- `monoplay-core` — Game loop and entity management
- `monoplay-input` — Multiple input sources for different players
- `monoplay-physics` — Collision detection and projectile physics
- `monoplay-ui` — Scoreboard, health bars, and kill feed
- `monoplay-multiplayer` — Networking, synchronization, and authority
- `monoplay-mono` — Optional blockchain integration for ranked matches

**Example Games You Can Build:**
- Arena shooters (Quake, Unreal Tournament)
- Battle royale (Fortnite, PUBG)
- Fighting games (Smash Bros, Brawlhalla)
- MOBA-style combat (Dota, League of Legends)

**Common Iterations:**
```
Add different weapon types with unique stats
Add power-ups that spawn at fixed locations
Add kill streaks with reward bonuses
Add spectator mode for eliminated players
Add team-based gameplay with team colors
Add custom maps with different layouts
Add voice chat integration
```

---

## Choosing the Right Template

### Based on Your Game Idea

Ask yourself these questions:

**What perspective does the player have?**
- Side view → `platformer-2d` or `puzzle-2d`
- Top-down → `rpg-topdown`
- First-person → `survival-3d`
- Isometric → `rpg-topdown` (can be modified)

**Is progression linear or open-ended?**
- Linear levels → `platformer-2d`, `puzzle-2d`
- Open world → `survival-3d`, `rpg-topdown`
- Round-based → `arena-pvp`

**Is it single-player or multiplayer?**
- Single-player → Any except `arena-pvp`
- Multiplayer → `arena-pvp` (other templates can add multiplayer)

**What's the core gameplay loop?**
- Precision movement → `platformer-2d`
- Resource management → `survival-3d`
- Combat and stats → `rpg-topdown`
- Solving puzzles → `puzzle-2d`
- Competitive combat → `arena-pvp`

### Based on Your Experience Level

**New to game development?**
Start with `platformer-2d` or `puzzle-2d`. These templates have simpler systems and clear feedback loops, making them easier to understand and iterate on.

**Comfortable with basic concepts?**
Try `rpg-topdown` or `survival-3d`. These add more complexity with inventory systems, stats, and world management.

**Experienced developer?**
Jump into `arena-pvp` for the most complex systems, or start with any template and heavily customize it.

### Based on Development Time

**Quick prototypes (1-2 days):**
`puzzle-2d` — Minimal systems, fast iteration

**Short projects (1 week):**
`platformer-2d` — Well-understood mechanics, lots of tutorials and examples

**Medium projects (2-4 weeks):**
`rpg-topdown`, `survival-3d` — More systems to balance and tune

**Long projects (1+ months):**
`arena-pvp` — Multiplayer adds complexity, testing, and balancing

## Template SDK Breakdown

Here's what each SDK crate provides across templates:

| SDK Crate | What It Does | Used In |
|-----------|--------------|---------|
| `monoplay-core` | Entity/component/system architecture, game loop, resources | All templates |
| `monoplay-input` | Keyboard, mouse, gamepad, touch handling | All templates |
| `monoplay-physics` | Collision detection, rigid bodies, raycasting | All except `puzzle-2d` |
| `monoplay-ui` | Menus, HUD, buttons, text rendering | All templates |
| `monoplay-audio` | Sound effects, music, spatial audio | All templates |
| `monoplay-multiplayer` | Networking, state sync, authority | `arena-pvp` only (by default) |
| `monoplay-mono` | Blockchain wallets, NFTs, tokens | None (opt-in) |
| `monoplay-world` | Procedural generation, terrain, biomes | `survival-3d`, optional in others |

You can add any SDK to any template through iteration:

```
Add multiplayer support to this platformer using the monoplay-multiplayer SDK.
```

```
Integrate blockchain wallet connection for NFT character skins.
```

## Switching Templates

You can't switch templates for an existing game, but you can start a new project with a different template and ask Forge to migrate specific features:

1. Create a new game with the desired template
2. In your first prompt, reference your previous game:

```
I have a platformer with wall-jumping and collectible gems. Recreate
those mechanics in this RPG template as dungeon traversal abilities.
```

## Customizing Templates

Templates are starting points, not restrictions. You can heavily modify any template:

### Changing Perspective
```
Convert this top-down RPG to a side-scrolling action RPG like
Castlevania.
```

### Mixing Template Features
```
Take the combat system from the RPG template and combine it with
the platformer movement mechanics.
```

### Removing Systems
```
Remove the hunger and temperature systems from the survival template.
I only want resource gathering and building.
```

### Adding New Systems
```
Add a card-based combat system to this RPG, replacing the standard
turn-based combat.
```

## Template Source Code

Every template is open-source. You can view the base template code on GitHub:

- [platformer-2d](https://github.com/monoplay-xyz/forge-templates/tree/main/platformer-2d)
- [survival-3d](https://github.com/monoplay-xyz/forge-templates/tree/main/survival-3d)
- [rpg-topdown](https://github.com/monoplay-xyz/forge-templates/tree/main/rpg-topdown)
- [puzzle-2d](https://github.com/monoplay-xyz/forge-templates/tree/main/puzzle-2d)
- [arena-pvp](https://github.com/monoplay-xyz/forge-templates/tree/main/arena-pvp)

Reading template code helps you understand:
- How systems are structured
- What components and resources exist
- How to extend templates manually
- Best practices for Bevy architecture

## Community Templates

The MonoPlay community creates and shares custom templates. Browse user-created templates at [forge.monoplay.xyz/community](https://forge.monoplay.xyz/community).

Popular community templates include:
- **idle-clicker** — Incremental game with upgrades and prestige
- **card-battler** — Deck-building combat system
- **rhythm-game** — Music-based timing mechanics
- **racing-2d** — Top-down racing with drift physics
- **city-builder** — Grid-based construction and resource management

You can publish your own template after building and testing a game. Click "Share as Template" in your project settings.

## Next Steps

Ready to choose a template and start building? Head to the [Getting Started guide](./getting-started.md).

Want to learn how to write better prompts for your chosen template? See the [Prompting Guide](./prompting-guide.md).

Need to understand how templates integrate with version control? Check out [GitHub Integration](./github-integration.md).
