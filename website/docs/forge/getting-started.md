---
sidebar_position: 2
title: Getting Started
---

# Getting Started with Forge

This guide will walk you through creating your first game with MonoPlay Forge, from signing in to playing your game in the browser.

## Prerequisites

All you need is:
- A web browser (Chrome, Firefox, Safari, or Edge)
- A MonoPlay account
- A GitHub account (for exporting your game's source code)

No installation, no development environment, no build tools required.

## Step 1: Sign In

Visit [forge.monoplay.xyz](https://forge.monoplay.xyz) and sign in with your MonoPlay account. If you don't have one yet, click "Create Account" and follow the registration flow.

After signing in, you'll see the Forge dashboard with your game projects and available generations for the month.

## Step 2: Create a New Project

Click the **"New Game"** button to start a new project. You'll be prompted to:

1. **Choose a template** — Select a starting point for your game (platformer, survival, RPG, etc.)
2. **Name your project** — Give your game a descriptive name
3. **Describe your game** — Write a prompt explaining what you want to build

### Choosing a Template

Templates provide a solid foundation for your game with pre-configured systems and sample gameplay. Here's a quick overview:

- **platformer-2d** — Side-scrolling action with jumping and platforms
- **survival-3d** — First-person resource gathering and crafting
- **rpg-topdown** — Classic RPG with movement, combat, and inventory
- **puzzle-2d** — Grid-based puzzle mechanics
- **arena-pvp** — Multiplayer combat arena

For your first game, we recommend starting with **platformer-2d** — it's straightforward and demonstrates core game mechanics clearly.

See the [Templates guide](./templates.md) for detailed information about each template.

## Step 3: Write Your First Prompt

The prompt is where you describe what you want your game to do. Let's start with a simple example:

```
Create a platformer where the player is a small cube that can jump.
Add floating platforms at different heights. When the player reaches
the top platform, display a victory message.
```

### Tips for Your First Prompt

**Be specific about core mechanics:**
- What does the player control?
- How do they interact with the world?
- What's the goal?

**Start simple:**
Don't try to build your dream game in one prompt. Start with basic functionality and add features in iterations.

**Use clear language:**
Write as if you're explaining the game to a friend. Avoid jargon unless you're referencing specific game design terms.

See our [Prompting Guide](./prompting-guide.md) for more detailed tips and examples.

## Step 4: Generate Your Game

Click **"Generate Game"** to start the build process. You'll see a real-time compilation log showing:

1. **Code Generation** — AI writes your game's Rust source code
2. **Dependency Resolution** — MonoPlay SDK crates are loaded
3. **Compilation** — The Rust compiler builds your game for WebAssembly
4. **Asset Loading** — Textures, sounds, and other resources are prepared

For a simple game, this takes 30-60 seconds. More complex games may take 2-3 minutes.

### What's Happening Behind the Scenes

Forge generates a complete Bevy project with:
- `main.rs` — Your game's entry point and setup
- `systems/` — Game logic organized by feature (movement, collision, etc.)
- `components/` — Entity component definitions
- `resources/` — Game state and shared data
- `assets/` — Textures, fonts, and audio files
- `Cargo.toml` — Project configuration and dependencies

You'll be able to explore and download all of this code after the build completes.

## Step 5: Play Your Game

Once compilation finishes, your game launches automatically in the browser preview window. Use the default controls to play:

- **Arrow Keys** or **WASD** — Move
- **Spacebar** — Jump
- **Mouse** — Camera/aim (in 3D games)
- **Escape** — Pause menu

Try out your game! Does it work as you expected? Is the jumping too floaty? Are the platforms too far apart?

## Step 6: Iterate and Improve

The real power of Forge is rapid iteration. You can refine your game through follow-up prompts that build on what you've already created.

### Example Iteration Flow

**Iteration 1:**
```
Make the jump height higher and add double jump.
```

**Iteration 2:**
```
Add moving platforms that go back and forth horizontally.
```

**Iteration 3:**
```
Add collectible coins scattered on the platforms. Show a coin counter in the UI.
```

**Iteration 4:**
```
Add enemy spikes that reset the player when touched.
```

Each prompt generates a new version of your game while preserving previous features. You can always roll back to an earlier version if something doesn't work as expected.

### Best Practices for Iteration

**Make one change at a time** — It's easier to see what worked and what didn't.

**Test after each iteration** — Don't stack multiple prompts without playing the game.

**Be specific about changes** — Instead of "make it better," say "increase movement speed by 50%."

**Reference existing elements** — "Add a timer above the coin counter" is clearer than "add a timer."

## Step 7: View and Download Source Code

Click the **"View Code"** button to see your game's complete source code. You can:

- Browse files and folders
- Read generated comments explaining systems
- Download a `.zip` archive of the entire project
- Copy snippets for manual editing

The code is well-structured and follows Bevy best practices, making it easy to understand even if you're new to Rust.

## Step 8: Connect GitHub (Optional)

To push your game to GitHub:

1. Click **"Connect GitHub"** in the project settings
2. Authorize MonoPlay Forge to access your repositories
3. Choose a repository name
4. Click **"Push to GitHub"**

Forge creates a new repository in your GitHub account with the complete game source and a detailed README. Every iteration becomes a commit, giving you full version history.

See [GitHub Integration](./github-integration.md) for more details.

## Step 9: Publish to MonoPlay (Optional)

Ready to share your game with the world? Click **"Publish to Store"** to:

1. Run automated security scans
2. Build platform-specific versions (Windows, macOS, Linux)
3. Create a store listing with screenshots and description
4. Set your price (free or paid)

Once published, your game appears in the MonoPlay store where players can discover, download, and play it.

See [Publishing](./publishing.md) for the complete publishing workflow.

## Example: Building a Simple Platformer

Let's walk through a complete example from start to finish.

### Initial Prompt
```
Create a 2D platformer with a robot character. Add ground platforms and
three floating platforms arranged like stairs. The robot should jump
between platforms to reach a goal flag at the top. Display "You Win!"
when the player reaches the flag.
```

### After Testing — Iteration 1
The jump feels too weak to reach the platforms comfortably.

```
Increase jump power by 30% and add coyote time so the player can jump
just after walking off a platform.
```

### Iteration 2
Game feels empty. Let's add some challenge.

```
Add collectible batteries on each platform. Add a battery counter in
the top-right corner. Require collecting all batteries before the flag
becomes active.
```

### Iteration 3
Still needs more gameplay variety.

```
Add enemy drones that patrol back and forth on the platforms. If the
player touches a drone, they respawn at the starting position.
```

### Iteration 4
Let's add some juice to make it feel better.

```
Add particle effects when collecting batteries. Play a sound effect
when jumping and landing. Add a victory jingle when reaching the goal.
```

After these four iterations, you have a complete platformer with movement, collectibles, enemies, and polish — built in under 10 minutes.

## Next Steps

Now that you've created your first game, explore these topics:

- **[Prompting Guide](./prompting-guide.md)** — Learn advanced prompting techniques
- **[Templates](./templates.md)** — Explore different game genres and starting points
- **[GitHub Integration](./github-integration.md)** — Set up version control and collaboration
- **[Publishing](./publishing.md)** — Share your game with players

## Common Questions

**How many iterations can I do per game?**
As many as you want within your monthly generation limit. Each iteration (including the initial generation) counts as one generation.

**Can I edit the code manually after generating?**
Absolutely. Download the source code or push to GitHub and edit locally. You can continue using Forge for iterations or switch to manual development.

**What if my game doesn't compile?**
Forge validates generated code before compilation. If an error occurs, you'll see a detailed error message. You can try rephrasing your prompt or reverting to the previous version.

**Can I use my own assets?**
Not directly in the browser preview, but once you download or push to GitHub, you can replace placeholder assets with your own.

**Do I need to know Rust or Bevy?**
No. Forge handles all the code generation. However, familiarity with Rust and Bevy helps if you want to customize your game beyond what Forge can do.

Ready to build? Head to [forge.monoplay.xyz](https://forge.monoplay.xyz) and start creating!
