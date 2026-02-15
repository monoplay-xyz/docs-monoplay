---
sidebar_position: 2
---

# System Requirements

Hardware and software requirements for MonoPlay Launcher, games, and GRID nodes.

## MonoPlay Launcher

### Minimum Requirements

**Windows:**
- OS: Windows 10 (1809+) 64-bit
- CPU: Dual-core 1.5 GHz
- RAM: 2 GB
- Storage: 500 MB free space
- Graphics: DirectX 11 compatible
- Network: Broadband internet

**macOS:**
- OS: macOS 12 Monterey
- CPU: Intel Core i3 or Apple M1
- RAM: 2 GB
- Storage: 500 MB free space
- Graphics: Metal-compatible GPU
- Network: Broadband internet

**Linux:**
- OS: Ubuntu 22.04 LTS or equivalent
- CPU: Dual-core 1.5 GHz
- RAM: 2 GB
- Storage: 500 MB free space
- Graphics: OpenGL 3.3+ / Vulkan 1.0+
- Network: Broadband internet

### Recommended Requirements

**All Platforms:**
- CPU: Quad-core 2.0 GHz
- RAM: 4 GB
- Storage: 1 GB free space (for cache)
- Network: 25+ Mbps download, 10+ Mbps upload
- SSD storage for faster game library management

## Games

Game requirements vary significantly. Check individual game pages for specific requirements.

### Typical Indie Game

**Minimum:**
- CPU: Dual-core 2.0 GHz
- RAM: 4 GB
- GPU: Integrated graphics (Intel HD 4000, AMD Vega 3)
- Storage: 1-5 GB

**Recommended:**
- CPU: Quad-core 2.5 GHz
- RAM: 8 GB
- GPU: GTX 1050 / RX 560 or better
- Storage: SSD

### Typical AAA Game

**Minimum:**
- CPU: Quad-core 3.0 GHz (Intel i5 / AMD Ryzen 5)
- RAM: 8 GB
- GPU: GTX 1060 / RX 580 (6 GB VRAM)
- Storage: 30-100 GB SSD

**Recommended:**
- CPU: 6-8 cores 3.5+ GHz (Intel i7 / AMD Ryzen 7)
- RAM: 16 GB
- GPU: RTX 3060 / RX 6600 XT (8+ GB VRAM)
- Storage: NVMe SSD

### VR Games

**Minimum:**
- CPU: Quad-core 3.5 GHz
- RAM: 8 GB
- GPU: GTX 1070 / RX 5700 (8 GB VRAM)
- VR Headset: Oculus Quest 2, Valve Index, HTC Vive

**Recommended:**
- CPU: 8-core 4.0+ GHz
- RAM: 16 GB
- GPU: RTX 3070 / RX 6800 XT (12+ GB VRAM)
- VR Headset: High-end PCVR setup

## GRID Nodes

### Minimum Specifications

**For earning rewards (minimal setup):**

- **CPU**: 2 cores, 1.5+ GHz (ARM or x86-64)
- **RAM**: 2 GB
- **Storage**: 50 GB free space
- **Network**: 50 Mbps upload, 25 Mbps download
- **Uptime**: 12+ hours/day
- **Operating System**: Linux (Ubuntu 22.04+)

**Expected Earnings**: 10-30 LYTH/month

**Suitable Hardware:**

- Raspberry Pi 4 (4 GB)
- Old desktop PC
- Low-end VPS

### Recommended Specifications

**For reliable earnings:**

- **CPU**: 4 cores, 2.0+ GHz
- **RAM**: 4 GB
- **Storage**: 500 GB (SSD preferred)
- **Network**: 100+ Mbps upload, 100+ Mbps download
- **Uptime**: 24/7
- **Operating System**: Linux (Ubuntu 22.04 LTS)

**Expected Earnings**: 100-300 LYTH/month

**Suitable Hardware:**

- Raspberry Pi 5 (8 GB)
- Mini PC (Intel N100)
- Mid-tier VPS

### High-Performance Specifications

**For maximum earnings:**

- **CPU**: 8+ cores, 3.0+ GHz
- **RAM**: 8 GB+
- **Storage**: 2+ TB NVMe SSD
- **Network**: 1+ Gbps upload/download
- **Uptime**: 24/7 with UPS backup
- **Operating System**: Linux (Ubuntu 22.04 LTS)

**Expected Earnings**: 500-2000+ LYTH/month

**Suitable Hardware:**

- Dedicated server
- High-tier VPS (OVH, Hetzner)
- Homelab server with fast internet

### Detailed Hardware Requirements

#### CPU

**Minimum:**
- 2 cores, 1.5 GHz
- x86-64 (Intel/AMD) or ARM64 (Raspberry Pi)

**Recommended:**
- 4 cores, 2.0+ GHz
- Modern architecture (2015+)

**Impact**: Higher CPU allows more concurrent connections and faster file serving.

#### RAM

**Minimum:**
- 2 GB (shared with OS)
- Swap recommended for 2 GB systems

**Recommended:**
- 4 GB or more
- 8 GB for high-traffic nodes

**Impact**: More RAM enables larger file cache, improving performance.

#### Storage

**Capacity:**

- **Minimum**: 50 GB (3-5 small games)
- **Recommended**: 500 GB (10-20 games)
- **Optimal**: 1-2 TB (30-100 games)

**Type:**

- **HDD**: Adequate, cheapest per GB
- **SATA SSD**: Better performance
- **NVMe SSD**: Best performance (slight quality score boost)

**Impact**: More storage = more games seeded = higher earning potential.

#### Network

**Upload Speed (Most Important):**

- **Minimum**: 50 Mbps (6.25 MB/s)
- **Recommended**: 100+ Mbps (12.5+ MB/s)
- **Optimal**: 500+ Mbps (62.5+ MB/s)

**Download Speed:**

- **Minimum**: 25 Mbps (initial sync)
- **Recommended**: 100 Mbps

**Latency:**

- Under 100ms to major regions preferred
- High latency doesn't disqualify but may reduce earnings

**Bandwidth Cap:**

- **Minimum**: 1 TB/month (~33 GB/day)
- **Recommended**: Unlimited

**Impact**: Upload speed directly correlates with earnings.

## Hardware Recommendations

### Budget Setup (~$150)

**Raspberry Pi 5 Kit:**

- Raspberry Pi 5 (8 GB): $80
- 128 GB microSD (A2): $15
- Official power supply: $12
- Case with cooling: $15
- Ethernet cable: $5
- **Total**: $127

**Expected**: 80-150 LYTH/month

### Mid-Range Setup (~$400)

**Mini PC Build:**

- Intel N100 Mini PC (16 GB RAM): $250
- 500 GB NVMe SSD: $40
- Gigabit Ethernet (included)
- Power consumption: ~15W
- **Total**: $290

**Expected**: 200-500 LYTH/month

### High-End Setup (~$35/month)

**VPS Rental:**

- Hetzner CPX31: 4 vCPU, 8 GB RAM, 1 Gbps
- 500 GB block storage volume
- **Monthly**: $35

**Expected**: 400-800 LYTH/month

### Dedicated Server (~$50-100/month)

**Bare Metal:**

- 8-core CPU, 32 GB RAM, 2 TB NVMe
- 1+ Gbps unmetered bandwidth
- **Monthly**: $50-100 (OVH, Hetzner)

**Expected**: 800-2000 LYTH/month

## Power Consumption

Energy costs vary by hardware:

| Hardware | Power Draw | Monthly Cost (@ $0.12/kWh) |
|----------|------------|----------------------------|
| Raspberry Pi 5 | 5W | $0.43 |
| Raspberry Pi 5 (NVMe) | 8W | $0.69 |
| Mini PC (N100) | 15W | $1.30 |
| Desktop PC | 100W | $8.64 |
| Server (dual CPU) | 250W | $21.60 |

**Factor electricity into profitability calculations.**

## Operating System Requirements

### Linux (Recommended)

**Distributions:**

- **Ubuntu 22.04 LTS**: Best tested, recommended
- **Debian 12**: Stable, well-supported
- **Raspberry Pi OS 64-bit**: For Raspberry Pi
- **Fedora 38+**: Modern, up-to-date packages
- **Arch Linux**: Rolling release, advanced users

**Requirements:**

- Kernel 5.15+
- glibc 2.35+ (or musl equivalent)
- systemd (for service management)
- Docker 20.10+ or Podman 4.0+

### macOS

**Supported Versions:**

- macOS 12 Monterey
- macOS 13 Ventura
- macOS 14 Sonoma
- macOS 15 Sequoia

**Requirements:**

- Docker Desktop for Mac
- 4 GB RAM allocated to Docker
- Intel or Apple Silicon

**Limitations**: Not suitable for 24/7 nodes (sleep mode).

### Windows

**Supported Versions:**

- Windows 10 (1809+)
- Windows 11
- Windows Server 2019+

**Requirements:**

- WSL2 enabled
- Docker Desktop for Windows
- 4 GB RAM allocated to Docker

**Limitations**: Higher overhead, not recommended for production.

## Network Infrastructure

### Router

**Requirements:**

- Port forwarding support (for GRID nodes)
- QoS/bandwidth management (recommended)
- Gigabit Ethernet ports
- Stable firmware

### Internet Connection

**For Gaming:**

- **Minimum**: 25 Mbps download, 5 Mbps upload
- **Recommended**: 100 Mbps download, 25 Mbps upload
- **Latency**: Under 50ms for competitive gaming

**For GRID Nodes:**

- **Minimum**: 50 Mbps upload (most important)
- **Recommended**: 100+ Mbps upload
- **Latency**: Under 100ms acceptable

**Data Cap**: Unlimited strongly recommended for GRID nodes.

## Testing Your System

### Check Compatibility

**Windows:**

```powershell
# System info
systeminfo

# DirectX version
dxdiag

# Network speed test
Invoke-WebRequest -Uri https://speed.monoplay.xyz
```

**macOS:**

```bash
# System info
system_profiler SPSoftwareDataType SPHardwareDataType

# Graphics
system_profiler SPDisplaysDataType | grep Metal

# Network
networkQuality
```

**Linux:**

```bash
# CPU info
lscpu

# RAM
free -h

# Storage
df -h

# Graphics
glxinfo | grep "OpenGL version"

# Network
speedtest-cli
```

### Benchmark Tools

**For Games:**

- 3DMark (graphics benchmark)
- Geekbench (CPU/GPU)
- UserBenchmark (all components)

**For GRID Nodes:**

- `iperf3` (network throughput)
- `fio` (disk I/O)
- `stress-ng` (CPU stress test)

## Upgrading Your System

### Most Impactful Upgrades

**For Gaming:**

1. **GPU**: Biggest performance boost
2. **SSD**: Faster load times
3. **RAM**: 16 GB for modern games
4. **CPU**: Diminishing returns for most games

**For GRID Nodes:**

1. **Internet upgrade**: Directly increases earnings
2. **Storage**: More games = more opportunities
3. **RAM**: Better performance under load
4. **CPU**: Minor impact

## Support

Questions about hardware compatibility?

- **Discord**: #hardware-help channel
- **Forum**: [forum.monoplay.xyz/hardware](https://forum.monoplay.xyz/hardware)
- **Email**: support@monoplay.xyz

## Next Steps

- [Supported Platforms](./supported-platforms.md) - OS compatibility
- [GRID Requirements](../grid/requirements.md) - Detailed GRID specs
- [FAQ](./faq.md) - Common questions
