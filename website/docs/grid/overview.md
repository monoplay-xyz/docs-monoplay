---
sidebar_position: 1
---

# GRID Overview

GRID (Good Reasonable Infrastructure Device) is MonoPlay's decentralized content delivery network for game distribution. Run a GRID node and earn LYTH rewards for helping distribute games to players worldwide.

## What is GRID?

GRID is a network of seeder nodes that distribute games via BitTorrent protocol:

- **Decentralized**: No single point of failure
- **Incentivized**: Node operators earn LYTH for bandwidth contribution
- **Secure**: Only licensed, security-scanned content distributed
- **Efficient**: Peer-to-peer distribution reduces central infrastructure costs

Think of it as a blockchain-incentivized CDN specifically for MonoPlay games.

## How It Works

### For Node Operators

1. **Run GRID Software**: Install on Raspberry Pi 5, server, or Docker
2. **Connect Wallet**: Link Monolythium wallet for reward payments
3. **Seed Content**: Automatically download and share popular games
4. **Earn Rewards**: Receive LYTH based on bandwidth served and uptime

### For Players

When a player downloads a game:

1. MonoPlay Launcher requests game from GRID network
2. Torrent client connects to nearest available seeders
3. Game downloaded from multiple nodes simultaneously
4. Download speed and reliability improved by distributed network
5. Node operators earn rewards proportional to bandwidth served

### Content Distribution

GRID only distributes:

- Games approved through MonoPlay security scanning
- Content from verified publishers
- Licensed releases registered on-chain

**GRID is not a generic torrent network.** It exclusively serves MonoPlay-approved content.

## Why Run a GRID Node?

### Earn LYTH Rewards

Node operators receive rewards from the SeederRewards contract:

- **Bandwidth rewards**: Earn for data served to players
- **Uptime bonuses**: Consistent availability increases earnings
- **Popularity multipliers**: Hosting in-demand games pays more
- **Early adopter benefits**: Higher rewards during network growth phase

Estimated earnings: 50-500 LYTH/month depending on hardware, bandwidth, and network usage.

### Support Decentralization

Help build resilient game distribution infrastructure:

- Reduce reliance on centralized servers
- Improve download speeds for players in your region
- Enhance platform censorship resistance
- Contribute to blockchain gaming ecosystem

### Low Barrier to Entry

Getting started is affordable:

- **Raspberry Pi 5**: ~$150 USD for complete kit
- **Docker on existing server**: Free if you already have hardware
- **Minimal bandwidth**: 100+ Mbps recommended but not required
- **Set-and-forget**: Automated operation, minimal maintenance

## Network Architecture

### Node Types

GRID supports multiple deployment types:

**Home Nodes:**
- Raspberry Pi 5 devices
- Consumer internet connections
- Ideal for distributed global coverage

**Hosted Nodes:**
- VPS or dedicated servers
- Data center bandwidth
- Higher earning potential

**Hybrid Players:**
- Players who also seed
- Built into MonoPlay Launcher (opt-in)
- Earn small rewards while gaming

### Content Selection

Nodes don't need to seed all content:

- **Automatic mode**: Software selects popular games to maximize earnings
- **Manual mode**: Choose specific games to seed
- **Storage limits**: Configure maximum storage allocation
- **Bandwidth caps**: Set upload limits to protect your internet plan

### Network Protocol

Technical details:

- **Protocol**: BitTorrent with extensions for authentication
- **Tracker**: MonoPlay tracker verifies licenses on-chain
- **Encryption**: All transfers encrypted with TLS
- **Authentication**: Nodes sign bandwidth reports for reward claims

## Reward System

### Reward Pool

The SeederRewards contract manages a reward pool funded by:

- Platform fees (portion of game sales)
- Network transaction fees
- Foundation allocations

Rewards distributed weekly based on contribution metrics.

### Earning Factors

Your earnings depend on:

1. **Bandwidth Served**: Total MB/GB uploaded to players
2. **Uptime**: Percentage of time node is online and accessible
3. **Content Popularity**: High-demand games earn more per MB
4. **Geographic Location**: Underserved regions receive bonus multipliers
5. **Network Quality**: Fast, reliable nodes prioritized by clients

### Reward Calculation

Simplified formula:

```
Reward = (Bandwidth × Popularity × Uptime × Location Bonus) / Total Network Contribution
```

Actual calculation is more complex and performed on-chain by the SeederRewards contract.

### Claiming Rewards

Rewards accrue in the smart contract:

- **Minimum threshold**: 10 LYTH before claiming
- **Gas fees**: You pay transaction fees to claim
- **Claim frequency**: Weekly or whenever you prefer
- **Automatic claiming**: Optional feature in GRID software

## Security and Privacy

### Content Verification

GRID only seeds verified content:

- All games scanned for malware before distribution
- Torrent hashes registered on-chain via ReleaseRegistry
- License validation prevents piracy
- Security updates pushed automatically

### Node Security

Protect your node:

- GRID software sandboxed from rest of system
- No direct file system access
- Automatic security updates
- Rate limiting prevents abuse

### Privacy

What's private:

- Your IP address is **not** published on-chain
- Bandwidth data aggregated, not per-download
- Wallet address public but not linked to identity

What's public:

- Total bandwidth served (not per-game)
- Node uptime statistics
- Earned rewards (on-chain transactions)

## Getting Started

Ready to run a GRID node?

1. **Choose deployment**: [Raspberry Pi](./raspberry-pi.md) or [Docker](./docker.md)
2. **Review requirements**: [System Requirements](./requirements.md)
3. **Set up hardware**: Follow deployment guide
4. **Configure and launch**: Connect wallet, set storage limits
5. **Monitor earnings**: Use [Node Dashboard](./dashboard.md)

## Hardware Recommendations

### Raspberry Pi 5

Best for home users:

- Low power consumption (~5W)
- Compact and silent
- Easy setup
- $100-150 USD total cost

See [Raspberry Pi Guide](./raspberry-pi.md).

### Docker on Existing Hardware

Best for tech-savvy users with servers:

- Use spare bandwidth on existing infrastructure
- Higher earning potential with data center bandwidth
- Free if you already have hardware
- More configuration flexibility

See [Docker Guide](./docker.md).

### Dedicated Server

Best for maximizing earnings:

- VPS or dedicated server with 1+ Gbps connection
- Seed full game library
- 24/7 uptime
- $10-50 USD/month hosting cost

See [Requirements](./requirements.md) for specs.

## Support

Need help getting started?

- **Quick Start**: [Getting Started Guide](./getting-started.md)
- **FAQ**: [Common Questions](./faq.md)
- **Discord**: #grid-operators channel
- **Email**: grid-support@monoplay.xyz

## Next Steps

Ready to set up? Choose your deployment:

- [Getting Started](./getting-started.md) - Quick start guide
- [Raspberry Pi](./raspberry-pi.md) - Complete Pi 5 setup
- [Docker](./docker.md) - Docker deployment
- [Rewards](./rewards.md) - Understand earning potential
