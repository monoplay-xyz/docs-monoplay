---
sidebar_position: 2
title: Create an Account
---

# Create an Account

MonoPlay uses **wallet-based authentication** — your blockchain wallet is your account. No email required, no passwords to remember, no personal information collected.

If you already have an EVM-compatible wallet (MetaMask, WalletConnect, Coinbase Wallet, etc.), you're ready to go. If not, this guide will walk you through setting one up.

## Step 1: Choose a Wallet

MonoPlay supports any EVM-compatible wallet. Here are the most popular options:

### MetaMask (Recommended for Beginners)

**Best for:** Desktop and mobile users, browser-based access

- **Download**: [metamask.io](https://metamask.io)
- **Platforms**: Chrome/Firefox/Brave extension, iOS/Android app
- **Features**: Built-in token swap, multi-chain support, hardware wallet integration

**Installation:**
1. Visit [metamask.io](https://metamask.io) and click "Download"
2. Install the browser extension or mobile app
3. Follow the setup wizard to create a new wallet
4. **Write down your recovery phrase** and store it securely (this is critical — losing it means losing access to your funds)

### WalletConnect

**Best for:** Mobile-first users, privacy-focused users

- **Download**: Any WalletConnect-compatible app (Rainbow, Trust Wallet, Argent, etc.)
- **Platforms**: iOS, Android
- **Features**: QR code scanning, multi-wallet support

**How It Works:**
1. Download a WalletConnect-compatible wallet app
2. On MonoPlay, click "Connect Wallet" and choose "WalletConnect"
3. Scan the QR code with your mobile wallet
4. Approve the connection

### Coinbase Wallet

**Best for:** Coinbase users, easy fiat on-ramp

- **Download**: [coinbase.com/wallet](https://www.coinbase.com/wallet)
- **Platforms**: Chrome extension, iOS/Android app
- **Features**: Direct Coinbase account integration, fiat purchases

### Hardware Wallets (Advanced)

**Best for:** Large holdings, maximum security

Supported hardware wallets:
- **Ledger** (Nano S, Nano X)
- **Trezor** (Model T, Model One)

Use these via MetaMask or direct connection on supported platforms.

## Step 2: Connect Your Wallet to MonoPlay

Once you have a wallet installed:

1. Visit [monoplay.xyz](https://monoplay.xyz)
2. Click **"Connect Wallet"** in the top-right corner
3. Select your wallet provider from the modal
4. Approve the connection request in your wallet

**What happens when you connect:**
- MonoPlay reads your public wallet address
- Your address becomes your user ID on the platform
- No private keys or transaction permissions are granted (you'll approve those individually)

## Step 3: Add Monolythium Network

MonoPlay runs on the **Monolythium blockchain**. You'll need to add this network to your wallet.

### Automatic Setup (Recommended)

When you first connect your wallet, MonoPlay will prompt you to add the Monolythium network. Click **"Add Network"** and approve in your wallet.

### Manual Setup

If automatic setup doesn't work, add the network manually:

**Network Details:**
```
Network Name: Monolythium
RPC URL: https://rpc.monolythium.org
Chain ID: 7860 (mainnet) or 7861 (testnet)
Currency Symbol: LYTH
Block Explorer: https://monoscan.xyz
```

**In MetaMask:**
1. Click the network dropdown (top center)
2. Click "Add Network"
3. Enter the details above
4. Click "Save"

**In WalletConnect Wallets:**
Most mobile wallets auto-detect the network when connecting. If not, check your wallet's settings for "Add Custom Network."

## Step 4: Getting LYTH Tokens

To purchase games on MonoPlay, you need **LYTH** tokens. Here's how to get them:

### Option 1: Buy on an Exchange

LYTH is listed on several decentralized exchanges (DEXs):

- **MonoHub DEX**: [monohub.xyz](https://monohub.xyz) (native DEX, lowest fees)
- **Uniswap**: Available on Ethereum mainnet (bridge required)
- **PancakeSwap**: Available on BSC (bridge required)

**Steps:**
1. Buy a supported cryptocurrency (ETH, USDC, USDT, BNB)
2. Visit the DEX of your choice
3. Connect your wallet
4. Swap your tokens for LYTH
5. LYTH will appear in your wallet

### Option 2: Bridge from Another Chain

If you have LYTH on Ethereum or Binance Smart Chain, you can bridge it to Monolythium:

1. Visit [bridge.monolythium.org](https://bridge.monolythium.org)
2. Connect your wallet
3. Select source chain (Ethereum, BSC, etc.)
4. Enter amount to bridge
5. Approve and confirm transactions
6. Wait 5-10 minutes for bridging to complete

### Option 3: Fiat On-Ramp (Coming Soon)

Direct credit/debit card purchases will be available soon via:
- MoonPay
- Transak
- Ramp Network

### Option 4: Receive from Another User

Anyone can send you LYTH directly to your wallet address. Just share your public address (starts with `0x...`).

**To find your address:**
- MetaMask: Click your account name at the top, then click the address to copy
- Mobile wallets: Tap "Receive" and copy the address or show the QR code

## Step 5: Verify Your Setup

Before buying games, verify everything is working:

1. **Check Network**: Ensure your wallet is connected to "Monolythium" (not Ethereum Mainnet)
2. **Check Balance**: Your LYTH balance should appear in your wallet and on MonoPlay
3. **Test Transaction**: Try sending a small amount of LYTH to yourself or another address

## Account Security Best Practices

### Protect Your Recovery Phrase

Your wallet's recovery phrase (12-24 words) is the **master key** to your account. If someone gets it, they can steal all your funds.

**Do:**
- Write it down on paper and store in a safe place
- Consider using a fireproof/waterproof safe
- Use a hardware wallet for large holdings
- Split the phrase into multiple locations (advanced)

**Don't:**
- Store it digitally (cloud, email, screenshots)
- Share it with anyone (MonoPlay will NEVER ask for it)
- Use the same phrase for multiple wallets

### Enable Additional Security

**MetaMask Users:**
- Enable "Privacy Mode" (require approval for site connections)
- Set up a strong password for the app
- Use hardware wallet integration for large purchases

**Mobile Users:**
- Enable biometric authentication (Face ID, fingerprint)
- Enable auto-lock after inactivity
- Review connected apps regularly

### Beware of Phishing

**Red Flags:**
- Emails asking for your recovery phrase or private key
- Fake MonoPlay websites (always check the URL: `monoplay.xyz`)
- Discord/Telegram DMs from "support" (we never DM first)
- Transaction popups when you didn't initiate an action

**Always verify:**
- You're on the real MonoPlay website
- Transaction details before approving
- The contract address when adding LYTH to your wallet

## Troubleshooting

### "Wallet not detected"

**Solution:**
- Refresh the page
- Make sure your wallet extension is enabled
- Try a different browser
- Update your wallet to the latest version

### "Wrong Network"

**Solution:**
- Click the network dropdown in your wallet
- Switch to "Monolythium"
- If you don't see it, add it manually (see Step 3)

### "Insufficient Balance"

**Solution:**
- You need LYTH to purchase games
- You also need a small amount of LYTH for transaction fees (usually < $0.01)
- See "Getting LYTH Tokens" above

### "Transaction Failed"

**Solution:**
- Check you have enough LYTH for the purchase + gas fees
- Try increasing gas limit in wallet settings
- Wait a few minutes and retry (network might be congested)

## Next Steps

Now that your account is set up:

- **[Browse Games](/platform/storefront)**: Explore the MonoPlay store
- **[Make Your First Purchase](/platform/payments)**: Learn how payments work
- **[Download the Launcher](/platform/launcher)**: Install games and manage your library
- **[Quick Start Guide](/getting-started/quick-start)**: Complete walkthrough for new users

---

Need help? Visit our [FAQ](../reference/faq.md) or ask in the [Discord community](https://discord.gg/monoplay).
