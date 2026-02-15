---
sidebar_position: 4
title: Payments
---

# Payments on MonoPlay

MonoPlay uses **LYTH tokens** (the native cryptocurrency of the Monolythium blockchain) for all game purchases. Payments are fast, low-cost, and settled directly on the blockchain — no intermediaries, no chargebacks, no payment processor fees.

## How Payments Work

### Payment Flow

**Step 1: Browse and Add to Cart**
1. Find a game on the MonoPlay storefront
2. Click "Buy Now" or "Add to Cart"
3. Review your cart (you can add multiple games)

**Step 2: Checkout**
1. Click "Checkout"
2. Review the total price in LYTH (and USD equivalent)
3. Your wallet shows a transaction prompt

**Step 3: Approve Transaction**
1. Your wallet displays:
   - **To**: MonoPlay payment contract address
   - **Amount**: Total LYTH for your purchase
   - **Gas Fee**: Small transaction fee (usually < $0.01)
2. Review and click "Confirm"

**Step 4: Transaction Confirmed**
1. The blockchain processes your transaction (5-15 seconds)
2. The payment is sent to the developer
3. An on-chain license is minted to your wallet
4. The game appears in your library

**Step 5: Download and Play**
1. Open the MonoPlay Launcher
2. The game is now in your library
3. Click "Install" to download

### Transaction Speed

**Monolythium blockchain confirmation times:**
- **Typical**: 5-15 seconds
- **Network congestion**: Up to 30 seconds
- **Fast finality**: No waiting for multiple confirmations

Compare to traditional platforms:
- Credit card: 2-3 business days for settlement
- PayPal: Instant for buyer, 1-3 days for seller

### Gas Fees

**What are gas fees?**
Gas fees are small transaction costs paid to blockchain validators for processing your payment.

**Typical gas cost on Monolythium:**
- **Average**: $0.005 - $0.02 (half a cent to 2 cents)
- **Peak times**: $0.05 - $0.10 (rarely happens)

**Why so low?**
Monolythium is a high-throughput blockchain with low fees compared to Ethereum or Bitcoin.

**Who pays gas?**
You, the buyer, pay gas fees in addition to the game price. This is shown in your wallet before confirming.

### Price Display

Game prices are shown in:
- **LYTH** (primary, what you'll pay)
- **USD equivalent** (estimated, based on current LYTH price)

**Example:**
```
Game: CyberRunner 2077
Price: 50 LYTH (~$25.00 USD)

Cart Total:
  CyberRunner 2077: 50 LYTH
  Gas Fee (estimated): 0.02 LYTH
  ─────────────────────────────
  Total: 50.02 LYTH (~$25.01 USD)
```

**Note:** USD prices are estimates. You pay in LYTH, which fluctuates against USD.

## Payment Methods

### LYTH Tokens (Direct)

**Required:**
- LYTH tokens in your wallet
- Wallet connected to Monolythium network

**How to get LYTH:**
See [Getting LYTH Tokens](../getting-started/create-account.md#step-4-getting-lyth-tokens)

**Advantages:**
- Instant payment
- Lowest fees (only gas, no conversion)
- Direct to developer

### Fiat On-Ramp (Coming Soon)

**Buy LYTH with credit/debit card** directly on MonoPlay:

**Supported providers:**
- MoonPay
- Transak
- Ramp Network

**How it will work:**
1. Checkout page shows "Pay with Card" option
2. Enter card details
3. On-ramp provider converts USD → LYTH
4. LYTH is sent to your wallet
5. Transaction completes automatically

**Fees:**
- Provider fee: 3-5% (varies by provider)
- Gas fee: ~$0.01

**Limits:**
- Minimum purchase: $10
- Maximum per transaction: $500 (varies by provider and KYC level)

### Other Cryptocurrencies (Future)

**Planned support:**
- ETH, USDC, USDT, BNB
- Auto-swapped to LYTH at checkout
- Powered by DEX aggregators (best rates)

**Example:**
1. Cart total: 50 LYTH
2. You select "Pay with USDC"
3. System calculates equivalent USDC amount
4. You approve USDC payment
5. Backend swaps USDC → LYTH
6. Game license is issued

## Revenue Distribution

When you purchase a game, here's where the money goes:

### Standard Revenue Split

**Default (single-purchase games):**
- **Developer**: 85%
- **MonoPlay Platform**: 10%
- **GRID Node Rewards**: 5%

**Example:**
```
Game Price: 100 LYTH

Developer receives: 85 LYTH
Platform fee: 10 LYTH
GRID rewards pool: 5 LYTH
```

**Compare to traditional platforms:**
- Steam: 70% developer / 30% platform
- Epic: 88% developer / 12% platform
- GOG: 70% developer / 30% platform

MonoPlay's 85% split is competitive, and the 5% GRID rewards fund decentralized distribution.

### Subscription Games

**Recurring payment split:**
- **Developer**: 80%
- **MonoPlay Platform**: 15%
- **GRID Node Rewards**: 5%

**Why lower?**
Platform handles recurring billing, subscription management, and cancellation logic.

### Free-to-Play (In-App Purchases)

**Microtransaction split:**
- **Developer**: 80%
- **MonoPlay Platform**: 15%
- **GRID Node Rewards**: 5%

### No Hidden Fees

**What's NOT charged:**
- No payment processor fees (like Stripe's 2.9% + $0.30)
- No chargeback fees
- No listing fees or approval fees
- No annual developer fees

**Developers receive payments instantly** to their wallet — no 30-60 day payout delays.

## Refund Policy

MonoPlay supports refunds under specific conditions.

### Refund Eligibility

**You can request a refund if:**
1. You purchased the game within the **last 14 days**, AND
2. You have played for **less than 2 hours**

**Example (Eligible):**
- Purchased 5 days ago
- Playtime: 1 hour 30 minutes
- **Result**: Refund approved

**Example (Not Eligible):**
- Purchased 20 days ago
- Playtime: 30 minutes
- **Result**: Outside 14-day window, refund denied

**Example (Not Eligible):**
- Purchased 3 days ago
- Playtime: 5 hours
- **Result**: Exceeded 2-hour limit, refund denied

### How to Request a Refund

**Method 1: Via Launcher**
1. Open MonoPlay Launcher
2. Go to Library → Right-click game → "Request Refund"
3. Select reason (optional)
4. Submit request

**Method 2: Via Website**
1. Visit [monoplay.xyz/support/refunds](https://monoplay.xyz/support/refunds)
2. Connect your wallet
3. Select the game
4. Submit request

**Processing time:**
- Automatic approval if eligible (instant)
- Manual review if borderline (within 24 hours)

### Refund Process

**Step 1: Request Submitted**
- System checks playtime and purchase date
- If eligible, refund is auto-approved

**Step 2: License Revoked**
- Your on-chain license is burned (destroyed)
- The game is removed from your library
- You can no longer launch it

**Step 3: Payment Returned**
- LYTH is refunded to your wallet (minus gas fees)
- Refund appears in 5-15 seconds (blockchain confirmation time)

**Step 4: Developer Notified**
- Developer receives notification
- Platform fee is also refunded
- GRID rewards are deducted from the pool

### Exceptions & Special Cases

**Pre-orders:**
- Refundable anytime before release
- 14-day window starts on release date, not pre-order date

**Gifts:**
- Recipient can refund (not the purchaser)
- Same 14-day, 2-hour rules apply

**Bundles:**
- If you refund one game in a bundle, the entire bundle is refunded
- You cannot refund individual games from a bundle

**Subscriptions:**
- Cancel anytime (no refund for current period)
- Access continues until the end of the billing cycle

**DLC:**
- Same 14-day, 2-hour rules
- Playtime is counted for the base game + DLC combined

**Key-Granted Licenses:**
- Press/reviewer copies: Not refundable
- Promotional codes: Not refundable

### Abuse Prevention

**To prevent refund abuse:**
- Refunds are tracked on-chain
- Excessive refund requests may require manual review
- Suspected fraud results in wallet flagging (cannot refund future purchases)

**What's considered abuse?**
- Refunding >50% of purchases
- "Renting" games (buy → play → refund repeatedly)
- Coordinated refund attacks on developers

## Pricing & Sales

### How Developers Set Prices

**Developers have full control:**
- Set base price in LYTH
- Run sales and discounts
- Create bundles
- Offer regional pricing (optional)

**Price change restrictions:**
- Cannot increase price within 30 days of a sale (prevents "fake discounts")
- Must honor pre-order price

### Discounts & Sales

**Developer-initiated sales:**
- "Summer Sale," "Launch Week," etc.
- Up to 90% off (no minimum discount)
- Scheduled via MonoPlay developer dashboard

**Platform-wide sales:**
- MonoPlay may organize seasonal events
- Developers opt-in voluntarily
- Featured placement for participating games

**Wishlisted games:**
- Users receive alerts when wishlisted games go on sale
- Email and launcher notifications

### Price Volatility (LYTH vs USD)

**LYTH price fluctuates** against USD, just like any cryptocurrency.

**Example scenario:**
- Game priced at 50 LYTH
- Today: 1 LYTH = $0.50 USD → Game costs $25
- Next month: 1 LYTH = $0.60 USD → Game costs $30
- You still pay 50 LYTH, but the USD value changed

**Developer mitigation:**
- Developers can adjust LYTH prices to maintain USD equivalence
- MonoPlay dashboard shows "Suggested LYTH Price" based on current exchange rate

**Buyer strategy:**
- Buy LYTH when prices are low (like a sale on currency)
- Hold LYTH for future purchases

### Regional Pricing (Optional)

Developers can set different prices for different regions:

**Example:**
- North America: 50 LYTH
- Europe: 45 LYTH
- Southeast Asia: 30 LYTH

**Detection:**
- Based on wallet's IP address (geo-IP lookup)
- VPN usage may show different prices

**Restrictions:**
- Cannot buy in a cheaper region and gift to a more expensive region (region-locked gifts)

## Security & Safety

### Payment Security

**Blockchain security:**
- Payments are cryptographically signed
- Cannot be reversed or charged back
- Transparent on-chain (anyone can verify)

**Wallet security:**
- You control your private keys (MonoPlay never has access)
- Approve every transaction manually
- Use hardware wallets for large purchases

**Smart contract audits:**
- MonoPlay payment contracts are audited by third-party security firms
- Open-source and publicly verifiable

### Scam Prevention

**Red flags:**
- Fake MonoPlay websites (always verify URL: `monoplay.xyz`)
- Phishing emails asking for private keys
- "Customer support" asking for recovery phrases
- Too-good-to-be-true discounts (90%+ off popular games)

**Safety tips:**
- Bookmark the official MonoPlay site
- Never share your recovery phrase
- Double-check contract addresses in your wallet before approving
- Be wary of Discord/Telegram DMs offering "deals"

### Transaction Errors

**"Transaction Failed"**

**Common causes:**
- Insufficient LYTH balance (need purchase amount + gas)
- Gas limit too low (rare on Monolythium)
- Network congestion (try again in a few minutes)

**Solution:**
- Check your LYTH balance
- Increase gas limit in wallet settings
- Retry transaction

**"Wrong Network"**

**Cause:**
- Your wallet is on Ethereum or another chain

**Solution:**
- Switch to Monolythium network in your wallet

**"Payment Went Through But No License"**

**Cause:**
- Blockchain delay or indexer lag

**Solution:**
- Wait 1-2 minutes and refresh your library
- If still missing after 10 minutes, contact support with transaction hash

## Developer Payouts

**How developers get paid:**
- Instant payout to their wallet on every sale
- No waiting for monthly payouts
- No minimum balance

**Tax compliance:**
- Developers are responsible for reporting income
- MonoPlay does not withhold taxes
- Transaction history available on-chain for accounting

**Withdrawal:**
- Developers can swap LYTH to stablecoins (USDC) or fiat via exchanges
- Or hold LYTH as an investment

## Next Steps

- **[Storefront Guide](/platform/storefront)**: Browse games and add to cart
- **[License System](/platform/licenses)**: Understand on-chain ownership
- **[Create an Account](/getting-started/create-account)**: Set up your wallet and get LYTH

---

Questions about payments? Visit our [FAQ](../reference/faq.md) or [contact support](../reference/faq.md).
