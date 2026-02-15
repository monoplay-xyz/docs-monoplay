---
sidebar_position: 3
---

# Frequently Asked Questions

Common questions about MonoPlay, organized by topic.

## General Platform

### What is MonoPlay?

MonoPlay is a decentralized game distribution platform built on the Monolythium blockchain. Publishers submit games, security scanners verify safety, and games are distributed via a peer-to-peer network (GRID). Players purchase licenses as on-chain NFTs and download games directly from the network.

### How is MonoPlay different from Steam or Epic Games Store?

**Decentralization**: Games distributed via peer-to-peer GRID network, not centralized servers.

**Blockchain**: Licenses are NFTs, enabling true ownership and resale.

**Security**: All games scanned for malware before distribution.

**Revenue**: Publishers keep 90% (vs 70% on Steam), 10% to platform and GRID operators.

**Censorship resistance**: No single entity can delist games arbitrarily.

### Do I need cryptocurrency to use MonoPlay?

Yes, to purchase games. You'll need LYTH (Monolythium's native token) in a compatible wallet.

**For playing**: LYTH required to buy licenses.

**For free games**: Just a wallet (no LYTH needed).

**For browsing**: No wallet needed to browse catalog.

### What wallet do I need?

Any Monolythium-compatible wallet:

- **MetaMask**: Add Monolythium network manually
- **Rabby**: Auto-detects Monolythium
- **WalletConnect**: Mobile wallets

See wallet setup guide: [monoplay.xyz/wallet-setup](https://monoplay.xyz/wallet-setup)

### Where do I get LYTH?

**Exchanges**:

- MonoHub (Monolythium DEX)
- Centralized exchanges (list growing)

**Bridges**:

- Bridge from Ethereum, BSC, or other chains
- [bridge.monoplay.xyz](https://bridge.monoplay.xyz)

**Faucet** (testnet only):

- [faucet.monoplay.xyz](https://faucet.monoplay.xyz)

### Is my payment information stored?

No payment information is stored. All transactions are blockchain-based:

- Connect wallet
- Approve transaction
- Payment processed on-chain
- No credit card or personal data stored

## Games and Licensing

### How do I buy a game?

1. Browse catalog at [monoplay.xyz](https://monoplay.xyz)
2. Click game you want
3. Click "Purchase License"
4. Connect wallet
5. Approve transaction
6. License NFT minted to your wallet
7. Download via MonoPlay Launcher

### Can I resell games I own?

Yes! Licenses are NFTs, fully tradeable:

- List on NFT marketplaces
- Transfer to another wallet
- Sell peer-to-peer

**Note**: Publishers can set royalties on secondary sales (typically 5-10%).

### Can I refund a game?

Blockchain transactions are irreversible. However:

- **Broken games**: Report to support for case-by-case review
- **Fraudulent listings**: Full refund if game delisted for fraud
- **Wrong purchase**: No automatic refunds (verify before buying)

**Recommendation**: Check reviews and screenshots before purchasing.

### Do I own the game or just a license?

You own an NFT license granting you the right to download and play the game. Similar to traditional licenses but:

- **Tradeable**: Can resell or gift
- **Permanent**: Can't be revoked (unless fraud)
- **Verifiable**: Ownership provable on blockchain

### Can multiple people use one license?

Depends on license type:

- **Single-user**: One person, one device at a time
- **Multi-user**: One household, up to 5 devices
- **Commercial**: Content creators, streaming allowed

Most games default to single-user.

### What happens if a game is delisted?

**Your license remains valid.** You can:

- Re-download the game anytime
- Play indefinitely
- Transfer your license to others

GRID continues seeding delisted games for existing license holders.

### Are games DRM-free?

Varies by publisher:

- Some games are DRM-free after download
- Others require online license verification
- Game page indicates DRM status

MonoPlay doesn't mandate DRM; publisher's choice.

## Downloads and Performance

### How do I download games?

Via **MonoPlay Launcher** (available for Windows, macOS, Linux):

1. Install launcher
2. Log in with wallet
3. Navigate to Library (shows owned licenses)
4. Click "Install" on game
5. Game downloads from GRID network
6. Play!

### How fast are downloads?

Speed depends on:

- Your internet connection
- Number of GRID seeders
- Geographic location
- Time of day

**Typical speeds**: 10-50 MB/s on 100 Mbps connection.

**Comparison**: Similar to Steam or Epic in most cases.

### Can I play while downloading?

Some games support this (if files are downloaded sequentially). Check game page for "Play while downloading" badge.

### What if download fails?

Launcher automatically resumes interrupted downloads. If persistent issues:

1. Check internet connection
2. Verify sufficient disk space
3. Restart launcher
4. Contact support

### Can I move games between PCs?

Yes:

- **Backup**: Copy game folder, restore on new PC
- **Re-download**: Free for license owners
- **Cloud saves**: Coming soon (select games)

## GRID Network

### What is GRID?

GRID (Good Reasonable Infrastructure Device) is the peer-to-peer network that distributes games. Operators run nodes and earn LYTH rewards for seeding games to players.

See [GRID Overview](../grid/overview.md).

### Is GRID just BitTorrent?

Based on BitTorrent but with key differences:

- **Licensed content only**: No piracy
- **Blockchain incentives**: Earn LYTH for seeding
- **Security**: All content scanned before distribution
- **Smart tracker**: Verifies licenses on-chain

### Why not use centralized CDN?

**Decentralization benefits**:

- No single point of failure
- Censorship resistance
- Lower platform costs (passed to publishers)
- Community-owned infrastructure

**Economic benefits**:

- Rewards node operators
- Reduces publisher hosting costs

### How are GRID operators paid?

Weekly rewards based on:

- Bandwidth contributed
- Uptime
- Content popularity
- Geographic location

See [GRID Rewards](../grid/rewards.md).

### Can I run a GRID node?

Yes! Requirements:

- Computer or Raspberry Pi
- 100 GB+ storage
- 50+ Mbps upload speed
- Monolythium wallet

See [GRID Getting Started](../grid/getting-started.md).

## Publishing

### How do I publish a game on MonoPlay?

1. Register as publisher (requires verification and 500 LYTH deposit)
2. Submit game via Developer Console
3. Game undergoes security scanning
4. Manual review for content compliance
5. If approved, game is code-signed and distributed

See [Publishing Overview](../publishing/overview.md).

### How much does it cost to publish?

**Publisher registration**: 500 LYTH deposit (refundable if leaving platform)

**Per-game submission**: 100 LYTH (non-refundable)

**Revenue share**: Publisher keeps 90%, platform takes 10%.

### What games are prohibited?

- Malware or viruses
- Pirated or cracked software
- Illegal content (CSAM, terrorism, etc.)
- Unregistered gambling
- Content violating copyright

See [Content Guidelines](../publishing/content-guidelines.md).

### How long does approval take?

**Security scan**: 15-30 minutes (automated)

**Manual review**: 2-5 business days (depends on game size)

**Code signing**: 5-10 minutes (automated)

**Total**: Typically 2-5 days from submission to live.

### Can I update my game?

Yes, submit new versions via Developer Console. Updates follow same security scan process (faster review for minor updates).

## Security and Safety

### How do I know games are safe?

Every game undergoes:

1. **Automated security scanning**: Malware, viruses, wallet theft detection
2. **Manual review**: Content policy compliance
3. **Code signing**: MonoPlay signature verifies authenticity
4. **Community reviews**: Player feedback and ratings

No guarantees, but significantly safer than unverified sources.

### What if I download a malicious game?

Report immediately:

- **Email**: security@monoplay.xyz
- **Discord**: #security-reports

**Actions taken**:

- Game delisted immediately
- Publisher banned
- Full refunds issued
- Security scan improved to prevent similar issues

### Can my wallet be hacked through MonoPlay?

MonoPlay never asks for private keys or seed phrases. However:

**Best practices**:

- Use hardware wallet for large holdings
- Never share seed phrases
- Verify contract addresses before approving
- Use separate wallet for gaming (isolate risk)

### Is my personal data collected?

**Not collected**:

- Name, address, phone
- Payment information
- Browsing history outside MonoPlay

**Collected**:

- Wallet address (public on blockchain)
- Download statistics (anonymous)
- Game reviews (if you leave them)

See [Privacy Policy](https://monoplay.xyz/privacy).

## Technical Issues

### Launcher won't connect to my wallet

**Solutions**:

1. Verify you're on Monolythium network (not Ethereum or other chain)
2. Update wallet extension to latest version
3. Clear browser cache
4. Try different wallet (Rabby often works better)

### Game won't launch

**Common causes**:

- Missing Visual C++ Redistributables (Windows)
- Outdated graphics drivers
- Insufficient permissions
- Antivirus false positive

**Solutions**:

1. Update graphics drivers
2. Install Visual C++ Redistributable 2015-2022
3. Run launcher as administrator
4. Add game folder to antivirus exclusions

### Downloads are slow

**Check**:

1. Internet connection speed (speedtest.net)
2. Number of seeders (game page shows)
3. Background downloads (pause other apps)
4. VPN/proxy (can slow connections)

**Try**:

- Restart launcher
- Change DNS to 1.1.1.1 or 8.8.8.8
- Temporarily disable VPN

### Error: "Insufficient LYTH for gas"

You need LYTH to pay network fees (gas) even for free games:

- Get small amount from faucet or exchange
- ~0.1 LYTH sufficient for gas fees
- Gas fees very low on Monolythium (~$0.001 per transaction)

### Game crashes or performs poorly

**Not MonoPlay issue** - contact game developer:

- Check game's system requirements
- Update graphics drivers
- Lower graphics settings in-game
- Report bug to publisher

## Account and Billing

### How do I create an account?

No traditional account needed:

- Your wallet address IS your account
- Connect wallet to access purchases
- No email or password required

### I lost access to my wallet. Can I recover my games?

Unfortunately, no. Blockchain is decentralized:

- No centralized account recovery
- If you lose seed phrase, funds and licenses are gone
- **Always back up seed phrase securely**

Consider multi-sig wallet for valuable collections.

### Can I use multiple wallets?

Yes, but licenses are tied to specific wallet:

- Each wallet has its own library
- Transfer licenses between wallets (send NFT)
- Can't merge libraries (yet)

### How do I check my transaction history?

**Blockchain explorers**:

- [monoscan.xyz](https://monoscan.xyz) - Paste your wallet address
- Shows all license purchases and transfers

**MonoPlay Launcher**:

- Library tab shows purchase dates
- Click game > Details for transaction hash

### Can I gift a game to someone?

Yes, two methods:

1. **Buy for them**: Enter their wallet address during purchase
2. **Transfer license**: Buy for yourself, then transfer NFT to their wallet

## Earnings and Revenue

### How do publishers withdraw earnings?

Via Developer Console:

1. Navigate to Revenue tab
2. Click "Withdraw Revenue"
3. Approve transaction (pays gas fee)
4. LYTH sent to publisher wallet

Minimum withdrawal: 10 LYTH.

### When can I claim revenue?

Revenue claimable weekly:

- Epoch ends Sunday 23:59 UTC
- Revenue available Monday
- No maximum holding period

### Do GRID node earnings expire?

No, rewards accumulate indefinitely until claimed.

**Recommended**: Claim weekly to compound earnings.

### Are earnings taxable?

Likely yes, depending on jurisdiction:

- LYTH rewards = taxable income (in most countries)
- Consult tax professional
- Keep records of all transactions

**Not tax advice.**

## Future Features

### Roadmap highlights?

**2026 Q2**:

- Mobile apps (Android, iOS)
- Cloud saves
- Achievements system

**2026 Q3**:

- Game streaming
- Social features (friends, chat)
- Workshop (mods, community content)

**2026 Q4**:

- VR support
- Cross-platform multiplayer
- Subscriptions (Game Pass style)

See [Roadmap](https://monoplay.xyz/roadmap).

### Will there be regional pricing?

Yes, planned for Q2 2026:

- Publishers set USD price
- Automatic LYTH conversion
- Regional adjustments for purchasing power

### Game demos or trials?

Coming soon:

- Publishers can upload demo versions
- Time-limited trials
- Free weekends

## Support

### How do I get help?

**Resources**:

- **Documentation**: [docs.monoplay.xyz](https://docs.monoplay.xyz)
- **Discord**: [discord.gg/monoplay](https://discord.gg/monoplay)
- **Forum**: [forum.monoplay.xyz](https://forum.monoplay.xyz)
- **Email**: support@monoplay.xyz

### How long does support take to respond?

**Typical response times**:

- Discord: 1-4 hours (during business hours)
- Email: 24-48 hours
- Forum: 2-3 days

**Critical issues** (security, fraud): Within 2 hours.

### Can I contribute to MonoPlay?

Yes!

- **Code**: GitHub repositories accept PRs
- **Documentation**: Submit improvements
- **Community**: Help others in Discord/forum
- **Bug bounties**: Responsible disclosure rewarded

See [Contributing](https://github.com/monoplay/platform/blob/main/CONTRIBUTING.md).

## Still Have Questions?

**Ask the community**:

- Discord: #general-help
- Forum: Q&A category
- Reddit: r/MonoPlay (unofficial)

**Contact support**:

- Email: support@monoplay.xyz
- Live chat: monoplay.xyz (during business hours)
