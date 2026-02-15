---
sidebar_position: 8
---

# GRID FAQ

Frequently asked questions about running a GRID seeder node.

## General Questions

### What is GRID?

GRID (Good Reasonable Infrastructure Device) is MonoPlay's decentralized content delivery network. Run a GRID node to distribute games via BitTorrent and earn LYTH rewards.

### Is GRID legal?

Yes. GRID only distributes licensed, security-scanned games from verified publishers. It's not a generic torrent network and doesn't host pirated content.

### Who can run a GRID node?

Anyone with compatible hardware and internet connection. No KYC required, just a Monolythium wallet address.

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

1. **Bandwidth**: How much data you upload to players
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
  max_upload_mbps: 80  # Leave 20 Mbps for other devices
```

Or use router QoS to prioritize other traffic.

### Does GRID work behind CGNAT?

Partially. You can download but won't accept incoming connections, significantly reducing earnings. Consider VPS deployment instead.

### Do I need to forward ports?

Yes, port 6881 (TCP+UDP) must be forwarded to your node for optimal earnings. Nodes without port forwarding earn 50-70% less.

### My ISP has a data cap. Is GRID suitable?

Depends on your cap:

- **1 TB/month**: Suitable for minimum spec (~30 GB/day average)
- **Unlimited**: Ideal

Monitor usage in dashboard to avoid overages.

### Does my ISP allow this?

Most residential ISPs allow BitTorrent. Check your terms of service. Some business plans explicitly permit server hosting.

### Will GRID trigger copyright notices from my ISP?

No. GRID only distributes licensed content, not pirated material. However, ISPs may flag BitTorrent traffic generically. Use encrypted connections (enabled by default).

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

Yes, switch to manual mode:

```yaml
content:
  mode: "manual"
  whitelist:
    - "monolands-v2"
    - "pixel-quest"
```

But auto-mode generally earns more by selecting popular games dynamically.

## Operation and Maintenance

### How do I update GRID software?

**Docker**: `docker pull monoplay/grid:latest && docker-compose up -d`

**Raspberry Pi**: `sudo grid-update`

Or enable automatic updates (default).

### How often should I check on my node?

Weekly check recommended. Enable notifications for critical issues.

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

Your wallet address is public (used for reward payments). GRID never asks for private keys or seed phrases.

### What data does GRID collect?

**Collected**:
- Bandwidth usage (aggregate)
- Uptime statistics
- Connected peers (count only)
- Games seeded

**Not collected**:
- Personal information
- Browsing history
- Other files on your system

### Is my IP address public?

Your IP is visible to peers you connect to (standard for BitTorrent). Not published on-chain.

### Can I run GRID over Tor or VPN?

Technically yes, but not recommended. Tor is too slow; VPN may misreport location and reduce earnings.

## Troubleshooting

### My node shows "Offline" status

**Check**:
1. Service is running: `docker ps` or `systemctl status grid-node`
2. Network connectivity: `ping monoplay.xyz`
3. Port 6881 is forwarded and accessible
4. Firewall allows traffic

### I'm not earning any rewards

**Common causes**:
- Port 6881 not accessible (test with portchecker.co)
- Node offline/low uptime
- Insufficient storage (no games seeded)
- Wallet address not set or invalid

Check dashboard for warnings.

### Rewards lower than expected

Earnings depend on network usage (demand). Low weeks are normal. Compare your contribution score to previous weeks in dashboard.

### Games won't download

**Check**:
- Sufficient storage available
- Network connectivity
- No firewall blocking downloads

View logs: `docker logs grid-node -f`

### High CPU or RAM usage

Normal under heavy load. If persistent:

1. Check for software updates
2. Reduce max connections in config
3. Ensure adequate cooling (Raspberry Pi)
4. Restart node: `docker restart grid-node`

### Dashboard not accessible

**Check**:
- Port 8080 not blocked by firewall
- Service is running
- Access correct IP/hostname

Test: `curl http://localhost:8080/health`

## Advanced Topics

### Can I run multiple nodes?

Yes. Use different wallet addresses for each node. Distribute geographically for location bonuses.

### Can I customize the software?

Dashboard and CLI are open source and forkable. Core engine modifications not permitted (to prevent reward gaming).

### Does GRID support IPv6?

Yes, dual-stack IPv4 + IPv6 supported. IPv6 is optional (most peers use IPv4).

### Can I integrate GRID with my monitoring system?

Yes. Prometheus metrics available at `http://localhost:9090/metrics`. Grafana dashboard available.

### What about UPnP?

Enabled by default for automatic port forwarding. Disable if you manually forward ports:

```yaml
network:
  upnp_enabled: false
```

### Can I seed non-MonoPlay content?

No. GRID is exclusively for MonoPlay games. Use other torrent software for external content.

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
