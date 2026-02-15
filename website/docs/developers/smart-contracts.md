---
sidebar_position: 4
---

# Smart Contracts

MonoPlay's core functionality is implemented via smart contracts on the Monolythium blockchain. This reference covers contract addresses, key functions, and integration examples.

## Contract Addresses

### Monolythium Mainnet

| Contract | Address | Purpose |
|----------|---------|---------|
| **GameRegistry** | `0x1234...` | Game registration and metadata |
| **ReleaseRegistry** | `0x2345...` | Version tracking and distribution |
| **LicenseRegistry** | `0x3456...` | License NFTs and ownership |
| **SeederRewards** | `0x4567...` | GRID node reward distribution |
| **SubmissionFees** | `0x5678...` | Publisher deposits and fees |
| **ProAccessRouter** | `0x6789...` | Advanced features and subscriptions |

**Verification**: All contracts verified on [Monoscan](https://monoscan.xyz/sprintnet)

**Source Code**: [github.com/monoplay/contracts](https://github.com/monoplay/contracts)

### Sprintnet Testnet

Use testnet for development and testing:

| Contract | Address |
|----------|---------|
| **GameRegistry** | `0xABCD...` |
| **ReleaseRegistry** | `0xBCDE...` |
| **LicenseRegistry** | `0xCDEF...` |

**Faucet**: [faucet.monoplay.xyz](https://faucet.monoplay.xyz) - Get test LYTH

## GameRegistry Contract

Manages game registration and metadata.

### Key Functions

#### registerGame

Register a new game on-chain.

```solidity
function registerGame(
 string memory gameId,
 string memory title,
 address publisher,
 string memory metadataURI
) external returns (uint256 gameIndex)
```

**Parameters:**

- `gameId`: Unique identifier (slug format: "monolands-v2")
- `title`: Game title
- `publisher`: Publisher wallet address
- `metadataURI`: IPFS URI with full metadata

**Access**: MonoPlay platform only (via signature verification)

**JavaScript Example:**

```javascript
const { ethers } = require('ethers');

const gameRegistry = new ethers.Contract(
 GAME_REGISTRY_ADDRESS,
 GAME_REGISTRY_ABI,
 signer
);

const tx = await gameRegistry.registerGame(
 'my-awesome-game',
 'My Awesome Game',
 publisherAddress,
 'ipfs://QmX...'
);

await tx.wait();
console.log('Game registered!');
```

#### getGameInfo

Retrieve game metadata.

```solidity
function getGameInfo(string memory gameId)
 external
 view
 returns (
 string memory title,
 address publisher,
 uint256 registeredAt,
 string memory metadataURI,
 bool active
 )
```

**Example:**

```javascript
const info = await gameRegistry.getGameInfo('monolands-v2');
console.log('Title:', info.title);
console.log('Publisher:', info.publisher);
console.log('Active:', info.active);
```

#### updateMetadata

Update game metadata URI.

```solidity
function updateMetadata(string memory gameId, string memory newMetadataURI)
 external
```

**Access**: Publisher only

#### delistGame

Delist game from platform.

```solidity
function delistGame(string memory gameId) external
```

**Access**: Publisher or MonoPlay admin

**Note**: Existing licenses remain valid; only prevents new sales.

## ReleaseRegistry Contract

Tracks game versions and distribution.

### Key Functions

#### registerRelease

Register a new game version.

```solidity
function registerRelease(
 string memory gameId,
 string memory version,
 string memory platform,
 bytes32 magnetHash,
 uint256 fileSizeBytes,
 string memory releaseNotesURI
) external
```

**Parameters:**

- `gameId`: Game identifier
- `version`: Semantic version (e.g., "1.0.0")
- `platform`: "windows", "macos", or "linux"
- `magnetHash`: Keccak256 hash of magnet link
- `fileSizeBytes`: Build file size
- `releaseNotesURI`: IPFS URI with release notes

**Access**: MonoPlay platform only

#### getLatestRelease

Get latest release for a platform.

```solidity
function getLatestRelease(string memory gameId, string memory platform)
 external
 view
 returns (
 string memory version,
 bytes32 magnetHash,
 uint256 fileSizeBytes,
 uint256 releasedAt
 )
```

**Example:**

```javascript
const release = await releaseRegistry.getLatestRelease('monolands-v2', 'windows');
console.log('Latest version:', release.version);
console.log('Released:', new Date(release.releasedAt * 1000));
```

#### verifyMagnetHash

Verify a magnet link matches registered hash.

```solidity
function verifyMagnetHash(
 string memory gameId,
 string memory version,
 string memory platform,
 string memory magnetLink
) external view returns (bool)
```

**Use case**: GRID nodes verify they're seeding legitimate builds.

## LicenseRegistry Contract

ERC-721 NFT contract for game licenses.

### Key Functions

#### mintLicense

Mint license NFT to buyer.

```solidity
function mintLicense(
 address to,
 string memory gameId,
 uint8 licenseType
) external returns (uint256 tokenId)
```

**License Types:**

- `0`: Single-user (1 device)
- `1`: Multi-user (5 devices)
- `2`: Commercial (content creators)

**Access**: MonoPlay platform only (after payment verification)

#### ownsLicense

Check if address owns license for a game.

```solidity
function ownsLicense(address owner, string memory gameId)
 external
 view
 returns (bool)
```

**Example:**

```javascript
const hasLicense = await licenseRegistry.ownsLicense(
 userAddress,
 'monolands-v2'
);

if (hasLicense) {
 console.log('User owns license, allow download');
} else {
 console.log('No license found, redirect to purchase');
}
```

#### getLicenseDetails

Get license metadata.

```solidity
function getLicenseDetails(uint256 tokenId)
 external
 view
 returns (
 string memory gameId,
 address owner,
 uint8 licenseType,
 uint256 mintedAt
 )
```

#### transferLicense

Transfer license to another wallet (standard ERC-721 transfer).

```solidity
function transferFrom(address from, address to, uint256 tokenId) external
```

**Note**: Licenses are tradeable NFTs.

## SeederRewards Contract

Manages GRID node rewards.

### Key Functions

#### reportBandwidth

Submit bandwidth proof (GRID nodes call this).

```solidity
function reportBandwidth(
 uint256 epoch,
 uint256 bytesUploaded,
 bytes calldata proof
) external
```

**Access**: Registered GRID nodes only

**Proof**: Cryptographically signed bandwidth attestation

#### claimRewards

Claim accrued rewards.

```solidity
function claimRewards(uint256[] calldata epochs) external
```

**Example:**

```javascript
const epochs = [123, 124, 125]; // Claim epochs 123-125
const tx = await seederRewards.claimRewards(epochs);
await tx.wait();

console.log('Rewards claimed!');
```

#### getNodeRewards

Check pending rewards for a node.

```solidity
function getNodeRewards(address nodeOperator, uint256 epoch)
 external
 view
 returns (uint256 rewardAmount)
```

**Example:**

```javascript
const currentEpoch = await seederRewards.currentEpoch();
const rewards = await seederRewards.getNodeRewards(nodeAddress, currentEpoch);

console.log('Pending rewards:', ethers.utils.formatUnits(rewards, 18), 'LYTH');
```

## SubmissionFees Contract

Handles publisher deposits and submission fees.

### Key Functions

#### submitDeposit

Publisher deposits LYTH for registration.

```solidity
function submitDeposit() external payable
```

**Amount**: 500 LYTH (configurable by governance)

**Example:**

```javascript
const depositAmount = ethers.utils.parseUnits('500', 18);
const tx = await submissionFees.submitDeposit({ value: depositAmount });
await tx.wait();
```

#### paySubmissionFee

Pay fee for game submission.

```solidity
function paySubmissionFee(string memory gameId) external payable
```

**Amount**: 100 LYTH per submission

#### refundDeposit

Request deposit refund (if leaving platform).

```solidity
function refundDeposit() external
```

**Requirements:**

- No active games
- No pending submissions
- 7-day waiting period

#### getDepositStatus

Check deposit status.

```solidity
function getDepositStatus(address publisher)
 external
 view
 returns (
 uint256 depositAmount,
 uint256 depositedAt,
 bool canRefund
 )
```

## Integration Examples

### Check License Before Download

```javascript
const { ethers } = require('ethers');

async function canUserDownload(userAddress, gameId) {
 const licenseRegistry = new ethers.Contract(
 LICENSE_REGISTRY_ADDRESS,
 LICENSE_REGISTRY_ABI,
 provider
 );

 return await licenseRegistry.ownsLicense(userAddress, gameId);
}

// Usage
if (await canUserDownload('0x742d35Cc...', 'monolands-v2')) {
 // Provide download link
} else {
 // Redirect to purchase page
}
```

### Verify Game Authenticity

```javascript
async function verifyGameBuild(gameId, version, platform, magnetLink) {
 const releaseRegistry = new ethers.Contract(
 RELEASE_REGISTRY_ADDRESS,
 RELEASE_REGISTRY_ABI,
 provider
 );

 return await releaseRegistry.verifyMagnetHash(
 gameId,
 version,
 platform,
 magnetLink
 );
}

// Usage
const isLegit = await verifyGameBuild(
 'monolands-v2',
 '1.0.0',
 'windows',
 'magnet:?xt=urn:btih:...'
);

if (isLegit) {
 console.log(' Verified official build');
} else {
 console.log(' Unverified build, possibly pirated');
}
```

### Query Publisher Games

```javascript
async function getPublisherGames(publisherAddress) {
 const gameRegistry = new ethers.Contract(
 GAME_REGISTRY_ADDRESS,
 GAME_REGISTRY_ABI,
 provider
 );

 // Get total games
 const totalGames = await gameRegistry.getPublisherGameCount(publisherAddress);

 // Fetch each game
 const games = [];
 for (let i = 0; i < totalGames; i++) {
 const gameId = await gameRegistry.getPublisherGameAt(publisherAddress, i);
 const info = await gameRegistry.getGameInfo(gameId);
 games.push({ gameId, ...info });
 }

 return games;
}
```

### Monitor License Transfers

```javascript
const licenseRegistry = new ethers.Contract(
 LICENSE_REGISTRY_ADDRESS,
 LICENSE_REGISTRY_ABI,
 provider
);

// Listen for transfers
licenseRegistry.on('Transfer', (from, to, tokenId) => {
 console.log(`License ${tokenId} transferred from ${from} to ${to}`);
});

// Get historical transfers
const filter = licenseRegistry.filters.Transfer(null, null, null);
const events = await licenseRegistry.queryFilter(filter, fromBlock, toBlock);

events.forEach(event => {
 console.log('Transfer:', event.args);
});
```

## Contract ABIs

Full ABIs available:

- **NPM Package**: `@monoplay/contracts`
- **GitHub**: [github.com/monoplay/contracts/abis](https://github.com/monoplay/contracts/tree/main/abis)
- **Monoscan**: Download from verified contract pages

**Install:**

```bash
npm install @monoplay/contracts
```

**Import:**

```javascript
const { GameRegistryABI, LicenseRegistryABI } = require('@monoplay/contracts');
```

## Events

Key events emitted by contracts:

### GameRegistry Events

```solidity
event GameRegistered(string indexed gameId, address indexed publisher, uint256 timestamp);
event GameUpdated(string indexed gameId, string newMetadataURI);
event GameDelisted(string indexed gameId, address indexed delister);
```

### LicenseRegistry Events

```solidity
event LicenseMinted(uint256 indexed tokenId, address indexed owner, string gameId, uint8 licenseType);
event Transfer(address indexed from, address indexed to, uint256 indexed tokenId); // ERC-721 standard
```

### SeederRewards Events

```solidity
event BandwidthReported(address indexed node, uint256 indexed epoch, uint256 bytes);
event RewardsClaimed(address indexed node, uint256[] epochs, uint256 totalAmount);
event EpochFinalized(uint256 indexed epoch, uint256 totalRewards);
```

## Security Considerations

### Access Control

Most write functions restricted:

- **Publisher-only**: Update metadata, delist own games
- **Platform-only**: Register games, mint licenses, finalize epochs
- **Node-only**: Report bandwidth

**Verify caller** in your integrations.

### Reentrancy Protection

All fund-transfer functions use:

- OpenZeppelin ReentrancyGuard
- Checks-Effects-Interactions pattern

### License Validation

Always check license ownership on-chain before granting access:

```javascript
// Good: Verify on-chain
const hasLicense = await licenseRegistry.ownsLicense(user, gameId);

// Bad: Trust API response only
const apiResponse = await fetch('/api/check-license');
```

APIs can be spoofed; blockchain cannot.

## Gas Optimization

### Batch Operations

Claim multiple epochs in one transaction:

```javascript
// Efficient: Batch claim
await seederRewards.claimRewards([120, 121, 122, 123]);

// Wasteful: Multiple transactions
for (let epoch of [120, 121, 122, 123]) {
 await seederRewards.claimRewards([epoch]);
}
```

### View Functions

Use `view`/`pure` functions for reads (no gas cost):

```javascript
// No gas required
const info = await gameRegistry.getGameInfo('monolands-v2');
const hasLicense = await licenseRegistry.ownsLicense(user, gameId);
```

## Upgradeability

**Current contracts**: Non-upgradeable (immutable logic)

**Metadata**: Upgradeable via `updateMetadata` function

**Future**: Proxy pattern may be introduced for new features (governance-controlled)

## Governance

Contract parameters controlled by MonoPlay governance:

- Submission fees
- Deposit amounts
- Reward distribution formulas
- Platform fees

**Governance**: Multi-sig wallet (5-of-9) with 48-hour timelock

## Testing

### Local Development

```bash
# Clone contracts repo
git clone https://github.com/monoplay/contracts
cd contracts

# Install dependencies
npm install

# Run tests
npx hardhat test

# Deploy to local network
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

### Testnet Deployment

Use Sprintnet testnet for integration testing:

```javascript
const provider = new ethers.providers.JsonRpcProvider(
 'https://rpc.sprintnet.monoplay.xyz'
);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Interact with testnet contracts
const gameRegistry = new ethers.Contract(
 TESTNET_GAME_REGISTRY,
 ABI,
 signer
);
```

## Support

Need help with smart contract integration?

- **Discord**: #smart-contracts channel
- **Email**: contracts@monoplay.xyz
- **Docs**: [contracts.monoplay.xyz](https://contracts.monoplay.xyz)

## Next Steps

Explore more developer resources:

- [API Reference](./api-reference.md) - REST API integration
- [Developer Console](./dev-console.md) - Web dashboard
- [SDK Documentation](https://sdk.monoplay.xyz) - Official SDKs

Security researchers: Report vulnerabilities to security@monoplay.xyz for bounty rewards.
