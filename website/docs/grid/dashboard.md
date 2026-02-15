---
sidebar_position: 7
---

# Node Dashboard

The GRID node dashboard provides real-time monitoring and management for your seeder node. Access via web browser to view statistics, configure settings, and track earnings. On first launch, the dashboard also serves as the setup wizard for device registration.

## Accessing the Dashboard

### Local Access

**Default URL**: `http://localhost:8080`

Or use your node's hostname/IP:

- `http://grid-node.local:8080` (Raspberry Pi)
- `http://192.168.1.XXX:8080` (by IP address)

### First-Time Setup

When you visit the dashboard for the first time, you will see the registration wizard instead of the monitoring interface. The setup flow is:

1. **Enter your email address** - Used for your GRID operator account
2. **Name your device** - Choose a friendly name (e.g., "Living Room Pi")
3. **Confirm your email** - Click the verification link sent to your inbox
4. **Configure storage and bandwidth limits** - Set resource allocation

Once registration is complete, the dashboard switches to the monitoring view described below.

### Remote Access

After completing email registration, you can manage your node remotely through the **grid.monoplay.xyz** web portal. Log in with the same email you used during setup to view status, adjust settings, and track rewards from any browser — no need to expose your local dashboard to the internet.

**For local network access**, you can still reach the dashboard at `http://localhost:8080` or via your node's IP on your home network. Since the web portal handles remote management, there is no need to set up VPNs, SSH tunnels, or reverse proxies for remote access.

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
- **Account**: Registered email address
- **Payout Wallet**: Your Monolythium address for reward payouts (configured in web portal)
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
- Relay: Connected edge relay name and status

### Quick Stats

**Last 24 Hours:**

- Total uploaded (GB)
- Total downloaded (GB)
- Average upload speed
- Peak upload speed
- Bandwidth efficiency (%)

## Bandwidth Tab

### Real-Time Graph

Live bandwidth visualization:

- **Upload** (green line): Data pushed to edge relays
- **Download** (blue line): Data received from coordinator
- **Time range**: 1 hour, 6 hours, 24 hours, 7 days

**Interaction:**

- Hover for exact values
- Click legend to toggle upload/download
- Zoom by selecting time range

### Historical Statistics

**Daily Breakdown**: Last 7 days table

| Date | Uploaded | Downloaded | Uptime |
|------|----------|------------|--------|
| Feb 14 | 142 GB | 8 GB | 100% |
| Feb 13 | 156 GB | 12 GB | 98% |
| ... | ... | ... | ... |

**Monthly Totals**: Last 12 months summary

**All-Time Statistics:**

- Total uploaded (lifetime)
- Total downloaded (lifetime)
- Average daily upload
- Peak daily upload

### Bandwidth Efficiency

**Efficiency Score**: Upload / Download ratio

- **High (10:1+)**: Excellent, mostly seeding
- **Medium (3:1 - 10:1)**: Good, balanced operation
- **Low (under 3:1)**: Still downloading content

Higher efficiency indicates mature node maximizing earnings.

## Content Tab

### Seeding Games

Table of currently seeded games:

| Game Title | Size | Relay Uploads | Total Uploaded | Priority |
|------------|------|---------------|----------------|----------|
| MonoLands v2 | 4.2 GB | 12 | 142 GB | High |
| Pixel Quest | 1.8 GB | 8 | 67 GB | Medium |
| ... | ... | ... | ... | ... |

**Columns:**

- **Game Title**: Name with version
- **Size**: Total game size
- **Relay Uploads**: Number of times data has been pushed to edge relays for this game
- **Total Uploaded**: Total data uploaded for this game (all-time)
- **Priority**: Coordinator-assigned priority based on demand (High/Medium/Low)

**Actions:**

- **Pause**: Temporarily stop seeding (resume manually)
- **Remove**: Stop seeding and delete from disk

### Download Queue

Games being downloaded (assigned by coordinator):

| Game Title | Size | Progress | Speed | ETA |
|------------|------|----------|-------|-----|
| Space Raiders | 6.4 GB | 34% | 12 MB/s | 6m 23s |
| ... | ... | ... | ... | ... |

The coordinator assigns new content to your node based on geographic demand, your available storage, and network conditions.

### Content Library

Catalog of games assigned to your node:

- Browse assigned games
- Filter by genre, size, priority
- View game details

## Rewards Tab

### Current Epoch

**Epoch period**: Feb 10 - Feb 16 (Mon-Sun)
**Progress**: 4 days 12 hours remaining

**Your Contribution:**

- Bandwidth: 124.3 GB uploaded
- Uptime: 98.2%
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
- **Payout Wallet**: Your Monolythium address for reward payouts (set in web portal at grid.monoplay.xyz)
- **Region**: Auto-detected or manual override

**Storage Settings:**

- **Max Storage**: Maximum disk space allocation
- **Auto-Prune**: Delete least popular games when full
- **Prune Threshold**: Trigger pruning at X% full
- **Min Free Space**: Always keep X GB free

**Network Settings:**

- **Max Upload**: Speed limit (Mbps, 0 = unlimited)
- **Max Download**: Speed limit (Mbps)
- **Max Connections**: Concurrent relay connections limit

**Reward Settings:**

- **Auto-Claim**: Enable/disable automatic claiming
- **Claim Threshold**: Minimum LYTH before claiming
- **Claim Interval**: Hours between auto-claims

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

### System Actions

**Restart Node**: Restart GRID service (maintains config)

**Reset Configuration**: Restore default config (warning: loses custom settings)

**Update Software**: Check for and install updates

**Export Data**: Download all statistics and logs

## Notifications

Configure alerts for important events:

**Notification Types:**

- **Critical**: Node offline, relay disconnected
- **Warning**: Low storage, high resource usage
- **Info**: Rewards claimable, updates available

**Delivery Methods:**

- **Browser**: Web notifications (requires permission)
- **Email**: Send to registered address
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

### "Account not connected"

**Verify email registration** was completed

**Check Monolythium RPC** is accessible

**Ensure payout wallet** is configured in web portal

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
