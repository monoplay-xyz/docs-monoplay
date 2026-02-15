---
sidebar_position: 7
---

# Node Dashboard

The GRID node dashboard provides real-time monitoring and management for your seeder node. Access via web browser to view statistics, configure settings, and track earnings.

## Accessing the Dashboard

### Local Access

**Default URL**: `http://localhost:8080`

Or use your node's hostname/IP:

- `http://grid-node.local:8080` (Raspberry Pi)
- `http://192.168.1.XXX:8080` (by IP address)
- `http://your-vps-domain.com:8080` (VPS)

### Remote Access (Optional)

**Warning**: Dashboard has no authentication by default. Enable auth before exposing publicly.

**Enable authentication:**

```bash
# Raspberry Pi
sudo grid-config set-dashboard-auth

# Docker
docker exec -it grid-node grid-cli config set-dashboard-auth
```

Enter username and password when prompted.

**Secure remote access options:**

1. **VPN**: Access via WireGuard/OpenVPN
2. **SSH tunnel**: `ssh -L 8080:localhost:8080 user@node`
3. **Reverse proxy**: Nginx/Caddy with HTTPS + auth
4. **Tailscale**: Zero-config VPN mesh network

## Dashboard Overview

The dashboard has five main sections:

1. **Overview** - Real-time node status
2. **Bandwidth** - Network usage statistics
3. **Content** - Games being seeded
4. **Rewards** - Earnings tracking
5. **Settings** - Configuration management

## Overview Tab

### Node Status Card

Displays:

- **Node ID**: Unique identifier (grid-xxxxx)
- **Status**: Online, Offline, or Syncing
- **Wallet**: Connected address (truncated)
- **Uptime**: Current session and all-time
- **Version**: GRID software version

**Status indicators:**

- **Online**: Fully operational, earning rewards
- **Syncing**: Downloading content, partially operational
- **Offline**: Not connected to network
- **Warning**: Issues detected (hover for details)

### System Resources Card

Real-time system metrics:

**CPU Usage**: Current and average load
- Normal: Under 30%
- High: 30-70%
- Critical: Over 70% (may indicate issue)

**Memory Usage**: RAM consumption
- Typical: 1-3 GB
- High: Over 4 GB

**Storage**: Disk space utilization
- Total allocated: From config `max_size_gb`
- Used: Current game data
- Available: Remaining space
- Percentage: Visual progress bar

**Network**: Current bandwidth usage
- Upload: Real-time upload speed (Mbps)
- Download: Real-time download speed (Mbps)
- Peers: Currently connected peers

### Quick Stats

**Last 24 Hours:**

- Total uploaded (GB)
- Total downloaded (GB)
- Average upload speed
- Peak upload speed
- Connected peers (max)
- Bandwidth efficiency (%)

## Bandwidth Tab

### Real-Time Graph

Live bandwidth visualization:

- **Upload** (green line): Data sent to players
- **Download** (blue line): Data received from network
- **Time range**: 1 hour, 6 hours, 24 hours, 7 days

**Interaction:**

- Hover for exact values
- Click legend to toggle upload/download
- Zoom by selecting time range

### Historical Statistics

**Daily Breakdown**: Last 7 days table

| Date | Uploaded | Downloaded | Peers | Uptime |
|------|----------|------------|-------|--------|
| Feb 14 | 142 GB | 8 GB | 47 | 100% |
| Feb 13 | 156 GB | 12 GB | 52 | 98% |
| ... | ... | ... | ... | ... |

**Monthly Totals**: Last 12 months summary

**All-Time Statistics:**

- Total uploaded (lifetime)
- Total downloaded (lifetime)
- Average daily upload
- Peak daily upload
- Total peers served

### Bandwidth Efficiency

**Efficiency Score**: Upload ÷ Download ratio

- **High (10:1+)**: Excellent, mostly seeding
- **Medium (3:1 - 10:1)**: Good, balanced operation
- **Low (under 3:1)**: Still downloading content

Higher efficiency indicates mature node maximizing earnings.

## Content Tab

### Seeding Games

Table of currently seeded games:

| Game Title | Size | Seeders | Peers | Uploaded | Priority |
|------------|------|---------|-------|----------|----------|
| MonoLands v2 | 4.2 GB | 23 | 8 | 142 GB | High |
| Pixel Quest | 1.8 GB | 45 | 3 | 67 GB | Medium |
| ... | ... | ... | ... | ... | ... |

**Columns:**

- **Game Title**: Name with version
- **Size**: Total game size
- **Seeders**: Other nodes seeding this game
- **Peers**: Players currently downloading from you
- **Uploaded**: Total uploaded for this game (all-time)
- **Priority**: Popularity score (High/Medium/Low)

**Actions:**

- **Pause**: Temporarily stop seeding (resume manually)
- **Remove**: Stop seeding and delete from disk

### Download Queue

Games being downloaded:

| Game Title | Size | Progress | Speed | ETA |
|------------|------|----------|-------|-----|
| Space Raiders | 6.4 GB | 34% | 12 MB/s | 6m 23s |
| ... | ... | ... | ... | ... |

**Auto-selection** adds games to queue based on popularity and earnings potential.

### Content Library

Full catalog of available games:

- Browse all games
- Filter by genre, size, popularity
- Manually add to download queue (manual mode only)
- View game details

## Rewards Tab

### Current Epoch

**Epoch period**: Feb 10 - Feb 16 (Mon-Sun)
**Progress**: 4 days 12 hours remaining

**Your Contribution:**

- Bandwidth: 124.3 GB uploaded
- Uptime: 98.2%
- Average peers: 42
- Quality score: 96%

**Estimated Reward**: 18.7 LYTH

**Note**: Estimate updates every hour, may fluctuate based on network activity.

### Claimable Rewards

**Available to claim**: 142.6 LYTH (3 epochs)

**Breakdown:**

| Epoch | Period | Reward | Status |
|-------|--------|--------|--------|
| 2026-W06 | Feb 03-09 | 87.4 LYTH | Claimable |
| 2026-W05 | Jan 27-Feb 02 | 34.8 LYTH | Claimable |
| 2026-W04 | Jan 20-26 | 20.4 LYTH | Claimable |

**Actions:**

- **Claim All**: Claim all claimable rewards (one transaction)
- **Claim Epoch**: Claim specific epoch (separate transaction)

**Auto-Claim Status**: Enabled (next claim: Feb 17)

### Claimed Rewards History

**All-time claimed**: 1,247.9 LYTH

**Recent claims:**

| Date | Amount | Epochs | Transaction |
|------|--------|--------|-------------|
| Feb 10 | 87.4 LYTH | 1 | 0xabc123... |
| Feb 03 | 102.6 LYTH | 2 | 0xdef456... |
| ... | ... | ... | ... |

Click transaction hash to view on Monoscan.

### Earnings Chart

Visual earnings over time:

- Line graph: Weekly rewards (LYTH)
- Bar graph: Monthly totals
- Toggle LYTH vs USD value

**Export options:**

- CSV (for accounting)
- PDF (for records)
- API endpoint (for automation)

## Settings Tab

### Node Configuration

**Basic Settings:**

- **Node Name**: Friendly name for dashboard
- **Wallet Address**: Your Monolythium address (requires restart)
- **Region**: Auto-detected or manual override

**Storage Settings:**

- **Max Storage**: Maximum disk space allocation
- **Auto-Prune**: Delete least popular games when full
- **Prune Threshold**: Trigger pruning at X% full
- **Min Free Space**: Always keep X GB free

**Network Settings:**

- **Max Upload**: Speed limit (Mbps, 0 = unlimited)
- **Max Download**: Speed limit (Mbps)
- **Max Connections**: Concurrent peers limit
- **Port**: BitTorrent port (requires firewall update)

**Reward Settings:**

- **Auto-Claim**: Enable/disable automatic claiming
- **Claim Threshold**: Minimum LYTH before claiming
- **Claim Interval**: Hours between auto-claims

**Content Settings:**

- **Mode**: Auto, Manual, or All
- **Prefer New Releases**: Prioritize new games
- **Auto-Select Count**: Max games to auto-download

### Advanced Settings

**Logging:**

- Log level: Debug, Info, Warn, Error
- Log retention: Days to keep logs
- Export logs: Download for troubleshooting

**Monitoring:**

- Enable Prometheus metrics
- Metrics port
- Webhook notifications (Discord, Slack)

**Performance:**

- Bandwidth reporting interval
- Peer discovery method
- DHT participation
- UPnP port mapping

### System Actions

**Restart Node**: Restart GRID service (maintains config)

**Reset Configuration**: Restore default config (warning: loses custom settings)

**Update Software**: Check for and install updates

**Export Data**: Download all statistics and logs

## Notifications

Configure alerts for important events:

**Notification Types:**

- **Critical**: Node offline, wallet disconnected
- **Warning**: Low storage, high resource usage
- **Info**: Rewards claimable, updates available

**Delivery Methods:**

- **Browser**: Web notifications (requires permission)
- **Email**: Send to configured address
- **Webhook**: Discord, Slack, custom endpoint

**Example Webhook (Discord):**

```yaml
notifications:
 webhook_url: "https://discord.com/api/webhooks/..."
 events:
 - node_offline
 - rewards_claimable
 - storage_low
```

## Mobile Access

Dashboard is mobile-responsive:

- Works on smartphones and tablets
- Touch-friendly interface
- Optimized layouts for small screens

**Mobile features:**

- Quick stats on home screen
- Swipe navigation between tabs
- Push notifications (PWA)

**Install as PWA** (Progressive Web App):

1. Open dashboard in mobile browser
2. Tap "Add to Home Screen"
3. Access like native app

## API Access

Dashboard data available via REST API:

**Endpoint**: `http://localhost:8080/api`

**Authentication**: Bearer token (generate in Settings)

**Example requests:**

```bash
# Get node status
curl -H "Authorization: Bearer YOUR_TOKEN" \
 http://localhost:8080/api/status

# Get bandwidth stats
curl -H "Authorization: Bearer YOUR_TOKEN" \
 http://localhost:8080/api/bandwidth?period=7d

# Get rewards
curl -H "Authorization: Bearer YOUR_TOKEN" \
 http://localhost:8080/api/rewards
```

Full API documentation: [docs.monoplay.xyz/api/grid](https://docs.monoplay.xyz/api/grid)

## Troubleshooting

### Dashboard won't load

**Check service is running:**

```bash
# Docker
docker ps | grep grid-node

# Raspberry Pi
sudo systemctl status grid-node
```

**Check port is accessible:**

```bash
curl http://localhost:8080/health
```

**Check firewall:**

Ensure port 8080 isn't blocked locally.

### Graphs not updating

**Refresh browser** (Ctrl+F5)

**Check browser console** for JavaScript errors

**Clear cache** and reload

### Incorrect statistics

**Wait for sync**: New nodes take 10-15 minutes to populate stats

**Check system time**: Incorrect clock affects epoch calculations

**Restart service** to refresh metrics

### "Wallet not connected"

**Verify wallet address** in config

**Check Monolythium RPC** is accessible

**Ensure LYTH balance** for gas fees

## Performance Tips

### Reduce Dashboard Resource Usage

Dashboard uses ~50 MB RAM and minimal CPU.

**Disable real-time graphs** if not needed:

```yaml
monitoring:
 enable_realtime_graphs: false
```

**Reduce metric collection frequency:**

```yaml
monitoring:
 metric_interval_seconds: 60 # Default: 15
```

### Optimize for Low Bandwidth

**Disable high-frequency updates:**

```yaml
monitoring:
 dashboard_update_interval: 30 # Seconds, default: 5
```

**Disable charts:**

```yaml
monitoring:
 enable_charts: false
```

Access via CLI instead: `grid-cli status`

## Next Steps

Dashboard configured? Learn more:

- [Rewards](./rewards.md) - Maximize earnings
- [FAQ](./faq.md) - Common questions
- [Getting Started](./getting-started.md) - Setup guide

Need help? Join Discord #grid-dashboard channel.
