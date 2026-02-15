---
sidebar_position: 1
---

# GRID Overview

GRID (Good Reasonable Infrastructure Device) is MonoPlay's decentralized content delivery network for game distribution. Run a GRID node and earn LYTH rewards for helping distribute games to players worldwide.

## What is GRID?

GRID is a network of seeder nodes that distribute encrypted game content through a relay-based CDN:

- **Decentralized**: No single point of failure
- **Incentivized**: Node operators earn LYTH for bandwidth contribution
- **Encrypted**: Nodes store and relay encrypted content -- they cannot access or play games
- **Private**: Hub-and-spoke architecture keeps node IPs hidden from players and other nodes
- **Zero Config**: No port forwarding, no firewall rules -- just plug in and go

Think of it as a blockchain-incentivized CDN specifically for MonoPlay games.

## How It Works

### For Node Operators

1. **Run GRID Software**: Install on Raspberry Pi 5, server, or Docker
2. **Register with Email**: Complete the setup wizard to register your device with the coordinator
3. **Seed Content**: The coordinator assigns encrypted game content based on demand in your region
4. **Earn Rewards**: Receive LYTH based on bandwidth served and uptime
5. **Set Payout Wallet**: Configure your wallet address in the web portal at grid.monoplay.xyz

### For Players

When a player purchases and downloads a game:

1. MonoPlay backend verifies the player's on-chain license
2. Player receives a decryption key for the purchased game
3. MonoPlay Launcher requests encrypted content from GRID Edge Relays
4. Encrypted chunks downloaded from Edge Relays (never directly from seeder nodes)
5. Launcher decrypts and installs the game locally
6. Node operators earn rewards proportional to bandwidth served

### Content Distribution

GRID only distributes:

- Games approved through MonoPlay security scanning
- Content from verified publishers
- Licensed releases registered on-chain

All content is encrypted before distribution. GRID nodes store only encrypted chunks and have no ability to access, play, or extract game content. Only players with valid on-chain licenses receive decryption keys from the MonoPlay backend.

**GRID is not a generic file sharing network.** It exclusively serves MonoPlay-approved, encrypted content.

## Why Run a GRID Node?

### Earn LYTH Rewards

Node operators receive rewards from the SeederRewards contract:

- **Bandwidth rewards**: Earn for data served through Edge Relays
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
- **No network configuration**: No port forwarding or firewall rules required

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

### Hub-and-Spoke Relay Model

GRID uses a hub-and-spoke architecture to protect operator and player privacy:

- **GRID Nodes** connect outbound to the MonoPlay coordinator over TLS
- **Nodes push** encrypted content to GRID Edge Relays
- **Players download** from Edge Relays, never directly from seeder nodes
- **No peer-to-peer connections**: Nodes never connect to each other or to players
- **No inbound ports needed**: All connections are outbound from the node

This design means node operators do not need to configure port forwarding, UPnP, or firewall rules. The node software handles everything over standard outbound HTTPS connections.

### Content Assignment

The coordinator assigns content to nodes automatically based on:

- **Geographic demand**: Nodes receive content popular in their region
- **Storage capacity**: Larger nodes receive more content
- **Network conditions**: Bandwidth and latency influence assignment
- **Redundancy**: Content replicated across multiple nodes for availability

Operators configure only their storage and bandwidth limits. The coordinator handles all content selection to optimize delivery performance across the network.

### Network Protocol

Technical details:

- **Architecture**: Hub-and-spoke relay model with centralized coordinator
- **Coordinator**: MonoPlay coordinator assigns content, manages node registration, and routes delivery through Edge Relays
- **Encryption**: All content encrypted at rest and in transit (TLS)
- **Authentication**: Nodes authenticate with the coordinator; bandwidth reports signed for reward claims
- **Edge Relays**: Geographically distributed relay points that serve content to players

## Reward System

### Reward Pool

The SeederRewards contract manages a reward pool funded by:

- Platform fees (portion of game sales)
- Network transaction fees
- Foundation allocations

Rewards distributed weekly based on contribution metrics.

### Earning Factors

Your earnings depend on:

1. **Bandwidth Served**: Total data pushed through Edge Relays
2. **Uptime**: Percentage of time node is online and connected to the coordinator
3. **Content Popularity**: High-demand games earn more per MB
4. **Geographic Location**: Underserved regions receive bonus multipliers
5. **Network Quality**: Fast, reliable nodes prioritized for content assignment

### Reward Calculation

Simplified formula:

```
Reward = (Bandwidth x Popularity x Uptime x Location Bonus) / Total Network Contribution
```

Actual calculation is more complex and performed on-chain by the SeederRewards contract.

### Claiming Rewards

Rewards accrue in the smart contract:

- **Minimum threshold**: 10 LYTH before claiming
- **Gas fees**: You pay transaction fees to claim
- **Claim frequency**: Weekly or whenever you prefer
- **Automatic claiming**: Optional feature in GRID software

## Security and Privacy

### Encrypted Content Distribution

GRID nodes only store and relay encrypted game data:

- Games are encrypted before being distributed to the network
- Nodes cannot decrypt, access, play, or extract game content
- Only players with valid on-chain licenses receive decryption keys
- Decryption keys are delivered directly from the MonoPlay backend to the player, never through GRID nodes

This means even if a node's storage is compromised, the game data is unusable without a valid license.

### Content Verification

GRID only distributes verified content:

- All games scanned for malware before encryption and distribution
- Content hashes registered on-chain via ReleaseRegistry
- License validation prevents unauthorized access
- Security updates pushed automatically

### Node Security

Protect your node:

- GRID software sandboxed from rest of system
- No direct file system access beyond the configured storage directory
- Automatic security updates
- Rate limiting prevents abuse
- All connections outbound over TLS -- no open ports required

### Privacy

GRID is designed with operator privacy as a core principle:

**Your IP address is never exposed to players or other nodes.** This is a key advantage of the hub-and-spoke relay architecture:

- Node IPs are known only to the MonoPlay coordinator (stored encrypted, never shared)
- Players download from Edge Relays, not from your node
- Nodes never connect directly to players or to each other
- No inbound connections means your node is not discoverable on the open internet

**What's private:**

- Your IP address -- not visible to players, other nodes, or published on-chain
- Your physical location -- not disclosed beyond what the coordinator needs for content assignment
- Bandwidth data aggregated, not per-download

**What's public:**

- Total bandwidth served (not per-game)
- Node uptime statistics
- Earned rewards (on-chain transactions)

## Getting Started

Ready to run a GRID node?

1. **Choose deployment**: [Raspberry Pi](./raspberry-pi.md) or [Docker](./docker.md)
2. **Review requirements**: [System Requirements](./requirements.md)
3. **Set up hardware**: Follow deployment guide
4. **Register and launch**: Complete setup wizard with email, set storage limits
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
