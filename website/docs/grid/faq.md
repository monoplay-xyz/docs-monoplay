---
sidebar_position: 8
---

# GRID FAQ

Frequently asked questions about running a GRID seeder node.

## General Questions

### What is GRID?

GRID (Good Reasonable Infrastructure Device) is MonoPlay's decentralized content delivery network. Run a GRID node to distribute encrypted game data through a relay-based CDN and earn LYTH rewards. Your node stores encrypted game chunks and pushes them to edge relays, where players download them. Seeders never have access to playable game files.

### Is GRID legal?

Yes. GRID only distributes licensed, security-scanned games from verified publishers. All content is encrypted — seeders store only encrypted chunks and cannot access, play, or extract game files. It is not a generic file-sharing network and does not host pirated content.

### Can seeders pirate the games they store?

No. All game content distributed through GRID is encrypted before it reaches seeder nodes. Seeders only store encrypted chunks that are useless without a decryption key. Only players who have purchased a valid license receive decryption keys from the MonoPlay platform. Seeders have no way to reconstruct or play the games they help distribute.

### Who can run a GRID node?

Anyone with compatible hardware and internet connection. Registration is done via email through the local dashboard setup wizard. A Monolythium wallet address is only needed as a payout address for rewards (configured separately in the web portal).

### Do I need to be a gamer to run a node?

No. GRID is infrastructure - you're helping distribute games, not playing them.

## Earnings and Rewards

### How much can I earn?

Earnings vary widely based on hardware, bandwidth, location, and network usage. Conservative estimates:

- **Raspberry Pi 5 (500 GB)**: 100-200 LYTH/month
- **Home server (1 TB)**: 200-400 LYTH/month
- **VPS (1 Gbps)**: 400-1600 LYTH/month

See [Rewards](./rewards.md) for detailed breakdown.

### When do I get paid?

Rewards distributed weekly (every Monday). Enable auto-claim for automatic payouts or claim manually via dashboard.

### What affects my earnings?

Five main factors:

1. **Bandwidth**: How much data you upload to relays
2. **Uptime**: Percentage of time online
3. **Storage**: More games = more earning opportunities
4. **Location**: Underserved regions earn bonuses
5. **Quality**: Fast, reliable nodes prioritized

### Can I lose money running a node?

Yes, if LYTH price drops or your costs (VPS, electricity) exceed earnings. Calculate ROI before investing in expensive hardware.

### Are earnings guaranteed?

No. Earnings depend on network usage, competition, and reward pool funding. Past performance doesn't guarantee future results.

### Do I pay taxes on rewards?

Likely yes, depending on your jurisdiction. Consult a tax professional. Many countries treat cryptocurrency rewards as taxable income.

## Hardware and Setup

### What hardware do I need?

**Minimum**:
- 2 CPU cores
- 2 GB RAM
- 50 GB storage
- 50 Mbps upload

**Recommended**:
- 4 CPU cores
- 4 GB RAM
- 500 GB storage
- 100+ Mbps upload

See [Requirements](./requirements.md) for details.

### Can I use a Raspberry Pi 4?

Technically yes, but Pi 5 is strongly recommended. Pi 4 has slower CPU and no native NVMe support. If using Pi 4, expect 30-50% lower earnings.

### What about Raspberry Pi 3 or older?

Not recommended. Insufficient CPU power and RAM for efficient operation.

### Do I need a dedicated machine?

No, but recommended for best uptime. You can run GRID on existing servers or alongside other services.

### Can I run GRID on a NAS?

Yes, if your NAS supports Docker. Synology, QNAP, and Unraid work well.

### What about Windows or Mac?

Supported via Docker, but Linux has better performance. Windows/Mac suitable for testing but not optimal for production.

## Network and Internet

### How much bandwidth do I need?

**Upload (most important)**: 100+ Mbps recommended

**Download**: 25+ Mbps sufficient after initial sync

Upload speed directly impacts earnings.

### Will GRID use all my bandwidth?

No. Set limits in config:

```yaml
network:
 max_upload_mbps: 80 # Leave 20 Mbps for other devices
```

Or use router QoS to prioritize other traffic.

### Does GRID work behind CGNAT?

Yes, fully. Since GRID only uses outbound connections to the coordinator and edge relays, CGNAT is not an issue. No inbound connections are required.

### Do I need to forward ports?

No. GRID nodes only make outbound connections to the coordinator and edge relays. No inbound ports, no port forwarding, and no firewall configuration needed. Your node initiates all connections over standard outbound TLS.

### My ISP has a data cap. Is GRID suitable?

Depends on your cap:

- **1 TB/month**: Suitable for minimum spec (~30 GB/day average)
- **Unlimited**: Ideal

Monitor usage in dashboard to avoid overages.

### Does my ISP allow this?

Most residential ISPs have no issue with GRID traffic. Since GRID uses standard outbound TLS connections (similar to HTTPS), it appears as normal encrypted web traffic to your ISP.

### Will GRID trigger copyright notices from my ISP?

No. GRID only distributes licensed content, not pirated material. All content is encrypted in transit and at rest, and your node does not make direct peer-to-peer connections with other users. Traffic flows through MonoPlay's relay infrastructure using standard encrypted TLS, which is indistinguishable from normal web traffic to your ISP.

## Storage

### How much storage do I need?

**Minimum**: 100 GB (3-5 games)
**Recommended**: 500 GB+ (10-20 games)
**Optimal**: 1-2 TB (30-100 games)

More storage = more earning potential.

### Can I use an external drive?

Yes. USB 3.0+ recommended. Configure path in config.yaml.

### HDD or SSD?

**HDD**: Cheaper, adequate performance
**SSD**: Faster, better for high-traffic nodes
**NVMe**: Best performance, recommended for VPS

All work fine; SSD improves quality score slightly.

### What happens when storage is full?

Auto-pruning deletes least popular games to make room for new content. No action needed.

### Can I manually choose which games to seed?

No. The coordinator assigns content to your node based on geographic demand, your available storage capacity, and network conditions. You can set storage and bandwidth limits, but game selection is automatic. This design prevents targeted downloading of specific titles and ensures optimal coverage across the network.

## Operation and Maintenance

### How do I update GRID software?

**Docker**: `docker pull monoplay/grid:latest && docker-compose up -d`

**Raspberry Pi**: `sudo grid-update`

Or enable automatic updates (default).

### How often should I check on my node?

Weekly check recommended. Enable notifications for critical issues. You can also monitor remotely through the grid.monoplay.xyz web portal.

### What if my node goes offline?

You stop earning during downtime. Uptime affects rewards:

- **100%**: Full rewards
- **95%**: -5% penalty
- **Below 80%**: -20% penalty

Use UPS to prevent power loss.

### Can I pause my node temporarily?

Yes, stop the service:

```bash
# Docker
docker stop grid-node

# Raspberry Pi
sudo systemctl stop grid-node
```

You won't earn while paused.

### How do I shut down my node permanently?

Stop service, delete data, and claim remaining rewards:

```bash
# Claim rewards first
grid-cli rewards claim

# Stop service
docker stop grid-node
docker rm grid-node

# Delete data
rm -rf ~/grid-node
```

### Can I migrate my node to new hardware?

Yes. Copy config directory, install GRID on new hardware, and start. Game data re-downloads automatically.

## Security and Privacy

### Is GRID software open source?

Dashboard and CLI are open source. Core seeding engine is source-available (view but not modify) to prevent reward gaming.

### Does GRID access my personal files?

No. GRID runs in sandboxed Docker container with access only to config and data directories you specify.

### Can my wallet be stolen?

Your payout wallet address is public (used for reward payments). GRID never asks for private keys or seed phrases. The wallet address is configured as a payout destination in the web portal and is not stored on the node itself.

### What data does GRID collect?

**Collected**:
- Bandwidth usage (aggregate)
- Uptime statistics
- Relay connection status
- Games seeded

**Not collected**:
- Personal information (beyond registration email)
- Browsing history
- Other files on your system

### Is my IP address public?

No. GRID uses a hub-and-spoke relay architecture. Your node connects outbound to the MonoPlay coordinator over encrypted TLS. Content is pushed to edge relays, and players download from those relays — not from your node directly. Your IP address is only known to the MonoPlay coordinator and is never exposed to players, other seeders, or the public.

### Can I run GRID over Tor or VPN?

Since your IP is already protected by the relay architecture and is never exposed to other users, a VPN is not needed for privacy. You can use one if you want, but it is unnecessary and may reduce performance due to added latency. Tor is not recommended as it is too slow for meaningful bandwidth contribution.

## Troubleshooting

### My node shows "Offline" status

**Check**:
1. Service is running: `docker ps` or `systemctl status grid-node`
2. Network connectivity: `ping monoplay.xyz`
3. Outbound TLS connections are not blocked by your firewall or ISP
4. DNS resolution is working

### I'm not earning any rewards

**Common causes**:
- Node offline or low uptime
- Insufficient storage (no games assigned)
- Payout wallet address not set in web portal
- Recently registered (allow 24 hours for first content assignment)

Check dashboard for warnings.

### Rewards lower than expected

Earnings depend on network usage (demand). Low weeks are normal. Compare your contribution score to previous weeks in dashboard.

### Games won't download

**Check**:
- Sufficient storage available
- Network connectivity
- Outbound connections not blocked

View logs: `docker logs grid-node -f`

### High CPU or RAM usage

Normal under heavy load. If persistent:

1. Check for software updates
2. Reduce max connections in config
3. Ensure adequate cooling (Raspberry Pi)
4. Restart node: `docker restart grid-node`

### Dashboard not accessible

**Check**:
- Port 8080 not blocked by local firewall
- Service is running
- Access correct IP/hostname

Test: `curl http://localhost:8080/health`

## Advanced Topics

### Can I run multiple nodes?

Yes. Use different email registrations and wallet addresses for each node. Distribute geographically for location bonuses.

### Can I customize the software?

Dashboard and CLI are open source and forkable. Core engine modifications not permitted (to prevent reward gaming).

### Does GRID support IPv6?

Yes, dual-stack IPv4 + IPv6 supported. IPv6 is optional.

### Can I integrate GRID with my monitoring system?

Yes. Prometheus metrics available at `http://localhost:9090/metrics`. Grafana dashboard available.

### Can I seed non-MonoPlay content?

No. GRID is exclusively for MonoPlay games. The coordinator only assigns verified, licensed content from the MonoPlay catalog.

## Support and Community

### Where do I get help?

- **Documentation**: [docs.monoplay.xyz/grid](https://docs.monoplay.xyz/grid)
- **Discord**: #grid-support channel
- **Forum**: [forum.monoplay.xyz/grid](https://forum.monoplay.xyz/grid)
- **Email**: grid-support@monoplay.xyz

### How do I report bugs?

**GitHub**: [github.com/monoplay/grid/issues](https://github.com/monoplay/grid/issues)

**Discord**: #grid-bugs channel

Include logs and system info.

### Is there a GRID operator community?

Yes! Join Discord #grid-operators for:

- Tips and optimization strategies
- Hardware recommendations
- Troubleshooting help
- Earnings discussions

### Can I contribute to GRID development?

Yes. Dashboard and CLI accept contributions. See [CONTRIBUTING.md](https://github.com/monoplay/grid/blob/main/CONTRIBUTING.md).

### Where do I suggest features?

**GitHub Discussions**: [github.com/monoplay/grid/discussions](https://github.com/monoplay/grid/discussions)

**Forum**: Feature Requests category

## Still Have Questions?

Ask in Discord #grid-support or email grid-support@monoplay.xyz.

## Next Steps

- [Getting Started](./getting-started.md) - Set up your first node
- [Requirements](./requirements.md) - Choose hardware
- [Rewards](./rewards.md) - Understand earnings
- [Dashboard](./dashboard.md) - Monitor your node
