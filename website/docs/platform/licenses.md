---
sidebar_position: 3
title: Licenses
---

# On-Chain Licenses

MonoPlay uses **on-chain licenses** stored on the Monolythium blockchain to prove game ownership. Unlike traditional platforms where your games are tied to a company's database, MonoPlay licenses are permanent, verifiable, and truly yours.

## What is an On-Chain License?

An **on-chain license** is a smart contract record that proves you own a specific game. When you purchase a game on MonoPlay, a license token is minted to your wallet address.

**Think of it like this:**
- Traditional platforms: You have an account with a company that *says* you own a game
- MonoPlay: You have a cryptographic proof of ownership that no one can revoke

### How It Works

**Step 1: Purchase a Game**
1. You buy a game with LYTH tokens
2. The payment is sent to the developer's wallet
3. A license NFT is minted to your wallet address

**Step 2: License Recorded On-Chain**
The license is a blockchain record that includes:
- **Game ID**: Unique identifier for the game
- **Owner Address**: Your wallet address
- **License Type**: Single-user, family, subscription, etc.
- **Purchase Date**: Timestamp of acquisition
- **Additional Metadata**: DLC, edition, platform restrictions

**Step 3: Verification**
When you launch a game:
1. The MonoPlay Launcher checks the blockchain
2. Verifies your wallet owns a valid license
3. Generates a temporary access token (cached for 7 days)
4. The game launches

## Benefits of On-Chain Licenses

### True Ownership

**You own the license, not a company.**

- MonoPlay cannot revoke your license
- If MonoPlay shuts down, your licenses remain on the blockchain
- Licenses are stored permanently (as long as the blockchain exists)

**Contrast with traditional platforms:**
- Steam, Epic, etc. can ban accounts and revoke access
- Platform shutdowns mean you lose all games
- Terms of Service can change at any time

### Portability

**Your licenses are wallet-based, not account-based.**

- Access your library from any device by connecting your wallet
- No need to "log in" — just connect your wallet
- Switch between desktop launcher, mobile app, or web interface seamlessly

### Verifiable & Transparent

**Anyone can verify license ownership on the blockchain.**

- Check your licenses on [monoscan.xyz](https://monoscan.xyz)
- Developers can see total license holders (sales data)
- No hidden databases or black-box systems

### Resale & Gifting (Coming Soon)

**Licenses are transferable** (if the developer enables it):

- Sell your used games to other players
- Gift licenses to friends
- Trade games peer-to-peer

*Note: This feature is in development. Developers can opt out to prevent resale.*

## License Types

MonoPlay supports multiple license models:

### Single-User License (Default)

**How it works:**
- One wallet address owns the license
- Only that wallet can play the game
- Non-transferable (unless developer allows resale)

**Use case:**
- Standard game purchases
- Most games use this model

**Example:**
```
Game: CyberRunner 2077
Type: Single-User
Owner: 0x1234...abcd
Price: 50 LYTH
```

### Multi-User License (Family Sharing)

**How it works:**
- The license can be shared with multiple wallet addresses
- The primary owner designates "family members"
- Up to 5 wallets can play simultaneously

**Use case:**
- Families sharing one game library
- Households with multiple players

**Example:**
```
Game: SpaceExplorer
Type: Multi-User (Family)
Primary Owner: 0x1234...abcd
Authorized Users: 0x5678...efgh, 0x9abc...ijkl
Max Concurrent Players: 5
```

**How to share:**
1. Go to Library → Game Details
2. Click "Manage Family Sharing"
3. Add wallet addresses of family members
4. They can now install and play

### Subscription License

**How it works:**
- Monthly or annual recurring payment
- License remains active as long as subscription is paid
- Auto-renews unless canceled

**Use case:**
- MMOs or live-service games
- Games with ongoing content updates

**Example:**
```
Game: Galaxy Warriors Online
Type: Subscription
Owner: 0x1234...abcd
Plan: Monthly (10 LYTH/month)
Next Payment: 2026-03-14
```

**Canceling:**
- Settings → Subscriptions → "Cancel Auto-Renewal"
- You retain access until the current period ends

### Key-Granted License

**How it works:**
- The license is granted without payment
- Used for promotional codes, beta access, or developer copies

**Use case:**
- Press/influencer access
- Kickstarter backer rewards
- Beta testing

**Example:**
```
Game: Indie Platformer
Type: Key-Granted
Owner: 0x1234...abcd
Granted By: Developer (0x9876...xyza)
Reason: Press Review Copy
```

### Free License

**How it works:**
- The game is free-to-play
- No payment required, but still issues a license for tracking

**Use case:**
- Free-to-play games
- Demos or trials

**Example:**
```
Game: Battle Royale Z
Type: Free
Owner: 0x1234...abcd
Price: 0 LYTH
```

### Time-Limited License

**How it works:**
- The license expires after a set time period
- Used for rentals or temporary access

**Use case:**
- Game rentals (e.g., "Play for 7 days")
- Event-based access (e.g., tournament beta)

**Example:**
```
Game: Racing Sim Pro
Type: Time-Limited
Owner: 0x1234...abcd
Price: 5 LYTH
Valid Until: 2026-02-21 (7 days)
```

## License Verification

### How Verification Works

Every time you launch a game, the MonoPlay Launcher performs license verification:

**Step 1: Check Blockchain**
- Launcher queries the Monolythium blockchain
- Verifies your connected wallet owns a valid license
- Checks for expiration (subscription or time-limited licenses)

**Step 2: Generate Access Token**
- If valid, the launcher generates a signed access token
- Token is cached locally on your device
- Token is valid for 7 days

**Step 3: Launch Game**
- The game receives the access token
- Game verifies the token signature
- If valid, the game runs

**Frequency:**
- Online: Verified on every launch (instant, ~500ms)
- Offline: Uses cached token (valid for 7 days)

### Offline Play

**You can play offline without internet access.**

**How it works:**
1. Launch a game while online at least once
2. The launcher caches a signed license token locally
3. For the next 7 days, you can play offline
4. After 7 days, reconnect to refresh the token

**Why 7 days?**
- Prevents indefinite offline sharing of licenses
- Ensures stolen licenses can be revoked
- Balances convenience and security

**Token storage:**
- Encrypted token stored at: `~/.monoplay/licenses/[game-id].token`
- Cannot be copied to another device (device-specific encryption)

### Verifying Your Licenses Manually

You can view your licenses directly on the blockchain:

**Option 1: Monoscan (Block Explorer)**
1. Visit [monoscan.xyz](https://monoscan.xyz)
2. Enter your wallet address
3. Navigate to the "Tokens" tab
4. Filter by "MonoPlay Licenses"

**Option 2: MonoPlay Launcher**
1. Open Launcher → Library
2. Right-click a game → "View License Details"
3. See purchase date, license type, contract address

**Option 3: Smart Contract Query**
Advanced users can query the license contract directly:

```javascript
// Example using ethers.js
const contract = new ethers.Contract(LICENSE_CONTRACT_ADDRESS, ABI, provider);
const licenses = await contract.getLicensesByOwner("0xYourWalletAddress");
console.log(licenses);
```

## DLC & Add-Ons

Downloadable content (DLC) and expansions are also on-chain licenses.

**How DLC Works:**
1. Base game license required
2. DLC is a separate license tied to the base game
3. Both licenses are verified on launch

**Example:**
```
Base Game: Fantasy RPG (License #12345)
DLC 1: Dragon Expansion (License #12346, requires #12345)
DLC 2: Mage Tower (License #12347, requires #12345)
```

**Bundled DLC:**
- "Complete Edition" includes base game + all DLC as one license
- Cheaper than buying separately
- Retroactive discounts if you already own some DLC

## License Transfer & Resale

**Current Status:** Transfer and resale features are **in development**.

### Planned Features

**Peer-to-Peer Resale:**
- List your license on the MonoPlay marketplace
- Set your asking price (in LYTH)
- Buyer purchases, license transfers automatically
- Developer receives a % of resale price (set by developer)

**Gifting:**
- Send a license to another wallet address
- One-time transfer (irreversible)
- Useful for birthday gifts, giveaways, etc.

**Developer Control:**
- Developers can enable/disable resale per game
- Set resale royalty % (e.g., 10% of resale goes to developer)

**Example (Future):**
```
Game: Indie Adventure
Original Price: 20 LYTH
Resale Price: 12 LYTH (40% off)
Developer Royalty: 1.2 LYTH (10% of 12)
Seller Receives: 10.8 LYTH (90% of 12)
```

## Security & Anti-Piracy

### How MonoPlay Prevents Piracy

**On-Chain Verification:**
- Games require a valid license token to launch
- Tokens are signed by the MonoPlay smart contract (can't be forged)
- Offline tokens expire after 7 days (prevents long-term sharing)

**Device Binding:**
- Cached tokens are encrypted with your device's hardware ID
- Cannot be copied to another device
- Each device must verify online at least once per 7 days

**Sandboxed Execution:**
- Games run in a sandboxed environment managed by the launcher
- Cannot be launched directly without license verification

**No DRM, But Secure:**
MonoPlay's approach is **not traditional DRM**:
- No background services or kernel drivers
- No internet check-ins during gameplay
- No performance impact
- But still requires license verification to launch

### What If My Wallet is Compromised?

**If someone steals your private key:**
1. They can transfer your licenses to another wallet (if transfers are enabled)
2. They can play games using your licenses

**Protection:**
- Use a hardware wallet for high-value libraries
- Enable wallet security features (biometrics, 2FA)
- Never share your recovery phrase

**Recovery:**
- If licenses are transferred maliciously, contact support
- In rare cases, licenses can be revoked and re-issued (requires proof of theft)

### What If I Lose My Wallet?

**If you lose access to your wallet:**
- Your licenses are **permanently lost** (blockchain records cannot be changed)
- Always back up your recovery phrase

**Prevention:**
- Write down your wallet's recovery phrase
- Store it in multiple secure locations
- Consider using a hardware wallet
- Test recovery before storing large libraries

## Comparing License Systems

| Feature | MonoPlay | Steam | Epic | GOG |
|---------|----------|-------|------|-----|
| **Ownership** | On-chain (permanent) | Account-based | Account-based | Account-based |
| **Revocable?** | No (unless stolen) | Yes | Yes | Yes |
| **Offline Play** | 7-day cached token | Varies by game | Requires login | Fully offline |
| **Transferable?** | Soon (if dev allows) | No | No | No |
| **Verifiable?** | Yes (blockchain) | No | No | No |
| **Platform Lock-In?** | No (wallet-based) | Yes | Yes | No |

## Future Improvements

**Planned features:**
- **Cross-chain licenses**: Own a game on Ethereum, play on Monolythium
- **NFT integration**: Licenses as tradable NFTs on OpenSea, etc.
- **Fractional ownership**: Share a license with friends, split the cost
- **Rental marketplace**: Rent your games to others when you're not playing
- **Proof of playtime**: On-chain achievements and stats (opt-in)

## FAQ

### Can I play a game on multiple devices?

Yes, as long as you connect the same wallet on each device. Each device needs to verify online at least once every 7 days.

### What happens if MonoPlay shuts down?

Your licenses remain on the blockchain forever. Developers can release standalone launchers or integrate with other platforms that read MonoPlay licenses.

### Can I share my games with friends?

Only via Family Sharing (multi-user licenses). Single-user licenses are tied to your wallet.

### Do licenses expire?

- **Single-user**: No, permanent
- **Subscription**: Yes, when payment stops
- **Time-limited**: Yes, after the set period

### Can I lose my licenses?

Only if you lose access to your wallet. Back up your recovery phrase.

### Are licenses region-locked?

No, MonoPlay licenses are global. However, some games may have regional restrictions set by the developer.

## Next Steps

- **[Make a Purchase](/platform/payments)**: Learn how to buy games and acquire licenses
- **[Launcher Guide](/platform/launcher)**: Download and verify licenses in the launcher
- **[Storefront](/platform/storefront)**: Browse games available on MonoPlay

---

Questions? Visit the [FAQ](../reference/faq.md) or [contact support](../reference/faq.md).
