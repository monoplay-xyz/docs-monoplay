---
sidebar_position: 6
---

# Rewards System

GRID node operators earn LYTH rewards for distributing games to players. This guide explains how rewards work, what affects earnings, and how to maximize your income.

## How Rewards Work

### Reward Pool

The SeederRewards smart contract manages a pool of LYTH funded by:

- **Platform fees**: 10% of game sales
- **Transaction fees**: 0.1% of all MonoPlay transactions
- **Foundation allocation**: 5 million LYTH annually (decreases over time)

Total annual pool (current): ~8-12 million LYTH

### Distribution Model

Rewards distributed proportionally based on:

1. **Bandwidth contributed**: GB uploaded to players
2. **Uptime**: Percentage of time online and accessible
3. **Content popularity**: High-demand games earn more per GB
4. **Geographic location**: Underserved regions receive bonuses
5. **Service quality**: Fast, reliable nodes prioritized

## Earning Calculation

### Simplified Formula

```
Your Reward = (Your Contribution Score / Total Network Score) × Weekly Pool
```

### Contribution Score

```
Score = Bandwidth × Uptime × Popularity × Location × Quality
```

**Components:**

**Bandwidth (40% weight)**
- Total GB uploaded to players in the epoch
- Measured via cryptographically signed bandwidth proofs

**Uptime (20% weight)**
- Percentage of epoch online and connectable
- Verified via random connectivity checks

**Popularity (20% weight)**
- Weighted by demand for content you're seeding
- New releases and trending games have higher multipliers

**Location (10% weight)**
- Bonus for serving underserved geographic regions
- Regions with fewer seeders receive 1.2-2.0× multiplier

**Quality (10% weight)**
- Average download speed provided to peers
- Connection success rate
- Peer satisfaction score

### Example Calculation

**Your Node:**
- Bandwidth: 500 GB uploaded
- Uptime: 95%
- Average content popularity: 1.3× multiplier
- Location: Europe (1.0× - well-served region)
- Quality: 98% success rate (1.1× multiplier)

**Network Totals:**
- Total bandwidth: 50,000 GB
- Weekly pool: 150,000 LYTH

**Your Score:**
```
500 GB × 0.95 × 1.3 × 1.0 × 1.1 = 681.75
```

**Network Score** (simplified): 68,175

**Your Reward:**
```
(681.75 / 68,175) × 150,000 = 1,500 LYTH
```

**Note**: Actual calculation is more complex and performed on-chain.

## Reward Epochs

### Epoch Duration

Rewards calculated and distributed weekly:

- **Epoch length**: 7 days (168 hours)
- **Epoch start**: Monday 00:00 UTC
- **Calculation period**: Monday-Sunday
- **Distribution**: Following Monday

### Epoch Lifecycle

1. **Active epoch**: Nodes contribute bandwidth and uptime
2. **Finalization**: Epoch ends Sunday 23:59 UTC
3. **Calculation**: Smart contract calculates scores (automated)
4. **Claim period**: Rewards available for claiming Monday onwards
5. **Auto-claim**: Nodes with auto-claim enabled receive rewards automatically

## Claiming Rewards

### Automatic Claiming

Enable in config:

```yaml
rewards:
  auto_claim: true
  claim_threshold_lyth: 50
  claim_interval_hours: 168  # Weekly
```

**Benefits:**

- No manual action required
- Rewards automatically sent to wallet
- Optimal gas fee timing (low-traffic periods)

**Gas fees:**

- Paid from claimed rewards automatically
- Typically 0.1-0.5 LYTH per claim transaction

### Manual Claiming

Claim via dashboard or CLI:

**Dashboard:**
1. Open `http://your-node:8080`
2. Navigate to Rewards tab
3. Click "Claim Rewards"
4. Confirm transaction in wallet

**CLI:**

```bash
# Docker
docker exec grid-node grid-cli rewards claim

# Raspberry Pi
sudo grid-cli rewards claim
```

### Claim Threshold

Set minimum LYTH before claiming:

```yaml
rewards:
  claim_threshold_lyth: 50
```

**Recommended thresholds:**

- **Small nodes (Pi)**: 20-50 LYTH
- **Medium nodes (home server)**: 50-100 LYTH
- **Large nodes (VPS)**: 100-500 LYTH

Higher thresholds reduce gas fees as percentage of earnings.

## Maximizing Earnings

### 1. Increase Storage

More storage = more games seeded = higher earnings potential.

| Storage | Approximate Games | Estimated Monthly Earnings |
|---------|-------------------|----------------------------|
| 100 GB | 3-5 games | 30-80 LYTH |
| 500 GB | 10-20 games | 100-300 LYTH |
| 1 TB | 30-50 games | 250-600 LYTH |
| 2 TB+ | 60-100+ games | 500-2000+ LYTH |

**Action**: Increase `max_size_gb` in config or add storage hardware.

### 2. Improve Uptime

Target 99%+ uptime for maximum rewards.

**Tips:**

- Use UPS to prevent power loss
- Monitor system health proactively
- Enable automatic restarts after crashes
- Avoid frequent maintenance windows

**Uptime Impact:**

- 100% uptime: Full rewards
- 95% uptime: -5% rewards penalty
- 90% uptime: -10% penalty
- Below 80%: -20% penalty

### 3. Increase Upload Bandwidth

More bandwidth = serve more peers = higher earnings.

**Bandwidth vs. Earnings** (approximate):

- 50 Mbps: 50-100 LYTH/month
- 100 Mbps: 100-300 LYTH/month
- 500 Mbps: 400-800 LYTH/month
- 1 Gbps: 800-2000 LYTH/month

**Action:**

- Upgrade internet plan
- Remove upload speed limits in config
- Optimize network settings

### 4. Seed Popular Content

Let auto-selection mode choose high-demand games:

```yaml
content:
  mode: "auto"
  prefer_new_releases: true
```

Auto-selection algorithm prioritizes:

- New game releases (first 30 days: 2.0× multiplier)
- Trending games (high download volume)
- Content with few existing seeders

**Manual selection** can work if you identify popular games, but auto-mode generally performs better.

### 5. Strategic Geographic Location

Operate nodes in underserved regions for bonus multipliers:

**Current location bonuses:**

- **North America East**: 1.0× (well-served)
- **Europe West**: 1.0× (well-served)
- **Asia Pacific**: 1.3× (moderate coverage)
- **South America**: 1.5× (limited coverage)
- **Africa**: 1.8× (very limited coverage)
- **Middle East**: 1.6× (limited coverage)

**Note**: Bonuses adjust dynamically based on network coverage.

### 6. Optimize Service Quality

Provide fast, reliable service:

**Quality Factors:**

- **Low latency**: Keep ping under 100ms
- **Fast transfers**: Maximize upload speed per peer
- **High availability**: Always respond to connection requests
- **Stable connection**: Avoid frequent disconnects

**Tips:**

- Use wired Ethernet (not WiFi)
- Optimize router QoS settings
- Use SSD for faster file access
- Reduce network congestion (separate VLAN, etc.)

### 7. Run Multiple Nodes

Diversify for increased total earnings:

**Multi-node strategy:**

- 1× Raspberry Pi at home (reliable, low cost)
- 2× VPS in different regions (high bandwidth, location bonuses)

**Requirements:**

- Each node needs unique wallet address
- Operate in different geographic locations for bonuses
- Ensure each node reaches claim threshold

## Earnings Estimates

### Conservative Estimates

Assuming moderate network usage, average content popularity:

| Hardware | Monthly Earnings (LYTH) |
|----------|-------------------------|
| Raspberry Pi 5 (100 GB, home internet) | 50-100 |
| Raspberry Pi 5 (500 GB, home internet) | 100-200 |
| Home server (1 TB, 100 Mbps) | 200-400 |
| VPS (500 GB, 1 Gbps) | 400-800 |
| Dedicated server (2 TB, 1 Gbps) | 800-2000 |

### Optimistic Estimates

Assuming high network usage, popular content, good location bonuses:

| Hardware | Monthly Earnings (LYTH) |
|----------|-------------------------|
| Raspberry Pi 5 (100 GB) | 100-200 |
| Raspberry Pi 5 (500 GB) | 200-400 |
| Home server (1 TB) | 400-800 |
| VPS (500 GB, 1 Gbps) | 800-1600 |
| Dedicated server (2 TB, 1 Gbps) | 1600-4000 |

**Disclaimers:**

- Estimates based on current network conditions
- Actual earnings vary significantly
- Network growth increases competition (lowers individual share)
- LYTH price volatility affects USD value
- Early network participants may earn more

## ROI Analysis

### Raspberry Pi 5 (500 GB NVMe)

**Initial Cost**: $160 USD
**Monthly Cost**: $0.70 electricity
**Monthly Earnings**: 150 LYTH (conservative)

At $0.50/LYTH: $75/month revenue, $74.30 profit
**Payback period**: 2.2 months

At $0.20/LYTH: $30/month revenue, $29.30 profit
**Payback period**: 5.5 months

### VPS (500 GB, 1 Gbps)

**Initial Cost**: $0
**Monthly Cost**: $35 hosting
**Monthly Earnings**: 600 LYTH (conservative)

At $0.50/LYTH: $300/month revenue, $265 profit
**Profit margin**: 88%

At $0.20/LYTH: $120/month revenue, $85 profit
**Profit margin**: 71%

**Break-even LYTH price**: $0.058

## Monitoring Your Earnings

### Dashboard

View real-time earnings:

- **Pending rewards**: Current epoch, not yet claimable
- **Claimable rewards**: Available for claiming
- **Claimed rewards**: Historical total
- **Estimated monthly**: Projection based on current performance

### CLI

```bash
# Check rewards
grid-cli rewards

# View detailed breakdown
grid-cli rewards --detailed
```

Output:

```
Current Epoch: 2026-W07 (Mon Feb 10 - Sun Feb 16)
Epoch Progress: 4d 12h remaining

Pending Rewards (Current Epoch):
  Bandwidth: 124.3 GB uploaded
  Uptime: 98.2%
  Estimated Reward: 18.7 LYTH

Claimable Rewards (Previous Epochs):
  Total: 142.6 LYTH
  Epochs: 3

Claimed Rewards (All-Time):
  Total: 1,247.9 LYTH
  First claim: 2026-01-15
  Last claim: 2026-02-03

Projected Monthly: 287 LYTH
```

## Tax Implications

**Disclaimer**: Consult a tax professional. This is not tax advice.

### Taxation Considerations

GRID rewards may be considered:

- **Income**: Taxable when received (many jurisdictions)
- **Capital gains**: Taxable when sold (if held after receiving)
- **Mining income**: Some jurisdictions treat similar to mining

**Record keeping:**

- Track rewards claimed (LYTH amount and USD value at claim time)
- Track LYTH sales (capital gains calculation)
- Monitor on-chain transactions for audit trail

**Tools:**

- GRID dashboard exports CSV of claims
- Blockchain explorers for transaction history
- Tax software integrations (coming soon)

## FAQ

### When are rewards distributed?

Weekly, every Monday after epoch finalization. Auto-claim sends rewards automatically; manual claim requires action.

### What if I'm offline during an epoch?

You earn proportional to uptime. If online 50% of epoch, you earn 50% of potential bandwidth rewards (with uptime penalty applied).

### Do unclaimed rewards expire?

No. Rewards remain claimable indefinitely.

### Can I change my wallet address?

Yes, via config. Future rewards go to new address; unclaimed rewards stay at old address (claim before changing).

### What happens if the reward pool runs out?

Pool is replenished continuously via platform fees and foundation allocations. If pool depletes, rewards pause until replenished.

### Are rewards guaranteed?

No. Rewards depend on network usage, competition, and pool funding. Not a guarantee of income.

## Next Steps

Understand rewards? Optimize your node:

- [Dashboard](./dashboard.md) - Monitor performance
- [FAQ](./faq.md) - Common questions
- [Requirements](./requirements.md) - Hardware upgrades

Join the community:

- Discord: #grid-earnings
- Forum: [forum.monoplay.xyz/grid-rewards](https://forum.monoplay.xyz/grid-rewards)
