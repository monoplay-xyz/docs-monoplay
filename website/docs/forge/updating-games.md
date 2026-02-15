---
sidebar_position: 7
title: Updating Games
---

# Updating Published Games

After publishing your game, you'll likely want to add features, fix bugs, and improve based on player feedback. MonoPlay Forge makes it easy to update published games through continued AI iteration or independent development.

## Two Paths to Updates

You have two options for updating your game after publication:

### 1. Continue with Forge
Keep using AI-powered iteration to add features and fix issues. Best for quick updates and non-technical developers.

### 2. Work Independently
Clone your repository, develop locally, and manually publish updates. Best for complex features and teams with programming experience.

You can switch between these approaches or use both simultaneously.

## Updating with Forge

### Making Changes

To update your published game using Forge:

1. Open your project in the Forge dashboard
2. Click **"Continue Development"**
3. Write iteration prompts as usual:
 ```
 Fix the bug where jumping near walls causes clipping
 Add a new power-up that grants invincibility for 5 seconds
 Increase enemy AI difficulty in later levels
 ```
4. Test changes in the browser preview
5. Once satisfied, click **"Publish Update"**

### Creating an Update

When you click "Publish Update":

1. **Version Increment** — Choose version type:
 - **Patch** (1.0.0 → 1.0.1) — Bug fixes and minor tweaks
 - **Minor** (1.0.0 → 1.1.0) — New features, content additions
 - **Major** (1.0.0 → 2.0.0) — Significant overhaul or breaking changes

2. **Patch Notes** — Write player-facing notes:
 ```markdown
 ## Version 1.1.0 - New Power-Ups Update

 ### New Features
 - Added invincibility power-up
 - Added speed boost power-up
 - Power-ups now spawn randomly during gameplay

 ### Improvements
 - Enemy AI is now more challenging in levels 6-10
 - Improved wall collision detection

 ### Bug Fixes
 - Fixed wall clipping issue when jumping
 - Fixed score not saving between sessions
 ```

3. **Platform Builds** — Forge rebuilds for Windows, macOS, and Linux
4. **Security Scan** — Quick scan for new vulnerabilities (1-2 minutes)
5. **Submit** — Update goes live after automated review (usually < 24 hours)

### Update Review Process

Updates go through a lighter review than initial publication:

- **Automated checks** — Builds compile and launch successfully
- **Policy compliance** — No new inappropriate content
- **Stability** — No critical new bugs

**Average review time: 4-12 hours**

Critical bug fixes can be fast-tracked (1-2 hours) by marking the update as "Hotfix."

### Player Update Flow

When your update is approved:

1. **Notification** — Players with the game installed see "Update Available"
2. **Download** — Update downloads in background (or on-demand)
3. **Patch Notes** — Players see your change log before updating
4. **Installation** — Update applies automatically or on next launch (player preference)

Players can choose to stay on older versions if preferred (settings option).

## Updating Independently

### Local Development Workflow

For more control over updates:

1. **Clone Your Repository**
 ```bash
 git clone https://github.com/your-username/your-game.git
 cd your-game
 ```

2. **Make Changes Locally**
 - Edit code in your preferred IDE (VS Code, RustRover, etc.)
 - Test by running `cargo run`
 - Commit changes: `git commit -am "Add new boss enemy"`

3. **Push to GitHub**
 ```bash
 git push origin main
 ```

4. **Sync to Forge** (optional)
 - Open project in Forge
 - Click **"Sync from GitHub"**
 - Forge pulls your changes

5. **Publish Update**
 - Click **"Publish Update"** in Forge
 - Fill out version and patch notes
 - Submit for review

### Manual Build Upload

If you want to build locally instead of using Forge's build service:

1. **Build for Each Platform**
 ```bash
 # Windows (from Linux/Mac using cross)
 cargo build --release --target x86_64-pc-windows-gnu

 # macOS (from Mac)
 cargo build --release --target x86_64-apple-darwin
 cargo build --release --target aarch64-apple-darwin

 # Linux
 cargo build --release --target x86_64-unknown-linux-gnu
 ```

2. **Create Installers**
 - Use tools like `cargo-bundle` or `cargo-packager`
 - Generate `.exe` installer (Windows), `.dmg` (macOS), `.AppImage` (Linux)

3. **Upload to Developer Portal**
 - Go to [monoplay.xyz/developers](https://monoplay.xyz/developers)
 - Select your game
 - Click **"Upload New Build"**
 - Upload each platform's installer
 - Fill out version and patch notes
 - Submit for review

This bypasses Forge's build service but uses the same review process.

## Version Management

### Semantic Versioning

MonoPlay uses semantic versioning (semver):

- **MAJOR** (1.0.0 → 2.0.0) — Breaking changes, major overhauls
- **MINOR** (1.0.0 → 1.1.0) — New features, backward-compatible
- **PATCH** (1.0.0 → 1.0.1) — Bug fixes, minor tweaks

Examples:
- Fixed collision bug: `1.0.0` → `1.0.1` (patch)
- Added 10 new levels: `1.0.1` → `1.1.0` (minor)
- Complete combat system overhaul: `1.1.0` → `2.0.0` (major)

### Version History

Players can view your version history on the store page:
- All previous versions listed
- Patch notes for each
- Release dates

You can't delete version history, but you can edit patch notes for clarity.

### Rolling Back

If an update introduces a critical bug:

1. Click **"Rollback"** in the developer portal
2. Select the previous stable version
3. Confirm rollback

Players on the broken version are automatically downgraded. This is a last resort — better to push a quick hotfix.

## Update Strategies

### Frequent Small Updates

**Approach:** Push updates weekly or bi-weekly with incremental improvements.

**Pros:**
- Players see consistent development
- Easier to isolate bugs
- Builds momentum and engagement

**Cons:**
- Update fatigue (players annoyed by constant downloads)
- Less time for thorough testing

**Best for:** Early Access games, live service games, active communities

### Milestone-Based Updates

**Approach:** Work for 1-3 months, then release a major update with multiple features.

**Pros:**
- Polished, cohesive updates
- Marketing opportunities (relaunch announcements)
- Players get substantial new content

**Cons:**
- Long wait between updates
- Risk of losing player interest

**Best for:** Single-player narrative games, premium titles, smaller teams

### Hotfix + Feature Cycle

**Approach:** Hotfix critical bugs immediately, schedule feature updates monthly.

**Pros:**
- Stability maintained
- Predictable update schedule
- Balance of responsiveness and polish

**Cons:**
- Requires discipline to stick to schedule
- Emergency hotfixes can disrupt planning

**Best for:** Most commercial games, balanced approach

## Handling Player Feedback

### Reading Reviews

After launch, players leave reviews and feedback. Use this to prioritize updates:

**Common Themes:**
- If 10+ reviews mention "controls feel floaty," adjust movement physics
- If players request "more levels," add content
- If "too easy" appears often, increase difficulty

**Individual Suggestions:**
- Evaluate if they align with your vision
- Consider effort vs. impact
- Some feedback is subjective (ignore "make it like [other game]")

### Responding to Bug Reports

When players report bugs:

1. **Reproduce the Issue**
 - Try to trigger the bug yourself
 - Ask for steps to reproduce if unclear

2. **Fix and Test**
 - Fix in Forge or locally
 - Test edge cases to ensure it's solved

3. **Push Hotfix**
 - Mark as "Hotfix" for fast-tracked review
 - Include fix in patch notes

4. **Communicate**
 - Reply to the review: "Fixed in version 1.0.2, thanks for reporting!"
 - Shows you're responsive and care about quality

### Feature Requests

Players often request features:

**Evaluate Based On:**
- **Alignment:** Does it fit your game's design?
- **Effort:** Can you implement it in reasonable time?
- **Impact:** Will it improve the experience for most players?

**Examples:**
- "Add multiplayer" — High effort, consider if worthwhile
- "Add colorblind mode" — Medium effort, high impact (accessibility)
- "Add a speedrun timer" — Low effort, high impact for certain players

Communicate your roadmap so players know what's coming.

## Content Updates vs. Bug Fixes

### Bug Fix Updates (Patches)

**What they include:**
- Crash fixes
- Gameplay bugs (clipping, soft locks)
- UI issues (text overflow, broken buttons)
- Performance optimizations

**Publishing:**
- Fast-tracked review
- Free to all players (even during launch discount)
- Doesn't reset discount timer

### Content Updates (Minor/Major)

**What they include:**
- New levels, characters, items
- New game modes
- Balance changes
- Visual/audio improvements

**Publishing:**
- Normal review process
- Can be free or paid DLC
- Good for marketing and re-engagement

### DLC and Expansions

For major content additions, consider releasing as paid DLC:

1. Create a new Forge project (or develop locally)
2. Build the DLC content
3. Publish as **"DLC for [Your Game]"**
4. Set DLC price (usually 20-50% of base game price)

DLC appears on your game's store page. Players must own the base game to purchase.

## Coordinating Forge and Local Development

If you use both Forge and local development:

### Best Practices

1. **Always sync before iterating in Forge**
 - Pull latest changes from GitHub
 - Click "Sync from GitHub" in Forge
 - Prevents conflicts

2. **Document manual changes**
 - Add comments explaining your code
 - Helps Forge's AI understand context

3. **Use branches for experiments**
 - Create a `forge-iteration` branch for AI changes
 - Merge to `main` after testing
 - Keeps main stable

4. **Test thoroughly after syncing**
 - Forge AI + manual code can conflict
 - Run full playtest after major syncs

### When Forge Can't Understand Your Code

If you've heavily customized the codebase, Forge's AI might struggle:

**Signs:**
- Iterations break existing features
- AI ignores custom systems
- Compile errors after generation

**Solutions:**
- Simplify prompts (target specific files)
- Add detailed comments explaining your systems
- Use local development exclusively for complex features
- Keep Forge for simple additions (UI, tweaks, content)

## Analytics and Iteration

Use player data to guide updates:

### Key Metrics

- **Playtime** — Are players finishing the game? Where do they stop?
- **Retention** — Do players return after first session?
- **Difficulty** — Are levels too hard/easy? (check death rates)
- **Features** — Which mechanics are used most?

### Example: Using Data to Improve

**Observation:** 60% of players quit at level 5
**Hypothesis:** Level 5 is too difficult or confusing
**Action:** Iterate in Forge:
```
Reduce enemy count in level 5 by 25% and add a tutorial
message explaining the new mechanic before it appears.
```
**Result:** Measure completion rate after update

Repeat this cycle to continuously improve.

## Deprecating Old Versions

You can't force players to update, but you can encourage it:

### Soft Deprecation

- Display "Update Available" message on launch
- Highlight new features in patch notes
- Offer incentives (cosmetics, bonuses) for updating

### Hard Deprecation (Multiplayer Games)

- Set a "minimum version" for online play
- Old versions can't connect to servers
- Prevents fragmentation and exploits

### Sunsetting Support

If your game is several years old:
- Announce end-of-life (EOL) date (e.g., "No updates after Dec 2027")
- Final bug-fix update before EOL
- Game remains playable, just no new updates

## Common Questions

### Do updates reset player progress?

No. Updates preserve save files unless you explicitly change the save format (which you should avoid).

### Can I charge for updates?

Bug fixes and patches must be free. New content can be free or paid DLC.

### How many updates should I release?

Depends on your game and community. Aim for at least 1-2 bug-fix updates post-launch, then content updates based on feedback.

### What if I want to stop using Forge?

You can stop using Forge anytime. Your code is on GitHub; just continue developing locally and use the developer portal for updates.

### Can I update games published outside Forge?

Yes, but not through the Forge UI. Use the MonoPlay developer portal to upload new builds manually.

### Will updates affect my store page ranking?

Frequent updates can boost visibility (shows active development). Major updates are highlighted in "Recently Updated" sections.

## Update Checklist

Before publishing an update:

- [ ] Tested all changes thoroughly
- [ ] Verified no new critical bugs
- [ ] Written clear, player-friendly patch notes
- [ ] Incremented version number appropriately
- [ ] Pushed code to GitHub (if working locally)
- [ ] Built and tested on all platforms (if manual builds)
- [ ] Reviewed store page for accuracy (description still matches)

## Next Steps

Now that you understand updating:

- Review [publishing best practices](./publishing.md) to ensure quality
- Check out [plan options](./plans.md) if you need more generations for updates
- Join the [MonoPlay Discord](https://discord.gg/monoplay) to share your game and get feedback

Keep your game fresh, listen to your players, and iterate based on data. Happy updating!
