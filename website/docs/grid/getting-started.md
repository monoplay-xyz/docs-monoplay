---
sidebar_position: 2
---

# Getting Started

Set up your GRID node in under 30 minutes. This quick start guide covers the essential steps for both Raspberry Pi and Docker deployments.

## Prerequisites

Before starting, you'll need:

- **Hardware**: Raspberry Pi 5 or server capable of running Docker
- **Internet**: 100+ Mbps connection (upload speed most important)
- **Storage**: At least 100 GB free space (500 GB+ recommended)
- **Wallet**: Monolythium-compatible wallet with small amount of LYTH for gas fees
- **Email**: For node registration and notifications

## Installation Methods

Choose your preferred deployment:

### Option 1: Raspberry Pi 5 (Recommended for Beginners)

Best for home users wanting a simple, energy-efficient setup.

**Estimated time**: 45 minutes
**Skill level**: Beginner
**Cost**: $100-150 USD

[Full Raspberry Pi Guide →](./raspberry-pi.md)

### Option 2: Docker (Recommended for Advanced Users)

Best for those with existing servers or technical experience.

**Estimated time**: 15 minutes
**Skill level**: Intermediate
**Cost**: Free (if using existing hardware)

[Full Docker Guide →](./docker.md)

## Quick Start (Docker)

The fastest way to get started on a Linux server:

### 1. Install Docker

If not already installed:

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# Log out and back in for group changes to apply
```

### 2. Pull GRID Image

```bash
docker pull monoplay/grid:latest
```

### 3. Create Configuration

Create a directory for GRID data:

```bash
mkdir -p ~/grid-node
cd ~/grid-node
```

Create `config.yaml`:

```yaml
node:
 name: "My GRID Node"
 wallet_address: "0xYourWalletAddressHere"

storage:
 path: "/data/games"
 max_size_gb: 500

network:
 max_upload_mbps: 100
 max_download_mbps: 100
 port: 6881

rewards:
 auto_claim: true
 claim_threshold_lyth: 50
```

Replace `0xYourWalletAddressHere` with your actual wallet address.

### 4. Start Node

```bash
docker run -d \
 --name grid-node \
 --restart unless-stopped \
 -v $(pwd)/config.yaml:/config/config.yaml \
 -v $(pwd)/data:/data \
 -p 6881:6881 \
 -p 6881:6881/udp \
 -p 8080:8080 \
 monoplay/grid:latest
```

### 5. Check Status

```bash
docker logs grid-node
```

You should see:

```
[INFO] GRID Node starting...
[INFO] Wallet: 0xYour...
[INFO] Storage: 500 GB available
[INFO] Connecting to MonoPlay tracker...
[INFO] Connected! Node ID: grid-xxxxx
[INFO] Downloading content manifest...
[INFO] Seeding 3 games (12.4 GB)
[INFO] Node online and earning rewards!
```

### 6. Access Dashboard

Open your browser to `http://localhost:8080` to view the node dashboard.

## Quick Start (Raspberry Pi 5)

### 1. Prepare microSD Card

Download Raspberry Pi OS Lite (64-bit):

- [Official Raspberry Pi Imager](https://www.raspberrypi.com/software/)
- Choose "Raspberry Pi OS Lite (64-bit)"
- Configure WiFi and SSH in imager settings

Flash to microSD card (32 GB minimum, 128 GB recommended).

### 2. Boot and Connect

Insert microSD card, connect power and ethernet (WiFi works but ethernet recommended).

SSH into your Pi:

```bash
ssh pi@raspberrypi.local
# Default password: raspberry (change immediately!)
```

### 3. Run Installation Script

```bash
curl -fsSL https://install.monoplay.xyz/grid | bash
```

The script will:

- Update system packages
- Install Docker
- Download GRID software
- Configure automatic updates
- Start GRID service

### 4. Configure Wallet

```bash
sudo grid-config set-wallet 0xYourWalletAddressHere
```

### 5. Set Storage Limit

```bash
sudo grid-config set-storage 100GB
```

Adjust based on your microSD card size (leave 20% free space).

### 6. Start Seeding

```bash
sudo systemctl start grid-node
sudo systemctl enable grid-node
```

### 7. Check Status

```bash
sudo systemctl status grid-node
```

## Configuration Options

### Essential Settings

```yaml
node:
 name: "My GRID Node" # Friendly name (for dashboard only)
 wallet_address: "0x..." # REQUIRED: Your wallet address

storage:
 path: "/data/games" # Where to store game files
 max_size_gb: 500 # Maximum storage allocation
 auto_prune: true # Delete least popular games when full

network:
 max_upload_mbps: 100 # Upload speed limit (0 = unlimited)
 max_download_mbps: 100 # Download speed limit
 port: 6881 # BitTorrent port
```

### Advanced Settings

```yaml
rewards:
 auto_claim: true # Automatically claim rewards
 claim_threshold_lyth: 50 # Minimum LYTH before claiming

content:
 mode: "auto" # auto | manual | all
 whitelist: [] # Specific games to seed (manual mode)
 blacklist: [] # Games to never seed

monitoring:
 dashboard_port: 8080 # Web dashboard port
 enable_metrics: true # Prometheus metrics
 metrics_port: 9090
```

## Verifying Your Setup

### Check Node Status

**Docker:**

```bash
docker logs grid-node --tail 100
```

**Raspberry Pi:**

```bash
sudo journalctl -u grid-node -n 100 -f
```

### Verify Wallet Connection

```bash
# Docker
docker exec grid-node grid-cli status

# Raspberry Pi
sudo grid-cli status
```

Expected output:

```
Node ID: grid-a1b2c3d4e5f6
Wallet: 0xYour... (connected)
Status: Online
Uptime: 2h 34m
Seeding: 5 games (24.6 GB)
Bandwidth (24h): ↑ 142 GB ↓ 8 GB
Pending Rewards: 12.4 LYTH
```

### Test Dashboard Access

**Docker:**
Open `http://localhost:8080`

**Raspberry Pi:**
Open `http://raspberrypi.local:8080`

You should see the GRID node dashboard with real-time statistics.

## Firewall Configuration

Ensure port 6881 is accessible from the internet:

**Linux (ufw):**

```bash
sudo ufw allow 6881/tcp
sudo ufw allow 6881/udp
```

**Router:**

Forward port 6881 TCP+UDP to your node's local IP address.

Check port status: [yougetsignal.com/tools/open-ports/](https://www.yougetsignal.com/tools/open-ports/)

## Common Issues

### "Wallet connection failed"

**Solution:**

- Verify wallet address is valid Monolythium address
- Ensure you have small amount of LYTH for gas fees
- Check network connectivity

### "Port 6881 already in use"

**Solution:**

- Stop other torrent clients
- Or change GRID port in config.yaml:

```yaml
network:
 port: 6882
```

Don't forget to update firewall and router port forwarding.

### "Storage path not writable"

**Docker Solution:**

```bash
sudo chown -R 1000:1000 ~/grid-node/data
```

**Raspberry Pi Solution:**

```bash
sudo chown -R grid:grid /var/lib/grid
```

### "No games seeding"

**Possible causes:**

- Network still downloading content manifest (wait 5-10 minutes)
- Storage limit too low (increase max_size_gb)
- Network connectivity issues (check firewall)

## Monitoring Your Node

### Dashboard Metrics

The web dashboard shows:

- Real-time bandwidth usage
- Games currently seeding
- Pending and claimed rewards
- Node uptime and health
- Connected peers

### Command-Line Monitoring

**Check earnings:**

```bash
# Docker
docker exec grid-node grid-cli rewards

# Raspberry Pi
sudo grid-cli rewards
```

**Check seeding status:**

```bash
# Docker
docker exec grid-node grid-cli games

# Raspberry Pi
sudo grid-cli games
```

## Next Steps

Node running successfully? Optimize your setup:

- **Increase storage** for more earning potential
- **Monitor dashboard** to understand performance
- **Review rewards** system to maximize earnings
- **Join Discord** to connect with other operators

**Recommended Reading:**

- [System Requirements](./requirements.md) - Hardware optimization
- [Rewards](./rewards.md) - Understanding earnings
- [Dashboard](./dashboard.md) - Using the monitoring interface
- [FAQ](./faq.md) - Common questions

## Support

Need help?

- **Quick Troubleshooting**: [FAQ](./faq.md)
- **Discord**: #grid-support channel
- **Email**: grid-support@monoplay.xyz
- **Forum**: [forum.monoplay.xyz/grid](https://forum.monoplay.xyz/grid)

## Updating Your Node

GRID software updates automatically by default.

**Manual update (Docker):**

```bash
docker pull monoplay/grid:latest
docker stop grid-node
docker rm grid-node
# Re-run docker run command from step 4
```

**Manual update (Raspberry Pi):**

```bash
sudo grid-update
```

Updates are announced in Discord #grid-announcements channel.
