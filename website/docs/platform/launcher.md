---
sidebar_position: 2
title: Launcher
---

# MonoPlay Launcher

The **MonoPlay Launcher** is a desktop application for downloading, installing, and playing games purchased on the MonoPlay platform. It manages your game library, handles updates, and verifies on-chain licenses.

## Installation

### System Requirements

**Minimum:**
- **OS**: Windows 10, macOS 11 (Big Sur), or Ubuntu 20.04 LTS
- **RAM**: 4GB
- **Storage**: 100MB for launcher (plus space for games)
- **Internet**: Broadband connection for downloads

**Recommended:**
- **OS**: Windows 11, macOS 13 (Ventura), or Ubuntu 22.04 LTS
- **RAM**: 8GB+
- **Storage**: SSD for faster game loading
- **Internet**: 25+ Mbps for faster downloads

### Download & Install

**Step 1: Download**

Visit [monoplay.xyz/launcher](https://monoplay.xyz/launcher) and download for your operating system:

- **Windows**: `MonoPlayLauncher-Setup.exe` (120MB)
- **macOS**: `MonoPlayLauncher.dmg` (150MB, Universal Binary for Intel + Apple Silicon)
- **Linux**: `MonoPlayLauncher.AppImage` (140MB) or `.deb`/`.rpm` packages

**Step 2: Install**

**Windows:**
1. Run `MonoPlayLauncher-Setup.exe`
2. Accept the UAC prompt (required for game installation)
3. Choose installation directory (default: `C:\Program Files\MonoPlay`)
4. Wait for installation to complete
5. Launch from Start Menu or desktop shortcut

**macOS:**
1. Open `MonoPlayLauncher.dmg`
2. Drag "MonoPlay Launcher" to Applications folder
3. Right-click and select "Open" (first launch only, due to Gatekeeper)
4. Click "Open" in the security dialog

**Linux (AppImage):**
```bash
chmod +x MonoPlayLauncher.AppImage
./MonoPlayLauncher.AppImage
```

**Linux (Debian/Ubuntu):**
```bash
sudo dpkg -i monoplay-launcher_1.0.0_amd64.deb
sudo apt-get install -f # Install dependencies if needed
monoplay-launcher
```

**Linux (Fedora/RHEL):**
```bash
sudo rpm -i monoplay-launcher-1.0.0.x86_64.rpm
monoplay-launcher
```

### First-Time Setup

**Step 1: Connect Your Wallet**

On first launch, you'll be prompted to connect your wallet:
1. Click "Connect Wallet"
2. Choose your wallet provider (MetaMask, WalletConnect, etc.)
3. Approve the connection in your wallet
4. The launcher will fetch your library from the blockchain

**Step 2: Configure Settings**

**Download Location:**
- Default: `~/MonoPlay/Games` (macOS/Linux) or `C:\MonoPlay\Games` (Windows)
- Choose a drive with sufficient space
- Consider an SSD for faster load times

**Bandwidth Limits:**
- Unlimited (recommended)
- Custom limit (e.g., 10 MB/s to preserve bandwidth for other tasks)
- Pause downloads during active hours

**Auto-Updates:**
- Enable/disable automatic game updates
- Update games on launch or in the background
- Prompt before downloading large updates

**Privacy:**
- Enable/disable anonymous usage statistics
- Opt in/out of beta features
- Manage crash report submissions

## Interface Overview

### Main Window

The launcher has five main sections:

**1. Library**
- Grid or list view of owned games
- Search and filter your collection
- Sort by: Name, Last Played, Install Date, Size

**2. Store**
- Embedded MonoPlay storefront
- Browse and purchase without leaving the launcher
- Seamless integration with library

**3. Downloads**
- Active and queued downloads
- Pause, resume, or cancel downloads
- View download speed and ETA

**4. Social**
- Friends list (connected wallet addresses)
- See what friends are playing
- Join multiplayer games directly

**5. Settings**
- Account, downloads, notifications, appearance
- Game-specific settings
- Manage storage and licenses

### Top Bar

**Search:** Quick search across your library and store

**User Icon:** Click to view:
- Wallet address
- LYTH balance
- Account settings
- Disconnect wallet

**Notifications:** Updates, friend activity, sale alerts

**Minimize/Maximize/Close:** Standard window controls

### Game Tile (Grid View)

Each game in your library shows:
- Cover art
- Title
- Install status: "Installed," "Not Installed," "Updating," "Downloading"
- Action button: "Play," "Install," "Update," "Resume Download"

**Right-click for more options:**
- View in Store
- Check for Updates
- Manage DLC
- Browse Local Files
- Uninstall
- Properties

### Game Details (Click to Expand)

- Developer and publisher
- Description and features
- Playtime (tracked locally)
- Achievements progress
- Screenshots and trailer
- Recent updates/patch notes

## Downloading & Installing Games

### Starting a Download

**From Library:**
1. Find the game you own
2. Click "Install"
3. Choose install location (default or custom folder)
4. Click "Confirm"

**From Store:**
1. Purchase a game
2. A popup asks "Install Now?" → Click "Yes"
3. Or find it in Library later

### Download Process

**How It Works:**

MonoPlay uses the **GRID network** for encrypted game distribution:

1. **Fetch Metadata:** Launcher retrieves the game's release info from the MonoPlay backend
2. **Verify License:** Backend confirms your on-chain license and issues a time-limited decryption key
3. **Download Encrypted Files:** Launcher downloads encrypted game chunks from GRID Edge Relays
4. **Decrypt Locally:** Launcher decrypts the files using the license-bound key
5. **Install Game:** Game is unpacked and installed in a sandbox

**Typical Download Speeds:**
- Small games (under 5 GB): 2-5 minutes
- Medium games (5-20 GB): 10-30 minutes
- Large games (50 GB+): 30-90 minutes

*Speed depends on GRID Edge Relay availability and your internet connection.*

### Download Queue

**Managing Downloads:**
- Downloads run in parallel (up to 3 by default)
- Drag to reorder queue
- Pause/resume individual downloads
- Cancel downloads (can be restarted later without losing progress)

**Priority Levels:**
- High: Download immediately
- Normal: Standard queue
- Low: Download when nothing else is active

**Bandwidth Throttling:**
Settings → Downloads → Limit download speed
- Useful if you're gaming or streaming while downloading

### Installation

**Automatic:**
Once a download completes, the game is automatically installed:
1. Files are unpacked to the install directory
2. Registry entries created (Windows only)
3. Shortcuts added to launcher library
4. Launch verification performed

**Disk Space:**
- The launcher checks available space before downloading
- If insufficient, you'll be prompted to free space or choose another location

**Install Location:**
Default: `[MonoPlay Games Folder]/[Game Name]/`

Example:
```
C:\MonoPlay\Games\
 ├── CyberRunner2077\
 │ ├── game.exe
 │ ├── assets\
 │ └── saves\
 ├── SpaceExplorer\
 └── PixelDungeon\
```

### Updates

**Automatic Updates:**
When a developer releases a patch:
1. The launcher detects the new version
2. If "Auto-Update" is enabled, it downloads in the background
3. Update installs next time you launch the game

**Manual Updates:**
1. Go to Library
2. Games with updates show "Update Available"
3. Click "Update" to download and install

**Update Settings (Per-Game):**
- Auto-update in background
- Update only when I launch
- Notify me (manual update)

**Patch Notes:**
- Click "View Patch Notes" to see what changed
- Accessible from the game's details page

## Playing Games

### Launching a Game

**Method 1: From Launcher**
1. Open MonoPlay Launcher
2. Find the game in your library
3. Click "Play"
4. The game launches in a sandboxed environment

**Method 2: Desktop Shortcut (Optional)**
- Right-click game → "Create Desktop Shortcut"
- Launches via the MonoPlay Launcher for license verification

**Method 3: Start Menu (Windows)**
- Games appear in Start Menu under "MonoPlay"

### License Verification

**How It Works:**

When you launch a game:
1. **Launcher checks your wallet:** Verifies you still own the on-chain license
2. **Cache license token:** A temporary token is stored locally (valid for 7 days)
3. **Launch game:** The game runs with the verified token

**Offline Play:**
- After the first launch, you can play offline for up to 7 days
- The launcher uses the cached token
- Reconnect to the internet within 7 days to refresh the token

**License Issues:**
If verification fails:
- "License not found" → You don't own this game (or wrong wallet connected)
- "License expired" → Subscription games only (renew subscription)
- "Blockchain error" → Network issue (try again in a few seconds)

### Sandboxed Execution

**Security:**

For your protection, games run in a **sandboxed environment**:
- Limited file system access (can't read/write outside game directory)
- No access to other apps or system files
- Network access restricted to game servers only
- Decryption keys are device-bound and time-limited, preventing extraction or sharing

**Why This Matters:**
- Prevents malicious games from stealing data
- Isolates crashes (a game crash won't affect your system)
- Protects save files from corruption
- Ensures game files cannot be decrypted on unauthorized devices

**Disable Sandbox (Advanced):**
Settings → Security → "Allow unsandboxed execution" (not recommended)

### In-Game Overlay

Press `Shift + Tab` (default) to open the MonoPlay overlay while in-game:

**Features:**
- **Friends:** See who's online, invite to multiplayer
- **Screenshots:** Capture and share gameplay
- **Achievements:** View progress
- **Guides:** Community-created tips and walkthroughs
- **Settings:** Adjust overlay hotkey and features

**Disable Overlay:**
Settings → In-Game → "Enable Overlay" (toggle off)

## Library Management

### Organizing Your Library

**Collections:**
Create custom collections to organize games:
- "Currently Playing"
- "Completed"
- "Multiplayer Games"
- "Favorites"

**Drag and drop games** between collections.

**Filters:**
- Platform: Windows / macOS / Linux
- Genre: Action, RPG, Puzzle, etc.
- Status: Installed / Not Installed
- DLC: Games with DLC available

**Search:**
Instant search by title, developer, or tags

### Storage Management

**View Storage Usage:**
Settings → Storage → "Manage Game Installs"

Shows:
- Total storage used by MonoPlay
- Storage per game
- Last played date
- Uninstall button

**Free Up Space:**
1. Sort by size (largest first)
2. Uninstall games you haven't played recently
3. Games remain in your library (redownload anytime)

**Move Install Location:**
Right-click game → "Move Install Folder"
- Useful for moving to a larger drive

### Uninstalling Games

**Safe Uninstall:**
1. Right-click game → "Uninstall"
2. Choose: "Keep save files" or "Delete everything"
3. Confirm

**What Happens:**
- Game files are deleted
- Save files are preserved (unless you choose to delete)
- License remains on-chain (you still own the game)
- Redownload and reinstall anytime

### Save File Management

**Cloud Saves (Coming Soon):**
Automatically sync save files across devices:
- Windows desktop ↔ macOS laptop
- Encrypted and stored on-chain
- Opt-in per game

**Local Saves:**
Default location: `[Game Folder]/saves/`

**Backup Saves:**
Settings → Storage → "Backup Save Files"
- Manual backup to external drive
- Restore from backup

## Notifications & Alerts

**Types of Notifications:**
- Game updates available
- Friend came online
- Wishlist game on sale
- Download completed
- Achievement unlocked

**Notification Settings:**
Settings → Notifications → Toggle individual notification types

**Desktop Notifications:**
- Windows: Native Windows 10/11 notifications
- macOS: Native macOS notification center
- Linux: libnotify (freedesktop standard)

## Troubleshooting

### "Game won't launch"

**Solutions:**
1. Verify game files: Right-click → "Verify Integrity"
2. Update graphics drivers
3. Check system requirements
4. Disable antivirus (temporarily) and retry
5. View logs: Help → "Open Log Files"

### "Download stuck at 0%"

**Solutions:**
1. Pause and resume download
2. Check firewall settings (allow MonoPlay Launcher)
3. Check your internet connection and try again
4. Wait a few minutes (edge relays may be syncing new content)

### "License verification failed"

**Solutions:**
1. Check you're connected to the correct wallet
2. Ensure Monolythium network is selected in your wallet
3. Refresh: Settings → Account → "Re-sync Library"
4. Check Monoscan to verify your license on-chain

### "Out of disk space"

**Solutions:**
1. Uninstall unused games
2. Change download location to another drive
3. Clear launcher cache: Settings → Storage → "Clear Cache"

### "Launcher won't open"

**Solutions:**
1. Restart your computer
2. Reinstall the launcher (your library is saved on-chain)
3. Check for conflicting software (antivirus, firewalls)
4. Run as administrator (Windows) or with elevated permissions

## Advanced Features

### Command-Line Arguments

Launch the launcher with flags for automation:

```bash
# Launch a specific game
monoplay-launcher --launch "CyberRunner2077"

# Start download
monoplay-launcher --download "SpaceExplorer"

# Update all games
monoplay-launcher --update-all
```

### API Access (Developers)

The launcher exposes a local API for third-party integrations:

**Endpoint:** `http://localhost:9339/api`

**Example: Get library**
```bash
curl http://localhost:9339/api/library
```

**Use Cases:**
- Stream overlays (OBS, Streamlabs)
- Discord Rich Presence integration
- Custom launcher skins

**Documentation:** [monoplay.xyz/launcher-api](https://monoplay.xyz/launcher-api)

### Beta Features

Opt into experimental features:
Settings → Advanced → "Enable Beta Features"

**Current Beta Features:**
- Cloud save synchronization
- HDR support for compatible games
- Mod manager integration

## Privacy & Data

**What the Launcher Tracks Locally:**
- Games you own (fetched from blockchain)
- Playtime per game
- Achievement progress
- Download history

**What's Sent to MonoPlay:**
- Anonymous usage statistics (if enabled)
- Crash reports (if enabled)
- License verification requests (on launch)

**What's NOT Tracked:**
- In-game activity
- Browsing history outside MonoPlay
- Personal files or data

**Data Export:**
Settings → Privacy → "Export My Data"
- Downloads a JSON file with all tracked data

## Next Steps

- **[Understanding Licenses](/platform/licenses)**: Learn about on-chain ownership
- **[Payments Guide](/platform/payments)**: How to buy games with LYTH
- **[Storefront](/platform/storefront)**: Browse and discover games

---

Need help? Visit [support.monoplay.xyz](https://support.monoplay.xyz) or join our [Discord](https://discord.gg/monoplay).
