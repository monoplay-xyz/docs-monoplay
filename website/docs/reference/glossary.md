---
sidebar_position: 4
---

# Glossary

Terminology and definitions used throughout MonoPlay documentation.

## A

### Age Rating

Classification indicating appropriate age group for game content (Everyone, Teen, Mature, Adults Only). Similar to ESRB or PEGI ratings.

### API (Application Programming Interface)

MonoPlay REST API allows programmatic access to catalog, licenses, and publisher data. See [API Reference](../developers/api-reference.md).

### AppImage

Portable Linux application format. Many MonoPlay games distributed as AppImage for easy Linux deployment.

## B

### Blockchain

Distributed ledger technology underlying Monolythium. Records all game licenses, transactions, and ownership immutably.

### Build

Compiled game files ready for distribution. Publishers upload builds for each platform (Windows, macOS, Linux).

## C

### Catalog

Complete collection of games available on MonoPlay. Browse at [monoplay.xyz](https://monoplay.xyz).

### CDN (Content Delivery Network)

Network of servers distributing content. MonoPlay uses GRID (peer-to-peer) instead of traditional centralized CDN.

### Claim

Process of withdrawing earned rewards (for publishers) or LYTH (for GRID operators) from smart contracts to wallet.

### Code Signing

Cryptographic signature applied to games verifying publisher and preventing tampering. MonoPlay signs all approved games.

### Content Guidelines

Policies governing acceptable game content. See [Content Guidelines](../publishing/content-guidelines.md).

## D

### Delist

Remove game from catalog. Existing licenses remain valid but no new sales allowed.

### Developer Console

Web dashboard for publishers to manage games, track submissions, view analytics. Access at [console.monoplay.xyz](https://console.monoplay.xyz).

### DRM (Digital Rights Management)

Technology restricting how software is used. MonoPlay doesn't mandate DRM; publisher's choice.

## E

### EIP-191

Ethereum Improvement Proposal 191 - signature standard used for MonoPlay authentication. Allows wallet-based login without passwords.

### Epoch

Time period for GRID reward calculation. One epoch = 7 days (Monday-Sunday).

### ERC-721

NFT standard used for game licenses on Monolythium. Each license is a unique token.

## F

### Faucet

Service providing free testnet LYTH for development. Available at [faucet.monoplay.xyz](https://faucet.monoplay.xyz).

## G

### GameRegistry

Smart contract managing game registration and metadata on Monolythium blockchain.

### Gas Fee

Small fee paid for blockchain transactions (in LYTH). Typically $0.001-0.01 per transaction on Monolythium.

### GRID (Good Reasonable Infrastructure Device)

Peer-to-peer network distributing games. Operators run seeder nodes and earn LYTH rewards.

## H

### Hardware Wallet

Physical device storing private keys offline (Ledger, Trezor). Recommended for high-value accounts.

## I

### Indexer

Service tracking blockchain events and maintaining queryable database. Powers MonoPlay API and analytics.

## L

### License

NFT granting right to download and play a game. Types: single-user, multi-user, commercial.

### LicenseRegistry

Smart contract managing license NFTs (ERC-721) on Monolythium blockchain.

### LYTH

Native cryptocurrency of Monolythium blockchain. Used for purchasing games, paying fees, and GRID rewards.

## M

### Magnet Link

BitTorrent link using hash instead of tracker URL. GRID uses magnet links for game distribution.

### Metadata

Descriptive information about games: title, description, screenshots, system requirements, etc.

### MetaMask

Popular browser extension wallet. Compatible with MonoPlay after adding Monolythium network.

### Mint

Create new NFT on blockchain. When you buy a game, license NFT is minted to your wallet.

### Monolythium

Layer 1 blockchain powering MonoPlay. Fast, low-fee network designed for gaming and DeFi.

### Monoscan

Blockchain explorer for Monolythium. View transactions and contracts at [monoscan.xyz](https://monoscan.xyz).

## N

### NFT (Non-Fungible Token)

Unique blockchain token representing ownership. MonoPlay game licenses are NFTs (ERC-721).

### Node

Computer participating in blockchain network. Can refer to:

- **Blockchain node**: Validates transactions
- **GRID node**: Seeds games to players

## P

### Peer

Another user downloading or seeding the same game. More peers = faster downloads.

### ProAccess

Advanced features and subscriptions (coming soon). Smart contract: ProAccessRouter.

### Publisher

Verified developer or studio authorized to submit games to MonoPlay.

## R

### Release

Specific version of a game (e.g., v1.0.0). Tracked on-chain via ReleaseRegistry contract.

### ReleaseRegistry

Smart contract tracking game versions and distribution metadata.

### Rewards

LYTH earned by GRID operators for seeding games. Calculated weekly based on bandwidth, uptime, and popularity.

## S

### SDK (Software Development Kit)

Libraries and tools for integrating MonoPlay features. Available for JavaScript, Unity, Unreal, Godot.

### Seed / Seeder

Share downloaded files with others via BitTorrent. GRID operators are seeders earning LYTH rewards.

### SeederRewards

Smart contract managing GRID node reward calculation and distribution.

### Security Scan

Automated malware and vulnerability analysis performed on all game submissions before approval.

### Smart Contract

Self-executing code on blockchain. MonoPlay uses contracts for licenses, rewards, game registry, etc.

### Sprintnet

Monolythium testnet for development and testing. Free test LYTH available from faucet.

### SubmissionFees

Smart contract handling publisher deposits and per-game submission fees.

## T

### Testnet

Blockchain network for testing without real funds. MonoPlay testnet: Sprintnet.

### Torrent

Peer-to-peer file sharing protocol. GRID uses torrent technology with blockchain integration.

### Transaction

Blockchain operation (purchase, transfer, claim). Recorded immutably and viewable on Monoscan.

## U

### Uptime

Percentage of time GRID node is online and accessible. Higher uptime = higher rewards.

## V

### Verification

Process confirming publisher identity and legitimacy during registration. Required to submit games.

## W

### Wallet

Software or hardware storing private keys for blockchain transactions. Examples: MetaMask, Ledger.

### Wallet Address

Public identifier for blockchain account (e.g., 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb). Used for receiving licenses and payments.

### Webhook

HTTP callback delivering real-time event notifications. Publishers configure webhooks for license purchases, reviews, etc.

## Y

### YARA

Pattern-matching tool for malware detection. MonoPlay security scanner uses YARA rules.

---

## Need More Definitions?

Suggest additions:

- **Discord**: #documentation channel
- **GitHub**: [Docs repository issues](https://github.com/monoplay/docs/issues)
- **Email**: docs@monoplay.xyz

## Related Documentation

- [FAQ](./faq.md) - Common questions
- [Smart Contracts](../developers/smart-contracts.md) - Technical contract details
- [GRID Overview](../grid/overview.md) - GRID network concepts
- [Publishing Overview](../publishing/overview.md) - Publisher terminology
