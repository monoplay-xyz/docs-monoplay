---
sidebar_position: 4
---

# Raspberry Pi 5 Setup

Complete guide to setting up a GRID node on Raspberry Pi 5. This is the most popular home deployment option, offering excellent balance of cost, performance, and energy efficiency.

## Why Raspberry Pi 5?

**Advantages:**

- **Low cost**: $100-160 USD complete kit
- **Energy efficient**: ~5W power draw ($0.50/month electricity)
- **Silent operation**: No fans (with passive cooling)
- **Compact**: Fits anywhere
- **Reliable**: Designed for 24/7 operation
- **Easy setup**: One installation script

**Compared to Pi 4:**

- 2-3x faster CPU
- PCIe support (native NVMe via HAT)
- Better thermal management
- USB 3.0 improved bandwidth

## Shopping List

### Required Components

| Item | Specification | Price (USD) |
|------|---------------|-------------|
| **Raspberry Pi 5** | 8 GB RAM recommended | $80 |
| **Power Supply** | Official 27W USB-C PD | $12 |
| **Storage** | 128 GB microSD (A2) or 500 GB NVMe | $15-40 |
| **Case** | With cooling (passive or active) | $10-15 |

**Total**: $117-147 USD

### Storage Options

**Option A: microSD Card (Budget)**

- SanDisk Extreme 128 GB (A2, U3): $15
- Good for: Testing, light seeding
- Limitations: Slower, wear out faster

**Option B: NVMe SSD (Recommended)**

- M.2 HAT+ (official Raspberry Pi): $12
- 500 GB NVMe M.2 SSD: $40
- Good for: Production, maximum earnings
- Advantages: 10x faster, more reliable

### Optional Accessories

- Ethernet cable (Cat6): $5
- Heatsinks (if case lacks cooling): $8
- UPS / battery backup: $30-100

## Hardware Assembly

### microSD Setup

1. **Flash OS to microSD:**
 - Download [Raspberry Pi Imager](https://www.raspberrypi.com/software/)
 - Choose "Raspberry Pi OS Lite (64-bit)"
 - Select your microSD card
 - Click gear icon for advanced options:
 - Set hostname: `grid-node`
 - Enable SSH
 - Set username: `grid` (or your preference)
 - Set password
 - Configure WiFi (if not using Ethernet)
 - Set locale/timezone
 - Write to card

2. **Insert microSD into Pi**

3. **Assemble case** (follow case instructions)

4. **Connect cables:**
 - Ethernet (recommended) or WiFi
 - HDMI (optional, for initial setup only)
 - Power (last step, Pi will boot immediately)

### NVMe Setup (Recommended)

1. **Attach M.2 HAT:**
 - Power off Pi completely
 - Remove case top
 - Connect HAT to PCIe FPC connector
 - Secure with standoffs
 - Insert NVMe M.2 SSD into HAT slot
 - Secure SSD with screw

2. **Flash OS to microSD** (same as above)

3. **Boot from microSD initially:**
 - Pi 5 requires bootloader update for NVMe boot
 - First boot from microSD, then migrate

4. **Update bootloader:**

```bash
ssh grid@grid-node.local
sudo apt update && sudo apt full-upgrade -y
sudo rpi-eeprom-update -a
sudo reboot
```

5. **Clone to NVMe:**

```bash
# After reboot
sudo apt install -y rsync
lsblk # Identify NVMe device (usually nvme0n1)

# Partition NVMe
sudo fdisk /dev/nvme0n1
# Type: g (create GPT)
# Type: n (new partition, accept defaults)
# Type: w (write changes)

# Format partition
sudo mkfs.ext4 /dev/nvme0n1p1

# Clone OS
sudo mkdir /mnt/nvme
sudo mount /dev/nvme0n1p1 /mnt/nvme
sudo rsync -axv / /mnt/nvme

# Update fstab on NVMe
sudo nano /mnt/nvme/etc/fstab
# Change root partition to: /dev/nvme0n1p1

# Update cmdline.txt
sudo nano /boot/firmware/cmdline.txt
# Change root=/dev/mmcblk0p2 to root=/dev/nvme0n1p1

# Reboot
sudo reboot
```

6. **Verify NVMe boot:**

```bash
# After reboot
lsblk
# nvme0n1p1 should be mounted on /
df -h
# Should show ~500 GB available
```

**Tip**: Keep microSD card as backup boot option.

## Software Installation

### 1. Connect to Pi

Find your Pi's IP address:

```bash
# From your computer
ping grid-node.local
# Or check your router's DHCP table
```

SSH into Pi:

```bash
ssh grid@grid-node.local
# Or: ssh grid@192.168.1.XXX
```

### 2. Update System

```bash
sudo apt update && sudo apt full-upgrade -y
sudo reboot
```

### 3. Install GRID Software

Run the official installation script:

```bash
curl -fsSL https://install.monoplay.xyz/grid-pi | sudo bash
```

The script will:

- Install Docker and dependencies
- Configure system settings (swap, kernel parameters)
- Create GRID user and directories
- Download GRID Docker image
- Set up systemd service
- Configure automatic updates

Installation takes 5-10 minutes.

### 4. Initial Configuration

Visit `http://grid-node.local:8080` in your browser. Complete the setup wizard: enter your email, set a device name, and confirm your email. Your node will register with the coordinator and start seeding automatically.

To configure wallet address, storage limits, and bandwidth, log into [grid.monoplay.xyz](https://grid.monoplay.xyz) after registration.

### 5. Verify Operation

```bash
# Check service status
sudo systemctl status grid-node

# View logs
sudo journalctl -u grid-node -f

# Check node info
sudo grid-cli status
```

Expected output:

```
Node ID: grid-rpi5-abc123
Status: Online
Coordinator: connected
Platform: Raspberry Pi 5 (8 GB)
Storage: 24.1 GB / 450 GB (5%)
Caching: 4 games (encrypted)
Bandwidth (24h): ↑ 18.2 GB ↓ 1.4 GB
Pending Rewards: 0.8 LYTH
Uptime: 1h 23m
```

## Dashboard Access

Access the web dashboard at `http://grid-node.local:8080` (or `http://192.168.1.XXX:8080`).

On first visit, the dashboard presents the setup wizard for initial registration. After setup is complete, the dashboard shows:

- Real-time bandwidth graphs
- Caching status (games, sizes)
- Earnings tracker
- System health (CPU, RAM, temperature)
- Coordinator connection status

### Secure Dashboard (Optional)

Enable password protection:

```bash
sudo grid-config set-dashboard-auth
# Enter username and password when prompted
```

## Monitoring and Maintenance

### Check System Temperature

Raspberry Pi 5 runs warm under load:

```bash
vcgencmd measure_temp
```

**Safe ranges:**

- Under 60°C: Excellent
- 60-75°C: Normal under load
- 75-85°C: Consider better cooling
- Over 85°C: Thermal throttling begins

**Cooling options:**

- Passive heatsink case: Keeps under 70°C
- Active cooling (fan): Keeps under 60°C

### Check Disk Health

Monitor microSD/NVMe health:

```bash
# Disk space
df -h

# For NVMe, check SMART data
sudo apt install nvme-cli
sudo nvme smart-log /dev/nvme0n1
```

### View Resource Usage

```bash
# Install htop
sudo apt install htop

# Run
htop
```

**Typical resource usage:**

- CPU: 10-30% average
- RAM: 1-2 GB
- Disk I/O: Varies with seeding activity

### Automatic Updates

GRID software updates automatically via systemd timer:

```bash
# Check update schedule
systemctl list-timers grid-update.timer

# Manually trigger update
sudo systemctl start grid-update.service

# View update logs
sudo journalctl -u grid-update -n 50
```

## Performance Optimization

### Increase Swap (Recommended for 4 GB Pi)

```bash
# Disable swap
sudo dphys-swapfile swapoff

# Edit swap config
sudo nano /etc/dphys-swapfile
# Change CONF_SWAPSIZE to 4096

# Enable swap
sudo dphys-swapfile setup
sudo dphys-swapfile swapon
```

### Reduce SD Card Writes

Use `log2ram` to store logs in RAM:

```bash
curl -L https://github.com/azlux/log2ram/archive/master.tar.gz | tar zxf -
cd log2ram-master
sudo ./install.sh
sudo reboot
```

### Optimize Network Stack

Edit `/etc/sysctl.conf`:

```bash
sudo nano /etc/sysctl.conf
```

Add:

```
# GRID network optimization
net.core.rmem_max = 134217728
net.core.wmem_max = 134217728
net.ipv4.tcp_rmem = 4096 87380 67108864
net.ipv4.tcp_wmem = 4096 65536 67108864
net.core.netdev_max_backlog = 5000
```

Apply:

```bash
sudo sysctl -p
```

## Troubleshooting

### Pi Won't Boot

1. Check power supply (27W official recommended)
2. Reseat microSD card
3. Try different HDMI port/cable
4. Reflash microSD card

### Can't Connect via SSH

1. Verify Pi is on network: `ping grid-node.local`
2. Check router's DHCP client list for Pi's IP
3. Verify SSH enabled during imaging
4. Try connecting with IP instead of hostname

### GRID Service Won't Start

```bash
# Check logs for errors
sudo journalctl -u grid-node -n 100

# Common issues:
# - Setup wizard not completed (visit http://grid-node.local:8080)
# - Storage path doesn't exist
# - Insufficient disk space
```

### Low Earnings

1. Verify node is connected to coordinator (check dashboard)
2. Check uptime: `sudo grid-cli status`
3. Increase storage allocation via [grid.monoplay.xyz](https://grid.monoplay.xyz)
4. Ensure 24/7 operation (disable sleep/power management)
5. Upgrade to NVMe for better performance

### High Temperature

1. Improve case airflow
2. Add heatsinks
3. Enable active cooling (small fan)
4. Reduce ambient room temperature
5. Limit CPU usage in config (not recommended, reduces earnings)

## Advanced Configuration

### Custom Docker Compose

For advanced users wanting more control:

```bash
sudo nano /opt/grid/docker-compose.yml
```

Restart after changes:

```bash
sudo systemctl restart grid-node
```

### Multiple Pi Nodes

Run several Pis for increased earnings:

- Use different wallet addresses per node
- Distribute physically for redundancy
- Stagger update schedules

## Tips

### Static IP Assignment

Assigning a static IP to your Pi prevents the local address from changing, which keeps the dashboard URL consistent.

**Option 1: Router DHCP Reservation (Recommended)**

1. In router settings, find DHCP reservations
2. Add reservation for Pi's MAC address
3. Assign fixed IP (e.g., 192.168.1.100)

**Option 2: Static IP on Pi**

Edit netplan config:

```bash
sudo nano /etc/netplan/50-cloud-init.yaml
```

```yaml
network:
 version: 2
 ethernets:
 eth0:
 addresses:
 - 192.168.1.100/24
 gateway4: 192.168.1.1
 nameservers:
 addresses:
 - 8.8.8.8
 - 1.1.1.1
```

Apply:

```bash
sudo netplan apply
```

## Backing Up Your Node

### Backup Configuration

```bash
# Backup config files
sudo cp -r /opt/grid/config ~/grid-backup-$(date +%Y%m%d)
```

### Full System Backup

For microSD/NVMe:

```bash
# From your computer (with Pi shut down)
sudo dd if=/dev/mmcblk0 of=~/pi-grid-backup.img bs=4M status=progress
```

Or use [rpi-clone](https://github.com/billw2/rpi-clone) for live backups.

## Next Steps

Node running? Learn about:

- [Rewards System](./rewards.md) - Maximize your earnings
- [Dashboard](./dashboard.md) - Monitoring tools
- [FAQ](./faq.md) - Common questions

Join the community:

- Discord: #grid-raspberry-pi
- Forum: [forum.monoplay.xyz/raspberry-pi](https://forum.monoplay.xyz/raspberry-pi)
