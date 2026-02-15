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
- **Email**: For device registration and account management

A wallet address is not required at setup. You can configure your LYTH payout wallet later through the web portal at grid.monoplay.xyz.

## Installation Methods

Choose your preferred deployment:

### Option 1: Raspberry Pi 5 (Recommended for Beginners)

Best for home users wanting a simple, energy-efficient setup.

**Estimated time**: 45 minutes
**Skill level**: Beginner
**Cost**: $100-150 USD

[Full Raspberry Pi Guide -->](./raspberry-pi.md)

### Option 2: Docker (Recommended for Advanced Users)

Best for those with existing servers or technical experience.

**Estimated time**: 15 minutes
**Skill level**: Intermediate
**Cost**: Free (if using existing hardware)

[Full Docker Guide -->](./docker.md)

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

storage:
  path: "/data/games"
  max_size_gb: 500

network:
  max_upload_mbps: 100
  max_download_mbps: 100

rewards:
  auto_claim: true
  claim_threshold_lyth: 50
```

### 4. Start Node

```bash
docker run -d \
  --name grid-node \
  --restart unless-stopped \
  -v $(pwd)/config.yaml:/config/config.yaml \
  -v $(pwd)/data:/data \
  -p 8080:8080 \
  monoplay/grid:latest
```

No inbound ports are required. Port 8080 is only for the local setup wizard and dashboard.

### 5. Complete Setup Wizard

Visit `http://localhost:8080` in your browser to complete the setup wizard:

1. Enter your email address
2. Set a device name
3. Confirm your email (check inbox for verification link)
4. Device registers with the coordinator and begins seeding automatically

### 6. Check Status

```bash
docker logs grid-node
```

You should see:

```
[INFO] GRID Node starting...
[INFO] Storage: 500 GB available
[INFO] Connecting to MonoPlay coordinator...
[INFO] Connected! Node ID: grid-xxxxx
[INFO] Receiving content assignments...
[INFO] Seeding 3 games (12.4 GB)
[INFO] Node online and earning rewards!
```

### 7. Remote Management

After setup, manage your node remotely at [grid.monoplay.xyz](https://grid.monoplay.xyz). Log in with your email to:

- View node status and earnings
- Set your LYTH payout wallet address
- Adjust storage and bandwidth limits
- Claim rewards

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

### 4. Set Storage Limit

```bash
sudo grid-config set-storage 100GB
```

Adjust based on your microSD card size (leave 20% free space).

### 5. Start Node

```bash
sudo systemctl start grid-node
sudo systemctl enable grid-node
```

### 6. Complete Setup Wizard

The device broadcasts itself on your local network as `monoplay-grid.local`. Visit `http://monoplay-grid.local:8080` (or `http://raspberrypi.local:8080`) in your browser to complete setup:

1. Enter your email address
2. Set a device name
3. Confirm your email (check inbox for verification link)
4. Device registers with the coordinator and begins seeding automatically

After setup, manage your node remotely at [grid.monoplay.xyz](https://grid.monoplay.xyz).

### 7. Check Status

```bash
sudo systemctl status grid-node
```

## Configuration Options

### Essential Settings

```yaml
node:
  name: "My GRID Node"       # Friendly name (shown in web portal)

storage:
  path: "/data/games"        # Where to store encrypted game content
  max_size_gb: 500           # Maximum storage allocation
  auto_prune: true           # Remove least-needed content when full

network:
  max_upload_mbps: 100       # Upload speed limit (0 = unlimited)
  max_download_mbps: 100     # Download speed limit
```

### Advanced Settings

```yaml
rewards:
  auto_claim: true           # Automatically claim rewards
  claim_threshold_lyth: 50   # Minimum LYTH before claiming

content:
  mode: "auto"               # Coordinator assigns content automatically

monitoring:
  dashboard_port: 8080       # Web dashboard / setup wizard port
  enable_metrics: true       # Prometheus metrics
  metrics_port: 9090
```

Content assignment is handled by the coordinator. The `auto` mode is the default and only supported mode -- the coordinator distributes encrypted game content based on geographic demand, your node's storage capacity, and network conditions.

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

### Check Connection

```bash
# Docker
docker exec grid-node grid-cli status

# Raspberry Pi
sudo grid-cli status
```

Expected output:

```
Node ID: grid-a1b2c3d4e5f6
Status: Online
Connected to coordinator: yes
Uptime: 2h 34m
Seeding: 5 games (24.6 GB)
Bandwidth (24h): 142 GB served
Pending Rewards: 12.4 LYTH
```

### Test Dashboard Access

**Docker:**
Open `http://localhost:8080`

**Raspberry Pi:**
Open `http://monoplay-grid.local:8080` or `http://raspberrypi.local:8080`

You should see the GRID node dashboard with real-time statistics.

## Common Issues

### "Email verification failed"

**Solution:**

- Check your spam/junk folder for the verification email
- Ensure you entered the correct email address
- Try resending verification from the setup wizard
- Check network connectivity

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

- Node still receiving content assignments from the coordinator (wait 5-10 minutes)
- Storage limit too low (increase max_size_gb)
- Network connectivity issues

### "Cannot connect to coordinator"

**Solution:**

- Verify internet connectivity
- Check that outbound HTTPS (port 443) is not blocked by your network
- Try restarting the node

## Monitoring Your Node

### Dashboard Metrics

The web dashboard shows:

- Real-time bandwidth usage
- Games currently seeding
- Pending and claimed rewards
- Node uptime and health
- Coordinator connection status

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
- **Set payout wallet** at grid.monoplay.xyz to receive LYTH rewards
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
