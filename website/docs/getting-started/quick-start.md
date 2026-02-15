---
sidebar_position: 3
title: Quick Start Guide
---

# Quick Start Guide

Get started with MonoPlay in minutes. Choose your path below based on what you want to do.

---

## For Players

Buy, download, and play your first game on MonoPlay.

### 1. Set Up Your Wallet

If you haven't already, [create an account](/getting-started/create-account) by connecting an EVM-compatible wallet (MetaMask recommended).

**Quick checklist:**
- Wallet installed and set up
- Connected to Monolythium network
- LYTH tokens in your wallet

### 2. Browse the Store

Visit [monoplay.xyz](https://monoplay.xyz) and explore:

- **Featured**: Staff picks and trending games
- **New Releases**: Recently published titles
- **Categories**: Action, RPG, Strategy, Puzzle, Indie, etc.
- **Top Rated**: Highest community scores
- **Free to Play**: No purchase required

**Pro Tips:**
- Use the search bar to find specific games
- Filter by genre, price, rating, or release date
- Add games to your wishlist to track price drops
- Read reviews and watch trailers before buying

### 3. Purchase a Game

Found something you like? Here's how to buy it:

1. Click on the game to open its store page
2. Review the description, screenshots, and system requirements
3. Click **"Buy Now"** or **"Add to Cart"**
4. Review your cart and click **"Checkout"**
5. Your wallet will prompt you to approve the transaction
6. Confirm the amount and gas fee
7. Wait for transaction confirmation (usually 5-15 seconds)

**What happens next:**
- An on-chain license record is created in your name
- The game appears in your library
- You can now download and play

[Learn more about payments →](/platform/payments)

### 4. Download the Launcher

The **MonoPlay Launcher** is a desktop app that manages your game library and downloads.

**Installation:**
1. Visit [monoplay.xyz/launcher](https://monoplay.xyz/launcher)
2. Download for your OS (Windows, macOS, or Linux)
3. Run the installer and follow the prompts
4. Launch the app and connect your wallet

**System Requirements:**
- Windows 10/11, macOS 11+, or Linux (Ubuntu 20.04+)
- 4GB RAM minimum (8GB recommended)
- 100MB free disk space for the launcher (plus game storage)

[Learn more about the Launcher →](/platform/launcher)

### 5. Download and Play Your Game

Once the launcher is installed:

1. Open the MonoPlay Launcher
2. Navigate to **"Library"**
3. Find your purchased game and click **"Install"**
4. Choose an installation directory
5. The game downloads via the GRID network (torrent-based)
6. Once complete, click **"Play"**

**Download speeds:**
- Typical: 10-50 MB/s (depends on seeders and your connection)
- Large games (50GB+) may take 30-60 minutes
- Downloads can be paused and resumed

**Offline Play:**
After the first launch, you can play offline anytime. The launcher caches your license token locally.

### 6. Explore More Features

**Library Management:**
- Sort by recently played, install date, or name
- Uninstall games to free up space
- Re-download anytime (your license is permanent)

**Updates:**
- Games auto-update when new versions are released
- Toggle auto-updates in settings

**Community:**
- Rate and review games you've played
- Join game-specific Discord servers
- Share screenshots and gameplay clips

---

## For Developers

Build and publish your first game on MonoPlay.

### Option A: Use MonoPlay Forge (Easiest)

**MonoPlay Forge** is an AI-powered game builder. No coding required to get started.

#### 1. Access Forge

1. Visit [forge.monoplay.xyz](https://forge.monoplay.xyz)
2. Connect your wallet
3. Click **"New Project"**

#### 2. Describe Your Game

Use the AI builder to generate a prototype:

**Example Prompt:**
```
Create a 2D platformer where the player is a robot collecting batteries
in a factory. Add jumping, double-jump, and basic enemies. Pixel art style.
```

**What happens:**
- Forge generates a playable prototype in 30-60 seconds
- You can test it instantly in the browser
- All game code is editable if you want to customize

#### 3. Customize (Optional)

- Use the visual editor to tweak levels, sprites, and UI
- Add new features with follow-up AI prompts
- Import custom assets (sprites, sounds, music)
- Edit Rust code directly if you're technical

#### 4. Test Your Game

- Click **"Play"** in the Forge editor
- Test on different resolutions and inputs
- Share a preview link with friends for feedback

#### 5. Publish to MonoPlay

1. Click **"Publish"** in the Forge menu
2. Fill out store metadata:
 - Game title and description
 - Genre and tags
 - Price (free or paid in LYTH)
 - Screenshots and trailer (optional)
3. Submit for automated security review (takes 5-10 minutes)
4. Once approved, your game goes live on the store

[Learn more about Forge →](/forge/overview)

---

### Option B: Use the Bevy SDK (For Experienced Developers)

If you prefer traditional game development, use the **Bevy engine** with MonoPlay SDKs.

#### 1. Install Rust and Bevy

**Prerequisites:**
- Rust 1.70+ ([rustup.rs](https://rustup.rs))
- Git

**Create a new project:**
```bash
cargo new my-game
cd my-game
cargo add bevy
cargo add monoplay-sdk
```

#### 2. Set Up MonoPlay Integration

Add MonoPlay licensing and API support:

```rust
use bevy::prelude::*;
use monoplay_sdk::*;

fn main() {
 App::new()
 .add_plugins(DefaultPlugins)
 .add_plugins(MonoPlayPlugin)
 .add_systems(Startup, setup)
 .add_systems(Update, game_logic)
 .run();
}

fn setup(mut commands: Commands, license: Res<LicenseVerifier>) {
 // Verify player owns the game
 if !license.is_valid() {
 panic!("No valid license found!");
 }

 // Your game setup...
}

fn game_logic() {
 // Your game logic...
}
```

#### 3. Build and Test

```bash
cargo run
```

Your game will check for a local license on startup. For testing, Forge can generate a dev license.

#### 4. Package for Distribution

```bash
# Build release binary
cargo build --release

# Package assets
monoplay-cli package --binary target/release/my-game --assets assets/

# This creates my-game.mpkg (MonoPlay package)
```

#### 5. Publish via Forge

1. Upload your `.mpkg` file to [forge.monoplay.xyz](https://forge.monoplay.xyz)
2. Fill out store metadata
3. Submit for security review
4. Go live once approved

[Learn more about the SDK →](../sdk/overview.md)

---

## For Node Operators

Run a GRID node and earn LYTH by seeding games.

### 1. Check Requirements

**Minimum:**
- 100GB free disk space
- 10 Mbps upload speed
- Always-on connection (or near-24/7 uptime)

**Recommended:**
- 500GB+ SSD storage
- 50+ Mbps upload speed
- Static IP or DDNS

**Supported Platforms:**
- Linux (Ubuntu 20.04+, Debian 11+)
- Windows 10/11
- macOS 11+

### 2. Install GRID Node Software

**Linux (via package manager):**
```bash
# Add MonoPlay repository
curl -fsSL https://grid.monoplay.xyz/install.sh | sudo bash

# Install GRID node
sudo apt install monoplay-grid-node

# Or with snap
sudo snap install monoplay-grid
```

**Windows:**
1. Download installer from [grid.monoplay.xyz/download](https://grid.monoplay.xyz/download)
2. Run `monoplay-grid-setup.exe`
3. Follow installation wizard

**macOS:**
```bash
brew tap monoplay/grid
brew install monoplay-grid-node
```

### 3. Configure Your Node

Run the setup wizard:

```bash
monoplay-grid setup
```

**You'll be asked:**
- Wallet address for rewards (your LYTH address)
- Storage allocation (how much disk space to use)
- Upload bandwidth limit (optional)
- Port configuration (default: 6881 for torrent, 8080 for API)

**Example config:**
```
Wallet Address: 0x1234...abcd
Storage: 250GB
Bandwidth: No limit (use all available)
Ports: Default (6881, 8080)
```

### 4. Open Firewall Ports

For optimal performance, allow incoming connections:

**Linux (ufw):**
```bash
sudo ufw allow 6881/tcp
sudo ufw allow 6881/udp
sudo ufw allow 8080/tcp
```

**Windows Firewall:**
The installer should handle this automatically. If not, manually allow `monoplay-grid.exe`.

**Router Port Forwarding:**
Forward ports 6881 (TCP/UDP) and 8080 (TCP) to your node's local IP.

### 5. Start Your Node

**Linux (systemd):**
```bash
sudo systemctl start monoplay-grid
sudo systemctl enable monoplay-grid # Auto-start on boot
```

**Windows:**
The node runs as a Windows Service. Start from Services panel or:
```cmd
net start MonoPlayGRID
```

**macOS:**
```bash
brew services start monoplay-grid-node
```

### 6. Monitor Earnings

**Command line:**
```bash
monoplay-grid stats
```

**Web dashboard:**
Visit `http://localhost:8080` in your browser to see:
- Current seeding status
- Upload/download stats
- Estimated daily earnings
- Reward history

**How rewards work:**
- You earn LYTH based on upload bandwidth contributed
- Rewards are calculated hourly and distributed daily
- Popular games pay more (higher demand = higher rewards)
- Minimum payout: 10 LYTH (to reduce transaction fees)

[Learn more about GRID rewards →](/grid/rewards)

---

## Next Steps

### For Players
- [Explore payment options](/platform/payments)
- [Understand licenses](/platform/licenses)
- [Join the community](https://discord.gg/monoplay)

### For Developers
- [Forge AI Builder Tutorial](../forge/overview.md)
- [Bevy SDK Reference](../sdk/overview.md)
- [Publishing Guidelines](/forge/publishing)

### For Node Operators
- [Optimize earnings](../grid/rewards.md)
- [Troubleshooting guide](../grid/faq.md)
- [Node operator rewards breakdown](/grid/rewards)

---

Need help? Check the [FAQ](../reference/faq.md) or join [Discord](https://discord.gg/monoplay).
