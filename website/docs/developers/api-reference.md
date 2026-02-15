---
sidebar_position: 3
---

# API Reference

MonoPlay REST API provides programmatic access to catalog, licenses, releases, and publisher data. All endpoints return JSON.

## Base URL

```
https://api.monoplay.xyz
```

## Authentication

### Public Endpoints

No authentication required. Rate limited to 100 requests/hour.

**Example:**

```bash
curl https://api.monoplay.xyz/api/catalog
```

### Authenticated Endpoints

Requires EIP-191 signature-based authentication.

**Headers:**

```
Authorization: Bearer <signature>
X-Wallet-Address: <your_wallet_address>
X-Message: <signed_message>
X-Timestamp: <unix_timestamp>
```

**Authentication Flow:**

1. Generate message: `MonoPlay Auth ${timestamp}`
2. Sign with wallet (EIP-191)
3. Send signature, wallet address, message, and timestamp in headers

**JavaScript Example:**

```javascript
const ethers = require('ethers');

async function getAuthHeaders(wallet) {
 const timestamp = Math.floor(Date.now() / 1000);
 const message = `MonoPlay Auth ${timestamp}`;
 const signature = await wallet.signMessage(message);

 return {
 'Authorization': `Bearer ${signature}`,
 'X-Wallet-Address': wallet.address,
 'X-Message': message,
 'X-Timestamp': timestamp.toString()
 };
}

// Usage
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const headers = await getAuthHeaders(signer);

fetch('https://api.monoplay.xyz/api/licenses/my-licenses', { headers });
```

## Rate Limits

| Tier | Rate Limit | Authentication |
|------|------------|----------------|
| **Public** | 100 req/hour | None |
| **Publisher** | 1,000 req/hour | EIP-191 |
| **Partner** | 10,000 req/hour | Contact us |

**Rate limit headers:**

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1644876543
```

**Exceed limit:**

```json
{
 "error": "Rate limit exceeded",
 "reset_at": 1644876543
}
```

## Catalog Endpoints

### GET /api/catalog

Retrieve all games in the catalog.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `genre` | string | Filter by genre (action, rpg, puzzle, etc.) |
| `platform` | string | Filter by platform (windows, macos, linux) |
| `sort` | string | Sort order (popular, recent, rating, price) |
| `limit` | integer | Results per page (default: 20, max: 100) |
| `offset` | integer | Pagination offset (default: 0) |

**Example Request:**

```bash
curl "https://api.monoplay.xyz/api/catalog?genre=action&sort=popular&limit=10"
```

**Response:**

```json
{
 "games": [
 {
 "id": "monolands-v2",
 "title": "MonoLands v2",
 "publisher": "MonoPlay Studios",
 "publisher_address": "0x366d8135D7413C09564044D345A245771c9BaC5B",
 "short_description": "Explore 48 unique planets in this space exploration game",
 "genres": ["adventure", "exploration"],
 "platforms": ["windows", "macos", "linux"],
 "price_lyth": 25.0,
 "rating": 4.8,
 "total_downloads": 1247,
 "release_date": "2026-02-01T00:00:00Z",
 "logo_url": "https://cdn.monoplay.xyz/games/monolands-v2/logo.png",
 "header_url": "https://cdn.monoplay.xyz/games/monolands-v2/header.png"
 }
 ],
 "total": 156,
 "limit": 10,
 "offset": 0
}
```

### GET /api/catalog/:gameId

Get detailed information about a specific game.

**Example Request:**

```bash
curl https://api.monoplay.xyz/api/catalog/monolands-v2
```

**Response:**

```json
{
 "id": "monolands-v2",
 "title": "MonoLands v2",
 "publisher": "MonoPlay Studios",
 "publisher_address": "0x366d8135D7413C09564044D345A245771c9BaC5B",
 "short_description": "Explore 48 unique planets...",
 "full_description": "# MonoLands v2\n\nExplore vast procedurally...",
 "genres": ["adventure", "exploration"],
 "tags": ["space", "procedural", "multiplayer"],
 "platforms": ["windows", "macos", "linux"],
 "price_lyth": 25.0,
 "rating": 4.8,
 "total_reviews": 87,
 "total_downloads": 1247,
 "release_date": "2026-02-01T00:00:00Z",
 "latest_version": "1.0.0",
 "age_rating": "E",
 "content_descriptors": ["fantasy_violence"],
 "logo_url": "https://cdn.monoplay.xyz/games/monolands-v2/logo.png",
 "header_url": "https://cdn.monoplay.xyz/games/monolands-v2/header.png",
 "screenshots": [
 "https://cdn.monoplay.xyz/games/monolands-v2/screenshot1.png",
 "https://cdn.monoplay.xyz/games/monolands-v2/screenshot2.png"
 ],
 "system_requirements": {
 "windows": {
 "minimum": {
 "os": "Windows 10 1809+",
 "cpu": "Intel Core i3 / AMD Ryzen 3",
 "ram_gb": 4,
 "gpu": "GTX 1050 / RX 560",
 "storage_gb": 5
 },
 "recommended": {
 "os": "Windows 11",
 "cpu": "Intel Core i5 / AMD Ryzen 5",
 "ram_gb": 8,
 "gpu": "RTX 3060 / RX 6600",
 "storage_gb": 5
 }
 }
 }
}
```

## License Endpoints

### GET /api/licenses/:gameId/check

Check if a wallet owns a license for a game.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wallet` | string | Yes | Wallet address to check |

**Example Request:**

```bash
curl "https://api.monoplay.xyz/api/licenses/monolands-v2/check?wallet=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
```

**Response:**

```json
{
 "has_license": true,
 "license_id": 12345,
 "purchased_at": "2026-02-10T14:23:11Z",
 "license_type": "single_user"
}
```

### GET /api/licenses/my-licenses

Get all licenses owned by authenticated wallet.

**Authentication**: Required

**Example Request:**

```bash
curl -H "Authorization: Bearer <signature>" \
 -H "X-Wallet-Address: <wallet>" \
 -H "X-Message: <message>" \
 -H "X-Timestamp: <timestamp>" \
 https://api.monoplay.xyz/api/licenses/my-licenses
```

**Response:**

```json
{
 "licenses": [
 {
 "license_id": 12345,
 "game_id": "monolands-v2",
 "game_title": "MonoLands v2",
 "license_type": "single_user",
 "purchased_at": "2026-02-10T14:23:11Z",
 "price_paid_lyth": 25.0,
 "tx_hash": "0xabc123..."
 }
 ],
 "total": 5
}
```

## Release Endpoints

### GET /api/releases/:gameId

Get all releases for a game.

**Example Request:**

```bash
curl https://api.monoplay.xyz/api/releases/monolands-v2
```

**Response:**

```json
{
 "releases": [
 {
 "version": "1.0.0",
 "release_date": "2026-02-01T00:00:00Z",
 "release_notes": "Initial release\n- 48 unique planets\n- Multiplayer support\n- Mod support",
 "platforms": ["windows", "macos", "linux"],
 "status": "live"
 },
 {
 "version": "1.0.1",
 "release_date": "2026-02-10T00:00:00Z",
 "release_notes": "Bug fixes and performance improvements",
 "platforms": ["windows", "macos", "linux"],
 "status": "live"
 }
 ]
}
```

### GET /api/releases/:gameId/latest

Get latest release for a game.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `platform` | string | Filter by platform (windows, macos, linux) |

**Example Request:**

```bash
curl "https://api.monoplay.xyz/api/releases/monolands-v2/latest?platform=windows"
```

**Response:**

```json
{
 "version": "1.0.1",
 "release_date": "2026-02-10T00:00:00Z",
 "release_notes": "Bug fixes and performance improvements",
 "platform": "windows",
 "download_url": "magnet:?xt=urn:btih:...",
 "file_size_bytes": 4294967296,
 "checksum_sha256": "abc123...",
 "status": "live"
}
```

**Note**: `download_url` is a magnet link for GRID network download.

## Publisher Endpoints

### GET /api/publishers/:publisherAddress

Get publisher profile and published games.

**Example Request:**

```bash
curl https://api.monoplay.xyz/api/publishers/0x366d8135D7413C09564044D345A245771c9BaC5B
```

**Response:**

```json
{
 "address": "0x366d8135D7413C09564044D345A245771c9BaC5B",
 "display_name": "MonoPlay Studios",
 "bio": "Creating innovative blockchain games",
 "website": "https://monoplay.xyz",
 "social_links": {
 "twitter": "https://twitter.com/monoplay",
 "discord": "https://discord.gg/monoplay"
 },
 "verified": true,
 "member_since": "2025-12-01T00:00:00Z",
 "total_games": 3,
 "total_downloads": 5421,
 "average_rating": 4.7,
 "games": [
 {
 "id": "monolands-v2",
 "title": "MonoLands v2",
 "rating": 4.8,
 "downloads": 1247
 }
 ]
}
```

### GET /api/publishers/my-profile

Get authenticated publisher's own profile.

**Authentication**: Required

**Example Request:**

```bash
curl -H "Authorization: Bearer <signature>" \
 -H "X-Wallet-Address: <wallet>" \
 -H "X-Message: <message>" \
 -H "X-Timestamp: <timestamp>" \
 https://api.monoplay.xyz/api/publishers/my-profile
```

**Response:**

```json
{
 "address": "0x366d8135D7413C09564044D345A245771c9BaC5B",
 "display_name": "MonoPlay Studios",
 "email": "contact@monoplay.xyz",
 "verified": true,
 "verification_expires": "2027-01-15T00:00:00Z",
 "total_revenue_lyth": 85432.5,
 "claimable_revenue_lyth": 127.3,
 "games": [
 {
 "id": "monolands-v2",
 "status": "live",
 "revenue_lyth": 31175.0
 }
 ]
}
```

## Analytics Endpoints

### GET /api/analytics/:gameId/downloads

Get download statistics for a game.

**Authentication**: Required (publisher only)

**Parameters:**

| Parameter | Type | Description |
|-----------|------|----------|
| `period` | string | Time period (7d, 30d, 90d, all) |
| `group_by` | string | Group by (day, week, month) |

**Example Request:**

```bash
curl -H "Authorization: Bearer <signature>" \
 https://api.monoplay.xyz/api/analytics/monolands-v2/downloads?period=30d&group_by=day
```

**Response:**

```json
{
 "period": "30d",
 "total_downloads": 1247,
 "data": [
 {
 "date": "2026-02-01",
 "downloads": 142
 },
 {
 "date": "2026-02-02",
 "downloads": 87
 }
 ]
}
```

## Search Endpoint

### GET /api/search

Search games by title, publisher, or tags.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query |
| `limit` | integer | No | Results limit (default: 20) |

**Example Request:**

```bash
curl "https://api.monoplay.xyz/api/search?q=space"
```

**Response:**

```json
{
 "results": [
 {
 "id": "monolands-v2",
 "title": "MonoLands v2",
 "publisher": "MonoPlay Studios",
 "score": 0.95
 }
 ],
 "total": 12
}
```

## Error Responses

### Standard Error Format

```json
{
 "error": "Error message",
 "code": "ERROR_CODE",
 "details": {}
}
```

### Common Errors

**400 Bad Request:**

```json
{
 "error": "Invalid parameter",
 "code": "INVALID_PARAMETER",
 "details": {
 "parameter": "genre",
 "message": "Invalid genre value"
 }
}
```

**401 Unauthorized:**

```json
{
 "error": "Authentication required",
 "code": "UNAUTHORIZED"
}
```

**403 Forbidden:**

```json
{
 "error": "Insufficient permissions",
 "code": "FORBIDDEN",
 "details": {
 "required_role": "publisher"
 }
}
```

**404 Not Found:**

```json
{
 "error": "Game not found",
 "code": "NOT_FOUND",
 "details": {
 "game_id": "nonexistent-game"
 }
}
```

**429 Rate Limit:**

```json
{
 "error": "Rate limit exceeded",
 "code": "RATE_LIMIT_EXCEEDED",
 "details": {
 "reset_at": 1644876543
 }
}
```

## SDK Examples

### JavaScript/TypeScript

```typescript
import { MonoPlayAPI } from '@monoplay/sdk';

const api = new MonoPlayAPI();

// Get catalog
const games = await api.catalog.list({ genre: 'action', limit: 10 });

// Get game details
const game = await api.catalog.get('monolands-v2');

// Check license (with wallet)
const hasLicense = await api.licenses.check('monolands-v2', walletAddress);

// Authenticated request
const api = new MonoPlayAPI({ signer: ethersWallet });
const myLicenses = await api.licenses.myLicenses();
```

### Python

```python
from monoplay import MonoPlayAPI

api = MonoPlayAPI()

# Get catalog
games = api.catalog.list(genre='action', limit=10)

# Get game details
game = api.catalog.get('monolands-v2')

# Check license
has_license = api.licenses.check('monolands-v2', wallet_address)
```

## Webhooks

Subscribe to real-time events (configure in Developer Console).

### Webhook Payload

```json
{
 "event": "license.purchased",
 "timestamp": "2026-02-14T12:34:56Z",
 "data": {
 "game_id": "monolands-v2",
 "buyer": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
 "price": 25.0,
 "currency": "LYTH",
 "tx_hash": "0xabc123..."
 },
 "signature": "sha256=..."
}
```

### Verify Webhook Signature

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
 const hash = crypto
 .createHmac('sha256', secret)
 .update(JSON.stringify(payload))
 .digest('hex');

 return `sha256=${hash}` === signature;
}

// Express.js example
app.post('/webhook', (req, res) => {
 const signature = req.headers['x-monoplay-signature'];

 if (verifyWebhook(req.body, signature, WEBHOOK_SECRET)) {
 // Process event
 console.log('Event:', req.body.event);
 res.sendStatus(200);
 } else {
 res.sendStatus(401);
 }
});
```

## Next Steps

Explore more developer resources:

- [Developer Console](./dev-console.md) - Web dashboard
- [Smart Contracts](./smart-contracts.md) - On-chain integration
- [SDK Documentation](https://sdk.monoplay.xyz) - Official SDKs

Need help? Join Discord #api-support or email api-support@monoplay.xyz.
