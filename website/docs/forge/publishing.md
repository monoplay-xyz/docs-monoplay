---
sidebar_position: 6
title: Publishing
---

# Publishing to MonoPlay Store

Once your game is ready, you can publish it directly to the MonoPlay store from Forge. The publishing process handles platform builds, security scanning, code signing, and store listing creation — all in one streamlined workflow.

## Before You Publish

### 1. Test Thoroughly

Make sure your game is stable and playable:
- **No game-breaking bugs** — Players should be able to complete the experience
- **Performance** — Test on different hardware (if possible) to ensure smooth gameplay
- **Controls** — Verify all inputs work as expected
- **UI** — Check that menus, buttons, and text are readable and functional
- **Audio** — Ensure sound effects and music play correctly

### 2. Replace Placeholder Assets

Forge generates code but uses placeholder graphics and sounds. Before publishing:
- Create or commission final art (sprites, 3D models, textures)
- Add proper sound effects and music
- Design UI elements (buttons, icons, fonts)
- Write final text (menus, dialogue, tutorials)

You can push updated assets to GitHub and sync them to Forge, or publish with placeholders and update later.

### 3. Prepare Marketing Materials

You'll need these for your store listing:
- **Game title** — Clear, memorable name
- **Short description** — 1-2 sentences explaining the game (max 160 characters)
- **Full description** — Detailed overview, features, and gameplay (max 2000 characters)
- **Screenshots** — At least 3 screenshots showing gameplay (1920x1080 recommended)
- **Cover art** — Primary store image (1200x800 pixels)
- **Trailer** (optional) — Gameplay video (YouTube or direct upload, max 2 minutes)

### 4. Choose Your Pricing

Decide if your game will be:
- **Free** — No cost to download
- **Paid** — One-time purchase ($0.99 - $59.99)
- **Free with IAP** — Free to download with in-app purchases or DLC

MonoPlay takes a **15% platform fee** on all sales. You receive 85% of revenue after payment processing fees.

## Publishing Workflow

### Step 1: Initiate Publishing

From your Forge project:

1. Click the **"Publish"** button in the top toolbar
2. Review the pre-publish checklist
3. Click **"Continue to Publishing"**

### Step 2: Security Scan

Forge automatically runs security checks on your game:

- **Dependency audit** — Checks for known vulnerabilities in crates
- **Code analysis** — Scans for common security issues (buffer overflows, unsafe code)
- **Asset verification** — Ensures assets don't contain malware or inappropriate content
- **Privacy compliance** — Verifies no unauthorized data collection

This takes 2-5 minutes depending on project size.

If issues are found, you'll see a report with:
- **Critical** — Must be fixed before publishing
- **Warnings** — Recommended fixes (won't block publishing)
- **Info** — Best practice suggestions

Fix critical issues and re-run the scan.

### Step 3: Platform Builds

Once security passes, Forge compiles your game for desktop platforms:

- **Windows** (x64) — `.exe` installer and portable `.zip`
- **macOS** (Universal) — `.dmg` installer and `.app` bundle
- **Linux** (x64) — `.AppImage` and `.tar.gz`

This process takes 5-10 minutes as each platform is built and tested.

You can preview each build by clicking **"Download Test Build"** before finalizing.

### Step 4: Code Signing

For Windows and macOS, Forge code-signs your game with MonoPlay's developer certificate. This:
- Prevents "Unknown Publisher" warnings on Windows
- Allows installation on macOS without Gatekeeper warnings
- Increases player trust and download rates

**Note:** If you have your own code signing certificate, you can provide it in the advanced settings.

### Step 5: Store Listing

Fill out your store page:

#### Basic Information
- **Game Title** — Public-facing name (can differ from project name)
- **Subtitle** — One-line hook (e.g., "A fast-paced platformer with a twist")
- **Developer Name** — Your name or studio name

#### Description
- **Short Description** — Appears in search results and cards (max 160 chars)
- **Full Description** — Main store page description (supports Markdown)

Example:
```markdown
## About the Game
Neon Runner is a high-speed platformer where momentum is everything.
Wall-run, slide, and parkour through 30 challenging levels.

## Features
- Tight, responsive controls
- 30 hand-crafted levels
- Speedrun timer and leaderboards
- Unlockable color palettes
- Original electronic soundtrack

## Controls
- Arrow Keys / WASD - Move
- Space - Jump
- Shift - Slide
```

#### Media
- **Cover Image** — Primary thumbnail (1200x800, JPG or PNG)
- **Screenshots** — 3-10 images (1920x1080 recommended)
- **Trailer** — YouTube URL or direct upload (optional but recommended)
- **Logo** — Square icon (512x512, PNG with transparency)

Drag and drop to reorder screenshots. The first screenshot appears as the featured image on the store page.

#### Categorization
- **Genre** — Platformer, Puzzle, RPG, Shooter, Strategy, etc.
- **Tags** — Descriptive keywords (e.g., "pixel art", "roguelike", "multiplayer")
- **Player Count** — Single-player, Local Multiplayer, Online Multiplayer
- **Age Rating** — Everyone, Teen (13+), Mature (17+)

#### Pricing
- **Price Tier** — Free, $0.99, $1.99, $2.99, $4.99, $9.99, $14.99, $19.99, etc.
- **Regional Pricing** — Auto-adjusted by default (can customize per region)
- **Launch Discount** (optional) — Percentage off for the first 7-30 days

#### System Requirements
Forge auto-detects these based on your game, but you can customize:
- **Minimum** — Lowest spec that runs at 30 FPS
- **Recommended** — Spec for optimal 60 FPS experience

Example (generated):
```
Minimum:
- OS: Windows 10 / macOS 10.15 / Ubuntu 20.04
- Processor: Intel Core i3 / AMD Ryzen 3
- Memory: 4 GB RAM
- Graphics: Intel HD 4000 / equivalent
- Storage: 200 MB

Recommended:
- OS: Windows 11 / macOS 13 / Ubuntu 22.04
- Processor: Intel Core i5 / AMD Ryzen 5
- Memory: 8 GB RAM
- Graphics: NVIDIA GTX 1050 / AMD RX 560
- Storage: 500 MB
```

### Step 6: Review and Submit

Before finalizing:
- Preview your store page
- Download and test platform builds
- Review pricing and distribution settings

Click **"Submit for Review"** when ready.

## Review Process

### What Happens During Review

MonoPlay's automated and manual review ensures quality and compliance:

1. **Automated Checks** (instant)
   - All required fields filled
   - Media meets technical requirements
   - Builds are functional and launch correctly

2. **Content Review** (1-3 days)
   - Game matches description
   - No inappropriate content
   - No copyright infringement
   - Complies with platform policies

3. **Quality Assurance** (1-2 days)
   - Game is playable and stable
   - No critical bugs
   - Performance is acceptable

**Average review time: 2-4 business days**

You'll receive an email when your game is approved or if changes are needed.

### Common Review Issues

**Rejected for misleading description**
- Ensure screenshots and description accurately represent gameplay
- Don't promise features that aren't in the game

**Rejected for copyright**
- Make sure you own or have licensed all assets (art, music, fonts)
- Don't use copyrighted characters or brands without permission

**Rejected for instability**
- Fix crashes and game-breaking bugs before submitting
- Test on multiple devices if possible

**Rejected for inappropriate content**
- Follow age rating guidelines
- Mark mature content appropriately

You can fix issues and resubmit immediately.

## Post-Publication

### Store Page Live

Once approved, your game goes live on the MonoPlay store:

- **Store URL** — `monoplay.xyz/games/your-game-slug`
- **Immediate availability** — Players can download instantly
- **Search indexing** — Appears in browse and search results

### Tracking Performance

Access analytics from your Forge dashboard:

- **Downloads** — Total downloads over time
- **Revenue** — Sales, refunds, and net earnings
- **Ratings** — Player ratings and reviews
- **Playtime** — Average session length and total hours played

### Managing Reviews

Players can leave ratings (1-5 stars) and written reviews. You can:
- **Respond to reviews** — Reply publicly to feedback
- **Report inappropriate reviews** — Flag spam or abuse
- **View trends** — See what players like and dislike

Responding to reviews shows you're engaged and can improve your game's reputation.

### Updating Your Listing

You can edit your store page at any time:
- Update description and screenshots
- Adjust pricing (up or down)
- Add new media (trailer, screenshots)
- Change tags and categories

Changes take effect immediately (no re-review needed).

## Distribution and Delivery

### How Players Get Your Game

When a player purchases or downloads your game:

1. **Account Creation** — Player creates/signs into MonoPlay account
2. **Purchase** (if paid) — Payment via credit card, PayPal, or crypto
3. **Download** — Player chooses their platform (Windows/macOS/Linux)
4. **Installation** — Installer or portable version
5. **Play** — Game launches and registers to their library

### DRM and Copy Protection

MonoPlay uses **light DRM** by default:
- Game verifies ownership on first launch (requires internet once)
- After activation, works offline indefinitely
- No install limits or activation caps
- Can reinstall on new devices anytime

You can opt for **DRM-free** in advanced settings if preferred.

### Updates and Patches

When you update your game (see [Updating Games](./updating-games.md)):
- Players see an "Update Available" notification in their library
- Update downloads automatically or on-demand (player preference)
- Patch notes appear in the update prompt

## Revenue and Payouts

### Revenue Split

- **You:** 85% of sale price (after payment processing)
- **MonoPlay:** 15% platform fee

Example: $10 game sale
- Player pays: $10.00
- Payment processing (~3%): -$0.30
- MonoPlay fee (15%): -$1.50
- **You receive: $8.20**

### Payment Schedule

- **Threshold:** $100 minimum balance
- **Frequency:** Monthly (1st of each month)
- **Methods:** PayPal, bank transfer (ACH/SEPA), or crypto (USDC)

### Tax Reporting

MonoPlay provides:
- **1099 forms** (US developers)
- **Sales reports** for tax filing
- **EU VAT handling** (automatic)

Consult a tax professional for your specific situation.

## Advanced Publishing Options

### Early Access

Launch in Early Access to gather feedback while developing:
- Clearly marked as "Early Access" on store page
- Can update frequently without full re-review
- Reduced platform fee (12% instead of 15%)
- Graduate to full release when ready

### Beta Testing

Before public launch, run a closed beta:
- Invite-only or public signup
- Free access regardless of final price
- Collect feedback and crash reports
- Beta testers can leave reviews after launch

### Regional Availability

Choose where your game is available:
- **Worldwide** — All countries (default)
- **Exclude regions** — Block specific countries
- **Phased rollout** — Launch in some regions first

### Multiple Editions

Publish variants of your game:
- **Standard Edition** — Base game
- **Deluxe Edition** — Includes DLC or bonuses
- **Demo** — Free limited version

Each edition has its own store page.

## Common Questions

### Can I publish games made outside of Forge?

Not through the Forge publishing workflow. However, the main MonoPlay developer portal accepts any game built with Bevy or other engines. Forge publishing is exclusively for Forge-created games.

### What if my game doesn't pass security review?

You'll receive a detailed report. Fix the issues in Forge (or locally, then sync), and resubmit. There's no penalty for failed reviews.

### Can I publish the same game on Steam, Itch.io, etc.?

Yes. You retain full rights to your game. MonoPlay's agreement is non-exclusive. However, you can't sell Steam keys in the MonoPlay store or vice versa.

### Do I need a business license or tax ID?

Not required, but recommended if you expect significant revenue. MonoPlay reports payments to tax authorities in your country.

### Can I unpublish my game later?

Yes. You can delist your game at any time, making it unavailable for new purchases. Existing owners retain access.

### What happens if my game violates policies after launch?

MonoPlay reserves the right to remove games that violate terms of service. You'll be notified and given a chance to fix issues before removal.

## Next Steps

Ready to publish? Make sure you've:
- [x] Tested your game thoroughly
- [x] Replaced placeholder assets
- [x] Prepared marketing materials
- [x] Decided on pricing

Once published, learn how to [update your game](./updating-games.md) with new content and fixes.

Need to increase your generation limit to finish polishing? See [pricing plans](./plans.md).

Good luck with your launch! 🚀
