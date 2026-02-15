---
sidebar_position: 1
---

# Developer Tools Overview

MonoPlay provides comprehensive developer tools for game publishers, integrators, and platform developers. This section covers APIs, SDKs, smart contracts, and developer resources.

## For Game Publishers

### Developer Console

Web-based publisher dashboard:

- **Game Management**: Upload, update, and manage releases
- **Submission Tracking**: Monitor security scanning and review progress
- **Analytics**: Download statistics, revenue reports, player reviews
- **Publisher Profile**: Configure public-facing publisher page

**Access**: [console.monoplay.xyz](https://console.monoplay.xyz)

**Requirements**: Verified publisher account (see [Publisher Registration](../publishing/registration.md))

See [Developer Console](./dev-console.md) for full guide.

### REST API

Programmatic access to MonoPlay platform:

- **Catalog API**: Browse games, retrieve metadata
- **License API**: Check ownership, validate licenses
- **Release API**: Manage game versions
- **Publisher API**: Update profile, view analytics

**Authentication**: EIP-191 signature-based

**Base URL**: `https://api.monoplay.xyz`

See [API Reference](./api-reference.md) for endpoints and examples.

### SDK and Libraries

**Official SDKs:**

- **JavaScript/TypeScript**: npm package for web integration
- **Unity**: Asset package for in-game integration
- **Unreal Engine**: Plugin for licensing and DRM
- **Godot**: GDScript module for MonoPlay features

**Community SDKs:**

- Python, Rust, Go (maintained by community)

**Documentation**: [github.com/monoplay/sdk](https://github.com/monoplay/sdk)

## For Platform Integrators

### Smart Contracts

On-chain contracts for blockchain integration:

- **GameRegistry**: Game registration and metadata
- **ReleaseRegistry**: Version tracking and distribution
- **LicenseRegistry**: License minting and validation
- **SeederRewards**: GRID node reward distribution
- **SubmissionFees**: Publisher deposits and game submission fees

**Network**: Monolythium Mainnet
**Language**: Solidity 0.8.24
**Verification**: All contracts verified on Monoscan

See [Smart Contracts](./smart-contracts.md) for addresses and integration.

### Indexer and GraphQL

Query MonoPlay data efficiently:

**GraphQL Endpoint**: `https://graph.monoplay.xyz`

**Example queries:**

- Games by genre
- Publisher catalog
- License ownership by wallet
- Recent releases

**Playground**: [graph.monoplay.xyz/playground](https://graph.monoplay.xyz/playground)

### Webhooks

Real-time event notifications:

- **Game published**: New game added to catalog
- **License purchased**: Player bought license
- **Update released**: New game version available

**Configuration**: Developer Console > Webhooks

**Format**: JSON POST to your endpoint

## For Infrastructure Operators

### GRID Node Software

Run seeder nodes and earn LYTH:

- **Docker Image**: `monoplay/grid:latest`
- **Raspberry Pi**: Installation script available
- **VPS Deployment**: Cloud-ready Docker Compose configs

See [GRID Overview](../grid/overview.md).

### Monitoring and Metrics

**Prometheus Metrics**: Exportable from GRID nodes

**Grafana Dashboards**: Pre-built dashboards available

**Health Checks**: HTTP endpoints for load balancers

## Developer Resources

### Documentation

- **Platform Docs**: [docs.monoplay.xyz](https://docs.monoplay.xyz)
- **API Reference**: [api.monoplay.xyz/docs](https://api.monoplay.xyz/docs)
- **SDK Docs**: [sdk.monoplay.xyz](https://sdk.monoplay.xyz)
- **Contract Docs**: [contracts.monoplay.xyz](https://contracts.monoplay.xyz)

### Code Examples

**GitHub Repositories:**

- [monoplay/examples](https://github.com/monoplay/examples) - Integration examples
- [monoplay/sdk](https://github.com/monoplay/sdk) - Official SDKs
- [monoplay/contracts](https://github.com/monoplay/contracts) - Smart contracts

### Developer Tools

**CLI Tool**: `monoplay-cli`

Install:

```bash
npm install -g monoplay-cli
```

Features:

- Upload builds from command line
- Query API programmatically
- Manage publisher profile
- Automate submissions

**Browser Extension**: Wallet integration testing

**Testnet**: Sprintnet (Monolythium testnet) for development

## Getting Started

### 1. Create Publisher Account

Register at [console.monoplay.xyz](https://console.monoplay.xyz)

See [Publisher Registration](../publishing/registration.md).

### 2. Submit Test Game

Upload a test build to familiarize yourself with the process.

See [Submission Process](../publishing/submission-process.md).

### 3. Integrate API

Use REST API or SDK to integrate MonoPlay into your tools.

See [API Reference](./api-reference.md).

### 4. Explore Smart Contracts

Read contract source and understand on-chain mechanics.

See [Smart Contracts](./smart-contracts.md).

## Use Cases

### Launcher Integration

Build custom game launchers:

- Query catalog via API
- Check license ownership on-chain
- Download games via GRID network
- Track updates and notify players

**Example**: Third-party MonoPlay launchers for Linux, SteamDeck, etc.

### Storefront Integration

List MonoPlay games in external storefronts:

- Fetch game metadata and images
- Redirect to MonoPlay for purchase
- Earn affiliate commissions (coming soon)

**Example**: Aggregator sites, game discovery platforms

### In-Game Features

Integrate MonoPlay licensing into games:

- Verify license ownership on startup
- Unlock DLC via on-chain licenses
- Reward players with LYTH
- Cross-game item ownership (NFTs)

**Example**: Games with blockchain-based item trading

### Analytics and Reporting

Build custom analytics dashboards:

- Track download statistics
- Monitor review scores
- Analyze revenue trends
- Compare performance across games

**Example**: Publisher business intelligence tools

### Automation

Automate publishing workflows:

- CI/CD pipelines for game updates
- Automated testing and submission
- Release scheduling
- Multi-platform publishing

**Example**: Studios with frequent update cycles

## API Rate Limits

**Free Tier** (no authentication):

- 100 requests/hour
- Public endpoints only
- No write access

**Publisher Tier** (EIP-191 auth):

- 1,000 requests/hour
- Full read access
- Write access to your games

**Partner Tier** (contact us):

- 10,000 requests/hour
- Bulk operations
- Priority support

**Rate limit headers:**

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1644876543
```

## Support for Developers

### Technical Support

- **Email**: developer-support@monoplay.xyz
- **Discord**: #developer-support channel
- **Office Hours**: Tuesdays 2-4pm UTC (Discord voice)

### Bug Reports

- **GitHub Issues**: [github.com/monoplay/platform/issues](https://github.com/monoplay/platform/issues)
- **Security**: security@monoplay.xyz (please report responsibly)

### Feature Requests

- **GitHub Discussions**: [github.com/monoplay/platform/discussions](https://github.com/monoplay/platform/discussions)
- **Developer Forum**: [forum.monoplay.xyz/developers](https://forum.monoplay.xyz/developers)

### Documentation Feedback

Found an error in docs? Submit PR or issue:

- **Docs Repo**: [github.com/monoplay/docs](https://github.com/monoplay/docs)

## Developer Community

### Discord

Join #developers channel:

- Ask technical questions
- Share integration examples
- Collaborate with other devs
- Get early access to new features

### Developer Forum

[forum.monoplay.xyz/developers](https://forum.monoplay.xyz/developers)

- Long-form technical discussions
- Integration showcases
- Best practices

### Newsletter

Developer newsletter (monthly):

- API updates and changes
- New SDK releases
- Platform announcements
- Technical deep dives

**Subscribe**: [monoplay.xyz/dev-newsletter](https://monoplay.xyz/dev-newsletter)

## Contributing

### Open Source Contributions

MonoPlay welcomes contributions:

- **Dashboard**: React/Next.js
- **SDKs**: TypeScript, Unity, Unreal
- **Documentation**: Docusaurus
- **GRID**: Go, Docker

See [CONTRIBUTING.md](https://github.com/monoplay/platform/blob/main/CONTRIBUTING.md).

### Bug Bounties

Security researchers: Responsible disclosure rewarded.

**Scope**: Smart contracts, API, GRID software

**Rewards**: $100-10,000 USD depending on severity

**Program**: [monoplay.xyz/security](https://monoplay.xyz/security)

## Next Steps

Ready to build? Explore:

- [Developer Console](./dev-console.md) - Publisher dashboard
- [API Reference](./api-reference.md) - REST API documentation
- [Smart Contracts](./smart-contracts.md) - On-chain integration

Have questions? Ask in Discord #developers channel.
