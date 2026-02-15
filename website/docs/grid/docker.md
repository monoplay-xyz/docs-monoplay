---
sidebar_position: 5
---

# Docker Setup

Run a GRID node using Docker on any Linux, macOS, or Windows system. This is the most flexible deployment option, ideal for existing servers or advanced users.

## Prerequisites

Before starting, ensure you have:

- Docker installed (version 20.10+)
- 100 GB+ free disk space
- 100+ Mbps internet connection
- Linux, macOS, or Windows with WSL2
- Basic Docker and command-line knowledge

## Quick Start

The fastest way to get a GRID node running:

### 1. Install Docker

**Linux (Ubuntu/Debian):**

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# Log out and back in for group changes
```

**macOS:**

Download [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)

**Windows:**

Download [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop) (requires WSL2)

### 2. Create Directory Structure

```bash
mkdir -p ~/grid-node/{config,data}
cd ~/grid-node
```

### 3. Create Configuration File

Create `config/config.yaml`:

```yaml
node:
 name: "My GRID Node"
 wallet_address: "0xYourWalletAddressHere"

storage:
 path: "/data/games"
 max_size_gb: 500
 auto_prune: true

network:
 max_upload_mbps: 100 # 0 = unlimited
 max_download_mbps: 100
 port: 6881

rewards:
 auto_claim: true
 claim_threshold_lyth: 50

monitoring:
 dashboard_port: 8080
 enable_metrics: true
 metrics_port: 9090
```

**Important**: Replace `0xYourWalletAddressHere` with your actual Monolythium wallet address.

### 4. Run GRID Container

```bash
docker run -d \
 --name grid-node \
 --restart unless-stopped \
 -v $(pwd)/config:/config \
 -v $(pwd)/data:/data \
 -p 6881:6881 \
 -p 6881:6881/udp \
 -p 8080:8080 \
 -p 9090:9090 \
 monoplay/grid:latest
```

### 5. Verify Operation

```bash
docker logs grid-node --tail 50
```

Expected output:

```
[INFO] MonoPlay GRID Node v1.2.0
[INFO] Loading configuration from /config/config.yaml
[INFO] Wallet: 0xYour... (connected)
[INFO] Storage: 500 GB allocated, 498 GB available
[INFO] Network: Max upload 100 Mbps, max download 100 Mbps
[INFO] Connecting to MonoPlay tracker...
[INFO] Connected! Node ID: grid-docker-a1b2c3
[INFO] Downloading content manifest...
[INFO] Manifest received: 156 games available
[INFO] Auto-selecting games for maximum earnings...
[INFO] Queued 8 games for download (42.3 GB)
[INFO] Starting seeding service...
[INFO] Dashboard available at http://localhost:8080
[INFO] Node online and earning rewards!
```

## Docker Compose (Recommended)

For easier management, use Docker Compose:

### 1. Create `docker-compose.yml`

```yaml
version: '3.8'

services:
 grid-node:
 image: monoplay/grid:latest
 container_name: grid-node
 restart: unless-stopped
 ports:
 - "6881:6881"
 - "6881:6881/udp"
 - "8080:8080"
 - "9090:9090"
 volumes:
 - ./config:/config
 - ./data:/data
 environment:
 - TZ=America/New_York # Set your timezone
 networks:
 - grid-network

networks:
 grid-network:
 driver: bridge
```

### 2. Start Service

```bash
docker-compose up -d
```

### 3. View Logs

```bash
docker-compose logs -f grid-node
```

### 4. Stop Service

```bash
docker-compose down
```

### 5. Update to Latest Version

```bash
docker-compose pull
docker-compose up -d
```

## Configuration Reference

### Node Settings

```yaml
node:
 name: "My GRID Node" # Display name (dashboard only)
 wallet_address: "0x..." # REQUIRED: Your Monolythium address
 region: "auto" # auto | na-east | eu-west | ap-southeast
```

### Storage Settings

```yaml
storage:
 path: "/data/games" # Container path (do not change)
 max_size_gb: 500 # Maximum storage allocation
 auto_prune: true # Delete least popular games when full
 prune_threshold_percent: 95 # Trigger pruning at 95% full
 min_free_gb: 10 # Always keep 10 GB free
```

### Network Settings

```yaml
network:
 max_upload_mbps: 100 # Upload speed limit (0 = unlimited)
 max_download_mbps: 100 # Download speed limit
 port: 6881 # BitTorrent port
 max_connections: 200 # Maximum concurrent peers
 max_upload_slots: 50 # Maximum upload slots
```

### Rewards Settings

```yaml
rewards:
 auto_claim: true # Automatically claim rewards
 claim_threshold_lyth: 50 # Minimum LYTH before auto-claiming
 claim_interval_hours: 168 # Claim weekly (168 hours)
```

### Content Settings

```yaml
content:
 mode: "auto" # auto | manual | all
 whitelist: [] # Games to always seed (manual mode)
 blacklist: [] # Games to never seed
 auto_select_count: 10 # Max games to auto-select
 prefer_new_releases: true # Prioritize new games
```

**Modes:**

- **auto**: Software selects games for maximum earnings
- **manual**: Only seed games in whitelist
- **all**: Seed entire catalog (requires 2+ TB storage)

### Monitoring Settings

```yaml
monitoring:
 dashboard_port: 8080 # Web dashboard port
 enable_metrics: true # Prometheus metrics
 metrics_port: 9090 # Prometheus metrics port
 log_level: "info" # debug | info | warn | error
```

## Advanced Configuration

### Using External Storage

Mount additional volumes for large storage:

```yaml
services:
 grid-node:
 # ...
 volumes:
 - ./config:/config
 - /mnt/large-drive/grid-data:/data # External drive
```

### Resource Limits

Limit CPU and RAM usage:

```yaml
services:
 grid-node:
 # ...
 deploy:
 resources:
 limits:
 cpus: '2.0'
 memory: 4G
 reservations:
 cpus: '1.0'
 memory: 2G
```

### Custom Network Bridge

Use custom Docker network:

```yaml
networks:
 grid-network:
 driver: bridge
 ipam:
 config:
 - subnet: 172.20.0.0/16
```

### Environment Variables

Override config via environment variables:

```yaml
services:
 grid-node:
 # ...
 environment:
 - GRID_WALLET=0xYourWalletAddress
 - GRID_STORAGE_MAX_GB=500
 - GRID_UPLOAD_LIMIT_MBPS=100
 - GRID_LOG_LEVEL=info
```

**Priority**: Environment variables override config.yaml values.

## Management Commands

### Start/Stop Node

```bash
# Docker run
docker start grid-node
docker stop grid-node
docker restart grid-node

# Docker Compose
docker-compose start
docker-compose stop
docker-compose restart
```

### View Logs

```bash
# Last 100 lines
docker logs grid-node --tail 100

# Follow logs (real-time)
docker logs grid-node -f

# Since specific time
docker logs grid-node --since 1h
```

### Execute Commands in Container

```bash
# Check node status
docker exec grid-node grid-cli status

# View rewards
docker exec grid-node grid-cli rewards

# List seeding games
docker exec grid-node grid-cli games

# Interactive shell
docker exec -it grid-node /bin/bash
```

### Update Node

```bash
# Pull latest image
docker pull monoplay/grid:latest

# Recreate container
docker stop grid-node
docker rm grid-node
# Re-run docker run command with latest image

# Or with Docker Compose
docker-compose pull
docker-compose up -d
```

## Monitoring and Metrics

### Web Dashboard

Access at `http://localhost:8080`

Features:

- Real-time bandwidth graphs
- Seeding status and peer counts
- Earnings tracker
- System health metrics
- Configuration editor

### Prometheus Metrics

Metrics available at `http://localhost:9090/metrics`

**Key metrics:**

- `grid_bandwidth_upload_bytes_total`
- `grid_bandwidth_download_bytes_total`
- `grid_games_seeding_count`
- `grid_peers_connected`
- `grid_rewards_pending_lyth`
- `grid_storage_used_bytes`

**Grafana dashboard**: Import dashboard ID 12345 from [grafana.com](https://grafana.com/grafana/dashboards)

### Health Check

```bash
curl http://localhost:8080/health
```

Response:

```json
{
 "status": "healthy",
 "node_id": "grid-docker-a1b2c3",
 "uptime_seconds": 86400,
 "seeding_games": 8,
 "connected_peers": 42,
 "wallet_connected": true
}
```

## Firewall Configuration

Ensure port 6881 is accessible from the internet.

**Linux (UFW):**

```bash
sudo ufw allow 6881/tcp
sudo ufw allow 6881/udp
```

**Linux (iptables):**

```bash
sudo iptables -A INPUT -p tcp --dport 6881 -j ACCEPT
sudo iptables -A INPUT -p udp --dport 6881 -j ACCEPT
sudo iptables-save | sudo tee /etc/iptables/rules.v4
```

**macOS:**

System Preferences > Security & Privacy > Firewall > Firewall Options > Add Docker

**Windows (WSL2):**

Windows Firewall > Advanced Settings > Inbound Rules > New Rule > Port 6881

**Cloud VPS:**

Configure security groups/firewall rules in provider dashboard to allow port 6881.

## Troubleshooting

### Container Won't Start

```bash
# Check logs for errors
docker logs grid-node

# Common issues:
# - Port 6881 already in use
# - Invalid wallet address
# - Config file syntax errors
```

### Port Already in Use

```bash
# Find process using port
sudo lsof -i :6881

# Kill process or change GRID port in config.yaml
```

### Permission Denied Errors

```bash
# Fix data directory permissions
sudo chown -R 1000:1000 ~/grid-node/data

# Or run container as root (not recommended)
docker run --user root ...
```

### High Memory Usage

```bash
# Set memory limit
docker update --memory 4g --memory-swap 4g grid-node

# Or in docker-compose.yml (see Advanced Configuration)
```

### Network Issues

```bash
# Test connectivity
docker exec grid-node ping -c 3 monoplay.xyz

# Check DNS resolution
docker exec grid-node nslookup tracker.monoplay.xyz

# Verify port accessibility
curl -s https://portchecker.co/check?port=6881
```

### Low Earnings

1. Verify port 6881 is accessible externally
2. Check upload bandwidth isn't capped too low
3. Increase storage allocation
4. Ensure 24/7 uptime
5. Review logs for errors

## Platform-Specific Notes

### Linux

Best performance, lowest resource usage. No special considerations.

### macOS

**Limitations:**

- Docker Desktop has 10 GB RAM limit (configurable in settings)
- File system performance slower than Linux
- Mac sleep mode stops containers

**Recommendations:**

- Increase Docker Desktop resources in Preferences
- Disable sleep mode (Energy Saver settings)
- Consider Linux VM for better performance

### Windows (WSL2)

**Limitations:**

- Slight performance overhead vs. native Linux
- Requires WSL2 enabled
- File system performance varies

**Setup:**

1. Enable WSL2: `wsl --install`
2. Install Docker Desktop for Windows
3. Ensure "Use WSL2 based engine" enabled
4. Run GRID in WSL2 Ubuntu terminal

**Recommendations:**

- Store data in WSL2 filesystem (not `/mnt/c/...`)
- Allocate sufficient resources in `.wslconfig`

## Security Best Practices

### Container Security

```yaml
services:
 grid-node:
 # ...
 security_opt:
 - no-new-privileges:true
 cap_drop:
 - ALL
 cap_add:
 - NET_BIND_SERVICE
 read_only: false # GRID needs write access to /data
```

### Network Isolation

```yaml
networks:
 grid-network:
 driver: bridge
 internal: false # Must be false (node needs internet)
```

### Secrets Management

Use Docker secrets for sensitive data:

```bash
echo "0xYourWalletAddress" | docker secret create grid_wallet -

# Reference in compose:
secrets:
 - grid_wallet
```

## Backup and Recovery

### Backup Configuration

```bash
# Backup config
cp config/config.yaml config/config.yaml.backup

# Backup entire directory
tar -czf grid-backup-$(date +%Y%m%d).tar.gz ~/grid-node/config
```

### Restore Configuration

```bash
# Restore from backup
tar -xzf grid-backup-20260214.tar.gz -C ~/

# Recreate container
docker-compose up -d
```

### Migrate to New Server

```bash
# On old server
docker-compose down
tar -czf grid-migration.tar.gz ~/grid-node

# Transfer grid-migration.tar.gz to new server

# On new server
tar -xzf grid-migration.tar.gz -C ~/
cd ~/grid-node
docker-compose up -d
```

**Note**: Data in `/data` directory is re-downloaded automatically, no need to migrate.

## Multiple Nodes

Run multiple GRID nodes on one host:

```bash
# Create separate directories
mkdir -p ~/grid-node-1 ~/grid-node-2

# Use different configs (different wallets)
# Use different ports (6881, 6882, etc.)
```

**Docker Compose for multiple nodes:**

```yaml
services:
 grid-node-1:
 container_name: grid-node-1
 ports:
 - "6881:6881"
 - "8081:8080"
 # ...

 grid-node-2:
 container_name: grid-node-2
 ports:
 - "6882:6881"
 - "8082:8080"
 # ...
```

## Next Steps

Node running successfully?

- [Rewards](./rewards.md) - Understand earnings
- [Dashboard](./dashboard.md) - Monitor your node
- [FAQ](./faq.md) - Common questions

Need help? Join Discord #grid-docker channel.
