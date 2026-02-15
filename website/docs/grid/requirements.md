---
sidebar_position: 3
---

# System Requirements

GRID nodes can run on a wide range of hardware, from Raspberry Pi 5 to dedicated servers. This guide helps you choose appropriate hardware and understand performance expectations.

## Minimum Requirements

The absolute minimum to run a GRID node:

| Component | Specification |
|-----------|---------------|
| **CPU** | 2 cores, 1.5+ GHz (ARM or x86) |
| **RAM** | 2 GB |
| **Storage** | 50 GB free space |
| **Network** | 50 Mbps upload, 25 Mbps download |
| **Uptime** | 12+ hours/day recommended |
| **OS** | Linux (Ubuntu 22.04+), macOS 12+, Windows 10+ |

**Expected Earnings**: 10-30 LYTH/month

Minimum specs work but limit earning potential significantly.

## Recommended Requirements

For better earnings and reliability:

| Component | Specification |
|-----------|---------------|
| **CPU** | 4 cores, 2.0+ GHz |
| **RAM** | 4 GB |
| **Storage** | 500 GB free space (SSD preferred) |
| **Network** | 100+ Mbps upload, 100+ Mbps download |
| **Uptime** | 24/7 |
| **OS** | Linux (Ubuntu 22.04+) |

**Expected Earnings**: 100-300 LYTH/month

This tier provides good balance of cost and earnings.

## High-Performance Requirements

For operators wanting to maximize earnings:

| Component | Specification |
|-----------|---------------|
| **CPU** | 8+ cores, 3.0+ GHz |
| **RAM** | 8 GB+ |
| **Storage** | 2+ TB NVMe SSD |
| **Network** | 1+ Gbps upload/download |
| **Uptime** | 24/7 with redundancy |
| **OS** | Linux (Ubuntu 22.04+) |

**Expected Earnings**: 500-2000+ LYTH/month

Best suited for data center deployments or dedicated servers.

## Platform-Specific Details

### Raspberry Pi 5

**Specifications:**

- **CPU**: Quad-core Cortex-A76 @ 2.4 GHz
- **RAM**: 4 GB or 8 GB variants
- **Storage**: microSD or NVMe via HAT
- **Network**: Gigabit Ethernet
- **Power**: ~5W typical, ~10W peak

**Recommended Configuration:**

- Raspberry Pi 5 (8 GB RAM): $80 USD
- 128 GB microSD (A2 rated): $15 USD
- Official Power Supply: $12 USD
- Case with cooling: $15 USD
- **Total**: ~$125 USD

**Or with NVMe (Better Performance):**

- Raspberry Pi 5 (8 GB RAM): $80 USD
- M.2 HAT+: $12 USD
- 500 GB NVMe SSD: $40 USD
- Official Power Supply: $12 USD
- Case with cooling: $15 USD
- **Total**: ~$160 USD

**Expected Earnings**: 80-150 LYTH/month (highly dependent on network usage)

**Pros:**
- Low power consumption (~$2/month electricity)
- Silent operation
- Compact size
- Easy setup

**Cons:**
- Limited storage expansion
- ARM architecture (less software compatibility)
- SD card reliability concerns (NVMe recommended)

### VPS / Cloud Server

**Recommended Specs (Example: Hetzner CX21):**

- **CPU**: 2 vCPU
- **RAM**: 4 GB
- **Storage**: 40 GB SSD
- **Network**: 20 TB monthly traffic
- **Cost**: ~$6 USD/month

**Add block storage**: 500 GB volume (~$25 USD/month)

**Total Cost**: ~$31 USD/month
**Expected Earnings**: 150-400 LYTH/month (varies with network usage)

**Pros:**
- High uptime (99.9%+)
- Fast network speeds
- Easy scaling
- No home bandwidth usage

**Cons:**
- Monthly hosting costs
- Less profitable if LYTH price drops
- Subject to host terms of service

**Popular VPS Providers:**

- Hetzner (Germany, good EU coverage)
- DigitalOcean (Global, easy setup)
- Linode (Reliable, good support)
- Vultr (Global presence)

### Home Server / NAS

**Example Build:**

- **CPU**: Intel N100 or similar (4 cores)
- **RAM**: 16 GB DDR4
- **Storage**: 2x 2 TB HDD (RAID 1 for redundancy)
- **Network**: Gigabit Ethernet
- **Power**: ~15W typical
- **Cost**: $300-500 USD

**Expected Earnings**: 200-500 LYTH/month

**Pros:**
- Dual-purpose (GRID + personal NAS/server)
- One-time cost
- Full control
- Expandable storage

**Cons:**
- Higher initial investment
- Power costs (~$5-10/month)
- Requires technical knowledge
- Home internet limitations

## Storage Considerations

### Storage Capacity

**How much storage do you need?**

- **100 GB**: Seed 3-5 small indie games
- **500 GB**: Seed 10-20 games (recommended minimum)
- **1 TB**: Seed 30-50 games
- **2 TB+**: Seed majority of catalog, maximize earnings

**GRID automatically manages storage:**

- Downloads most popular games first
- Prunes least-seeded content when full
- Balances earnings vs. available space

### Storage Type

**HDD vs. SSD:**

| Feature | HDD | SSD (SATA) | SSD (NVMe) |
|---------|-----|------------|------------|
| **Speed** | 100-200 MB/s | 500-600 MB/s | 2000-7000 MB/s |
| **Cost/GB** | $0.015 | $0.08 | $0.10 |
| **Lifespan** | 5-10 years | 5-10 years | 5-10 years |
| **Power** | 6-10W | 2-4W | 2-5W |
| **Noise** | Audible | Silent | Silent |

**Recommendation:**

- **Raspberry Pi**: NVMe or high-quality microSD (A2 rated)
- **Home server**: HDD for bulk storage, SSD for OS and cache
- **VPS**: SSD block storage
- **High-performance**: NVMe SSD

### Storage Reliability

**Protect your data:**

- Use RAID 1 (mirroring) for redundancy
- Monitor SMART statistics
- Replace drives proactively (5 years or earlier)
- Ensure UPS power backup (prevent corruption)

**Note**: GRID automatically re-downloads missing files, but preventing data loss improves uptime.

## Network Requirements

GRID nodes only make outbound connections -- no inbound ports, port forwarding, or firewall configuration needed. All communication with the coordinator and edge relays uses outbound TLS (HTTPS).

### Upload Speed (Most Important)

GRID nodes push cached content to edge relays:

- **Minimum**: 50 Mbps (6.25 MB/s)
- **Recommended**: 100 Mbps (12.5 MB/s)
- **Ideal**: 500+ Mbps (62.5+ MB/s)

**Earnings scale with upload capacity.** A 1 Gbps upload connection can earn 10x more than 100 Mbps.

### Download Speed

Initial content downloads from the coordinator:

- **Minimum**: 25 Mbps
- **Recommended**: 100 Mbps

Download speed matters less after initial sync.

### Bandwidth Caps

**Unlimited bandwidth strongly recommended.**

**With caps:**

- 1 TB/month: Suitable for minimum spec (~30 GB/day average upload)
- 5 TB/month: Suitable for recommended spec (~160 GB/day)
- 10 TB+/month: Suitable for high-performance

**Monitor usage** in GRID dashboard to avoid overages.

### Network Quality

**Latency:**

- Under 100ms to major regions preferred
- High latency doesn't disqualify but may reduce earnings

**Reliability:**

- 99%+ uptime ideal
- Frequent disconnects reduce earnings significantly

Both IPv4 and IPv6 are supported.

## Operating System Support

### Linux (Recommended)

**Supported Distributions:**

- Ubuntu 22.04 LTS (recommended)
- Ubuntu 24.04 LTS
- Debian 12+
- Raspberry Pi OS (64-bit)
- Fedora 38+
- Arch Linux (community support)

**Pros:**

- Best performance
- Lowest resource usage
- Native Docker support
- Systemd integration

### macOS

**Supported Versions:**

- macOS 12 Monterey
- macOS 13 Ventura
- macOS 14 Sonoma
- macOS 15 Sequoia

**Limitations:**

- Cannot run 24/7 (sleep mode stops seeding)
- Higher resource usage than Linux
- Suitable for testing or part-time seeding only

### Windows

**Supported Versions:**

- Windows 10 (1809+)
- Windows 11
- Windows Server 2019+

**Limitations:**

- Higher RAM usage (~1 GB overhead)
- Windows updates may interrupt service
- Docker Desktop licensing restrictions

**Recommendation**: Use Linux for production nodes.

## Power Consumption

### Electricity Costs

**Example calculations** (at $0.12 USD/kWh):

| Hardware | Power Draw | Monthly Cost |
|----------|------------|--------------|
| Raspberry Pi 5 | 5W | $0.43 |
| Raspberry Pi 5 (NVMe) | 8W | $0.69 |
| Mini PC (N100) | 15W | $1.30 |
| Desktop PC | 100W | $8.64 |
| Server (dual CPU) | 250W | $21.60 |

**Factor electricity costs into profitability calculations.**

### Energy Efficiency

**Best efficiency:**

1. Raspberry Pi 5 (NVMe): ~10-20 LYTH per watt per month
2. Mini PC (N100): ~5-10 LYTH per watt per month
3. Desktop PC: ~1-3 LYTH per watt per month

**Higher-power systems** need proportionally higher earnings to remain profitable.

## Scalability

### Running Multiple Nodes

Operate multiple nodes for increased earnings:

- Each node requires unique wallet address
- Distribute geographically for location bonuses
- Stagger maintenance windows for uptime

**Example Multi-Node Setup:**

- 1x Raspberry Pi 5 at home (reliable, low cost)
- 2x VPS in different regions (high bandwidth)
- **Total cost**: ~$60-80 USD/month
- **Potential earnings**: 500-1000 LYTH/month

### Upgrading Existing Nodes

**Storage expansion:**

- Add external drives (USB 3.0+ for Pi)
- Upgrade to larger NVMe/SSD
- Increase VPS block storage

**Bandwidth upgrades:**

- ISP plan upgrade
- Move to higher-tier VPS
- Add more nodes instead

## Performance Monitoring

**Key metrics to track:**

- Upload bandwidth utilization
- Storage capacity remaining
- CPU and RAM usage
- Network latency
- Uptime percentage

**Tools:**

- GRID Dashboard (built-in)
- Grafana + Prometheus (optional, for advanced users)
- `htop` / `btop` for system resources

## Troubleshooting Common Hardware Issues

### Raspberry Pi SD Card Corruption

**Symptoms**: Node crashes, failed boots, read-only filesystem

**Solutions**:

- Use high-quality A2-rated cards
- Switch to NVMe SSD via HAT
- Enable log2ram to reduce writes

### Insufficient Storage

**Symptoms**: "Storage full" errors, no new games downloading

**Solutions**:

- Increase `max_size_gb` in config
- Enable auto-pruning
- Add external storage

### Network Bottleneck

**Symptoms**: Low bandwidth usage despite good connection

**Solutions**:

- Check router QoS settings
- Check coordinator connection in dashboard
- Test with `iperf3` to rule out hardware issues

### High CPU Usage

**Symptoms**: Node slow, high temperatures

**Solutions**:

- Reduce concurrent downloads
- Lower upload slots
- Ensure adequate cooling

## Next Steps

Hardware ready? Continue to setup guides:

- [Raspberry Pi Setup](./raspberry-pi.md)
- [Docker Setup](./docker.md)
- [Getting Started](./getting-started.md)

Questions about specific hardware? Ask in Discord #grid-hardware channel.
