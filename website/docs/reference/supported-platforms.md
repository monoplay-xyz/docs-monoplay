---
sidebar_position: 1
---

# Supported Platforms

MonoPlay supports Windows, macOS, and Linux for both playing games and running GRID nodes. This page outlines platform requirements and compatibility.

## Game Client Platforms

### Windows

**Supported Versions:**

- Windows 10 (version 1809 or later)
- Windows 11 (all versions)
- Windows Server 2019+ (for server-hosted gaming)

**Architecture:**

- x86-64 (64-bit) required
- ARM64 not supported for games (yet)

**Requirements:**

- DirectX 11 or later
- Visual C++ Redistributable 2015-2022
- .NET Framework 4.8 (for some games)

**Recommended:**

- Windows 11 for best performance
- Latest Windows updates installed
- Graphics drivers up to date

**MonoPlay Launcher:**

- Windows 10 1809+ required
- 200 MB disk space
- Administrator rights for initial install

### macOS

**Supported Versions:**

- macOS 12 Monterey
- macOS 13 Ventura
- macOS 14 Sonoma
- macOS 15 Sequoia

**Architecture:**

- Intel (x86-64)
- Apple Silicon (ARM64) via Rosetta 2 or native builds

**Requirements:**

- Metal graphics API support
- Xcode command line tools (auto-installed)
- 10.15+ for some older games

**Recommended:**

- macOS 14+ for best performance
- Native Apple Silicon builds when available
- Latest system updates

**MonoPlay Launcher:**

- macOS 12+ required
- Universal binary (Intel + Apple Silicon)
- 150 MB disk space

**Gatekeeper:**

All games code-signed via MonoPlay certificates, no security warnings.

### Linux

**Officially Supported Distributions:**

- Ubuntu 22.04 LTS (Jammy Jellyfish)
- Ubuntu 24.04 LTS (Noble Numbat)
- Debian 12 (Bookworm)
- Fedora 38+
- Arch Linux (rolling)

**Other Distributions:**

Most modern distributions work if they meet requirements:

- glibc 2.35+ (or musl equivalent)
- Kernel 5.15+
- Mesa drivers 22.0+ (for open-source GPU drivers)
- Vulkan 1.2+ support

**Architecture:**

- x86-64 (64-bit) primary support
- ARM64 experimental support (Raspberry Pi, Pinebook)

**Requirements:**

- X11 or Wayland display server
- PulseAudio or PipeWire for audio
- Graphics drivers (Mesa, NVIDIA, AMD)

**Recommended:**

- Ubuntu 24.04 LTS for best compatibility
- Latest Mesa or proprietary drivers
- Wayland for better performance on supported games

**MonoPlay Launcher:**

- AppImage (portable, no installation)
- Flatpak (sandboxed, Flathub)
- Debian package (.deb) for Ubuntu/Debian
- RPM package for Fedora/RHEL

### Browser Preview

**Experimental WebAssembly builds** for select games:

- Chrome 90+
- Firefox 88+
- Safari 15.4+
- Edge 90+

**Requirements:**

- WebGL 2.0 support
- SharedArrayBuffer enabled
- Minimum 4 GB RAM

**Limitations:**

- Lower performance than native
- Not all games available
- Save files local to browser

## GRID Node Platforms

### Linux (Recommended)

**Supported:**

- Ubuntu 22.04+ (best tested)
- Debian 11+
- Raspberry Pi OS (64-bit)
- Fedora 38+
- Arch Linux

**Requirements:**

- Docker 20.10+ or Podman 4.0+
- systemd (for service management)
- 2 GB RAM minimum

**Recommended**: Ubuntu 22.04 LTS on x86-64 or Raspberry Pi OS on ARM64

### Raspberry Pi

**Supported Models:**

- Raspberry Pi 5 (8 GB) - Recommended
- Raspberry Pi 5 (4 GB) - Supported
- Raspberry Pi 4 (8 GB) - Limited support
- Raspberry Pi 4 (4 GB) - Not recommended

**Operating System:**

- Raspberry Pi OS Lite (64-bit) - Recommended
- Ubuntu 22.04 LTS (64-bit ARM)
- Debian 12 ARM64

**Requirements:**

- Raspberry Pi OS 64-bit (32-bit not supported)
- 100 GB+ storage (microSD or NVMe)
- Ethernet connection recommended

### macOS

**Supported Versions:**

- macOS 12 Monterey
- macOS 13 Ventura
- macOS 14 Sonoma
- macOS 15 Sequoia

**Architecture:**

- Intel (x86-64)
- Apple Silicon (ARM64)

**Requirements:**

- Docker Desktop for Mac
- 4 GB RAM allocated to Docker
- 100 GB+ free disk space

**Limitations:**

- Lower performance than Linux
- Sleep mode interrupts seeding
- Suitable for testing only, not 24/7 production

### Windows

**Supported Versions:**

- Windows 10 (1809+)
- Windows 11
- Windows Server 2019+

**Requirements:**

- WSL2 (Windows Subsystem for Linux 2)
- Docker Desktop for Windows
- 4 GB RAM allocated to Docker
- 100 GB+ free disk space

**Limitations:**

- Overhead from WSL2 layer
- Windows updates may interrupt service
- Suitable for testing or part-time seeding

**Recommended**: Use Linux for production GRID nodes

### Docker

**Supported on all platforms** with Docker/Podman:

- Linux: Native performance
- macOS: Docker Desktop
- Windows: Docker Desktop + WSL2

**Docker Version:**

- Docker 20.10+
- Docker Compose 2.0+
- Podman 4.0+ (Linux only)

## Publisher/Developer Tools

### Developer Console

**Browser Requirements:**

- Chrome 90+
- Firefox 88+
- Safari 15.4+
- Edge 90+

**Platform:**

- Windows, macOS, Linux
- Mobile browsers supported (limited features)

**Requirements:**

- Wallet extension (MetaMask, Rabby, etc.)
- JavaScript enabled
- Cookies enabled

### MonoPlay CLI

**Supported Platforms:**

- Windows 10+ (x86-64)
- macOS 12+ (Intel + Apple Silicon)
- Linux (x86-64, glibc 2.35+)

**Installation:**

```bash
npm install -g monoplay-cli
```

**Requirements:**

- Node.js 18+
- NPM 9+

## Platform-Specific Features

### Windows-Exclusive

- Game Pass integration (coming soon)
- Xbox controller support
- HDR gaming (Windows 11)

### macOS-Exclusive

- Game Center integration (coming soon)
- Metal graphics API optimizations
- Touch Bar support (MacBook Pro)

### Linux-Exclusive

- Flatpak sandboxing
- Wayland native support
- Steam Deck compatibility

## Platform Limitations

### Windows

- Older than Windows 10 1809: Not supported
- 32-bit Windows: Not supported (discontinued)
- Windows 7/8: Not supported (end of life)

### macOS

- macOS 11 Big Sur and earlier: Limited support
- PowerPC Macs: Not supported
- 32-bit apps: Not supported (removed in Catalina)

### Linux

- glibc < 2.35: Limited compatibility
- 32-bit x86: Not supported
- Non-systemd distros: Manual service management required

## Compatibility Verification

### Check Your System

**Windows:**

```powershell
# Check version
winver

# Check DirectX version
dxdiag

# Check architecture
wmic os get osarchitecture
```

**macOS:**

```bash
# Check version
sw_vers

# Check architecture
uname -m

# Check Metal support
system_profiler SPDisplaysDataType | grep Metal
```

**Linux:**

```bash
# Check distribution
lsb_release -a

# Check glibc version
ldd --version

# Check graphics
glxinfo | grep "OpenGL version"

# Check Vulkan
vulkaninfo | grep "Vulkan Instance Version"
```

## Future Platform Support

### Planned

- **Android**: Mobile gaming (2026 Q3)
- **iOS**: iPad gaming (2026 Q4)
- **Steam Deck**: Native integration (2026 Q2)
- **Web3 Browsers**: Brave, Opera integration

### Under Consideration

- **Chrome OS**: Chromebook support
- **FreeBSD**: Server and desktop
- **RISC-V**: Emerging architecture

## Support

Platform compatibility questions?

- **Discord**: #platform-support channel
- **Forum**: [forum.monoplay.xyz/compatibility](https://forum.monoplay.xyz/compatibility)
- **Email**: support@monoplay.xyz

## Next Steps

- [System Requirements](./system-requirements.md) - Hardware specs
- [FAQ](./faq.md) - Common questions
- [Getting Started](../grid/getting-started.md) - GRID node setup
