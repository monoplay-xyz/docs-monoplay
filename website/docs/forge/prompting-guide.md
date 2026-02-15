---
sidebar_position: 3
title: Prompting Guide
---

# Prompting Guide

Writing effective prompts is the key to getting great results from Forge. This guide teaches you how to communicate your game ideas clearly and get the AI to generate exactly what you want.

## The Anatomy of a Good Prompt

A good prompt has three parts:

1. **Core Concept** — What is the game about?
2. **Key Mechanics** — How does the player interact?
3. **Goals and Progression** — What is the player trying to achieve?

### Example: Basic Structure

```
Core Concept: A puzzle game where you slide blocks on a grid.
Mechanics: Click a block to slide it in one direction until it hits a wall or another block.
Goal: Slide the red block to the exit square to win.
```

You don't need to separate these explicitly — just make sure your prompt covers all three areas.

## Starting Simple vs. Starting Detailed

You can approach Forge in two ways:

### Approach 1: Start Simple, Iterate
Begin with the bare minimum and add features one by one.

**Initial prompt:**
```
Create a top-down game where the player moves a spaceship with arrow keys.
```

**Iteration 1:**
```
Add asteroids floating in space that the player must avoid.
```

**Iteration 2:**
```
Add a laser weapon that shoots when pressing spacebar.
```

**Pros:** Easy to see what each change does. Less overwhelming.
**Cons:** Uses more generations.

### Approach 2: Detailed First Prompt
Describe the complete game vision upfront.

```
Create a top-down space shooter. The player controls a spaceship with
arrow keys and shoots lasers with spacebar. Asteroids spawn from the
edges and drift toward the center. Destroying asteroids gives points.
The player has 3 lives and loses one when hit by an asteroid. Display
score and lives in the UI. Game over when lives reach zero.
```

**Pros:** Fewer generations needed. Complete game faster.
**Cons:** Harder to debug if something doesn't work as expected.

**Recommendation:** Start with a moderately detailed prompt (3-5 sentences), then iterate to refine.

## What to Include in Your Prompt

### Player Controls
Be specific about input methods:
- "Arrow keys move the character"
- "Click to place a tower"
- "Hold spacebar to charge a jump"
- "WASD for movement, mouse to aim and shoot"

### Game Objects and Entities
Describe what exists in your game world:
- "Platforms at different heights"
- "Enemy zombies that walk toward the player"
- "Collectible gems scattered around the level"
- "A health bar above each character"

### Rules and Logic
Explain how game systems work:
- "When health reaches zero, the player respawns at the start"
- "Collecting 100 coins gives an extra life"
- "Enemies get faster every 30 seconds"
- "Red blocks can be pushed, blue blocks are immovable"

### UI and Feedback
Specify what information the player sees:
- "Display score in the top-right corner"
- "Show a timer counting down from 60 seconds"
- "Flash the screen red when taking damage"
- "Play a sound effect when collecting items"

### Win and Lose Conditions
Define what success and failure mean:
- "Win by reaching the goal flag"
- "Lose if the timer runs out"
- "Game over when all lives are lost"
- "Victory when all enemies are defeated"

## Good Prompts vs. Bad Prompts

### Example 1: Movement

❌ **Bad:**
```
Make the character move.
```
*Too vague. No details about how or what.*

✅ **Good:**
```
The player controls a knight character using arrow keys. The knight
should move in 8 directions and have smooth acceleration and deceleration.
```
*Specifies input method, character type, and movement feel.*

### Example 2: Combat

❌ **Bad:**
```
Add fighting.
```
*No information about mechanics, inputs, or behavior.*

✅ **Good:**
```
Add a sword attack that activates when pressing spacebar. The sword
swings in an arc in front of the player. Enemies hit by the sword
take 10 damage and are knocked back slightly.
```
*Clear input, animation, damage system, and enemy reaction.*

### Example 3: Progression

❌ **Bad:**
```
Make levels harder.
```
*Doesn't explain how difficulty increases.*

✅ **Good:**
```
Increase enemy spawn rate by 10% every 60 seconds. After 5 minutes,
enemies gain 50% more health and move 20% faster.
```
*Specific numbers and timing for difficulty scaling.*

### Example 4: UI

❌ **Bad:**
```
Show the score.
```
*Minimal guidance on presentation.*

✅ **Good:**
```
Display the score in the top-right corner using a large bold font.
When the score increases, briefly scale the text up and play a
ping sound effect.
```
*Specifies position, style, and feedback.*

## Advanced Prompting Techniques

### Referencing Game Design Patterns

If you know game design terminology, use it — Forge understands common patterns:

```
Add a dash mechanic with a 2-second cooldown, like in Celeste.
```

```
Implement a combo system where attacks within 1 second of each other
increase damage by 20%, stacking up to 3 times.
```

```
Add spawn points that activate when the player gets close, like in
Dark Souls.
```

### Specifying Numbers and Tuning

Be precise when you know what you want:

```
Player movement speed: 300 units per second
Jump height: 150 units
Gravity: 980 units/s²
Max health: 100 HP
```

You can always adjust these in later iterations if they don't feel right.

### Using Comparisons

Reference existing games to convey feel and style:

```
Create a platformer with tight, responsive controls like Super Meat Boy.
```

```
Make a survival game with crafting recipes similar to Minecraft.
```

```
Build a roguelike with procedurally generated levels like Spelunky.
```

### Describing Visual Style

While Forge uses placeholder graphics, you can guide the aesthetic:

```
Use a minimalist art style with flat colors and simple geometric shapes.
```

```
Create a pixel art retro aesthetic with a limited color palette.
```

```
Design a dark, moody atmosphere with dim lighting and fog.
```

These descriptions help Forge choose appropriate placeholder assets and generate code that supports your vision when you add final art.

## What Forge Handles Well

Forge excels at generating certain types of game systems:

### Core Game Logic
- Player movement and controls
- Physics and collision detection
- Enemy AI and pathfinding
- Inventory and item systems
- Health, stamina, and resource management
- Scoring and stat tracking

### Common Game Patterns
- Platformer mechanics (jumping, wall sliding, ledge grabbing)
- Shooting and projectiles
- Puzzle mechanics (block pushing, switch activation)
- Wave-based spawning
- Timer and countdown systems

### UI Components
- Menus and buttons
- Health bars and resource meters
- Inventory grids
- Score displays and leaderboards
- Pause screens and game over screens

### State Management
- Level progression
- Save and load systems
- Settings and options
- Scene transitions

## What Needs Manual Work

Some aspects of game development still require hands-on effort:

### Custom Art and Assets
Forge generates code and uses placeholder graphics. You'll need to:
- Create or commission pixel art, 3D models, or vector graphics
- Replace placeholder sprites and textures
- Design UI elements and icons
- Add particle effects and visual polish

### Advanced Rendering
Complex visual effects require shader programming:
- Custom lighting and shadows
- Post-processing effects (bloom, blur, color grading)
- Procedural textures and materials
- Advanced particle systems

### Narrative Content
Story-driven elements need manual scripting:
- Dialogue trees and conversation systems
- Quest tracking and branching narratives
- Cutscenes and scripted events
- Localization and translation

### Audio Production
While Forge can trigger sounds, you provide the audio files:
- Sound effects and voice acting
- Music composition and adaptive soundtracks
- Spatial audio and 3D sound positioning

### Platform-Specific Features
Console and mobile builds need additional work:
- Controller support and remapping
- Touch controls and gesture detection
- Achievement systems (Steam, Xbox, PlayStation)
- Cloud saves and cross-platform progression

## Iterating on Generated Games

Once you have a working game, use targeted prompts to refine:

### Tweaking Parameters
```
Increase player movement speed by 25%.
```

```
Make enemies spawn every 3 seconds instead of 5.
```

```
Change the jump height from 100 to 150 units.
```

### Adding Features
```
Add a double jump ability that can be used once in midair.
```

```
Implement a shield item that blocks one hit.
```

```
Add a boss enemy that spawns after 10 regular enemies are defeated.
```

### Fixing Issues
```
The player is getting stuck on platform edges. Add smooth edge detection.
```

```
Enemies are spawning too close to the player. Enforce a minimum
distance of 200 units.
```

```
The UI overlaps the gameplay area. Move the health bar to the top-left
with 20 pixels of padding.
```

### Polishing
```
Add screen shake when the player takes damage.
```

```
Make collected coins float up and fade out before disappearing.
```

```
Add a 3-second invincibility period after respawning, with a flashing effect.
```

## Troubleshooting Common Issues

### "The game compiled but doesn't work as expected"

**Solution:** Break down your prompt into smaller parts and test each piece.

Instead of:
```
Add enemies with pathfinding, shooting, and health bars.
```

Try:
```
First iteration: Add enemies that stand still.
Second iteration: Make enemies walk toward the player.
Third iteration: Add shooting when enemies are in range.
Fourth iteration: Add health bars above each enemy.
```

### "The AI didn't understand my prompt"

**Solution:** Use more concrete language and specific examples.

Instead of:
```
Make it more fun.
```

Try:
```
Add power-ups that appear every 30 seconds. Power-ups give temporary
speed boost, invincibility, or double damage for 10 seconds.
```

### "The game feels off but I don't know what to change"

**Solution:** Describe the feeling you want instead of specific mechanics.

```
The movement feels too slippery. Make controls more responsive and snappy.
```

```
The game is too easy. Make enemies more aggressive and reduce player health.
```

```
Combat lacks impact. Add hit pause, screen shake, and knockback effects.
```

## Examples: Complete Prompts

Here are full prompts for different game genres that work well with Forge:

### 2D Platformer
```
Create a 2D platformer where the player controls a ninja character.
Use arrow keys to move left/right and spacebar to jump. Add wall-jump
mechanics — when touching a wall in midair, press jump to kick off
in the opposite direction. Place platforms at various heights with
gaps that require wall-jumping to cross. Add shurikens as collectibles
(10 points each). Add enemy guards that patrol back and forth on
platforms — touching them resets the player. Display score and lives
(start with 3) in the UI. Win by reaching a torii gate at the end.
```

### Tower Defense
```
Create a tower defense game with a path that enemies follow from
left to right. Click empty grid spaces to place towers (costs 100 gold).
Towers automatically shoot the nearest enemy within range (200 units).
Enemies spawn every 3 seconds with 50 HP and give 25 gold when killed.
Each enemy that reaches the end costs 1 life. Start with 20 lives and
500 gold. Display gold, lives, and wave number. Game over at 0 lives.
Spawn waves of 10 enemies, then 2-second break, then next wave with
10% more enemy health.
```

### Puzzle Game
```
Create a Sokoban-style puzzle game. Display a grid of tiles. The player
is a box pusher who moves one tile at a time with arrow keys. Add
crates that the player can push (but not pull). Add target spots marked
on the floor. The goal is to push all crates onto target spots. When a
crate reaches a target, it changes color. Win when all crates are on
targets. Add walls that block movement. Add a reset button to restart
the level. Add an undo button to reverse the last move.
```

### Survival Game
```
Create a top-down survival game. The player moves with WASD and aims
with the mouse. Click to swing an axe in the direction of the cursor.
Trees exist randomly in the world — chopping a tree gives 5 wood.
Zombies spawn at the edge of the screen and walk toward the player.
Axe kills zombies in 3 hits. Press 'B' to open build menu. Spend 20
wood to place a wall. Zombies attack walls (walls have 100 HP). Display
wood count, wave number, and player health (100 HP, lose 20 per zombie
hit). Game over at 0 HP. Waves spawn every 60 seconds with 25% more
zombies each time.
```

## Next Steps

Now that you understand how to write effective prompts:

- Browse [Templates](./templates.md) to see what different game types include
- Learn about [GitHub Integration](./github-integration.md) to version control your iterations
- Explore [Publishing](./publishing.md) when you're ready to share your game

Happy building!
