---
sidebar_position: 2
---

# Developer Console

The Developer Console is a web-based dashboard for game publishers to manage games, track submissions, view analytics, and configure publisher settings.

## Accessing the Console

**URL**: [console.monoplay.xyz](https://console.monoplay.xyz)

**Requirements**:

- Verified publisher account (see [Publisher Registration](../publishing/registration.md))
- Monolythium-compatible wallet
- Modern browser (Chrome, Firefox, Safari, Edge)

**First-time login:**

1. Navigate to console.monoplay.xyz
2. Click "Connect Wallet"
3. Select your wallet provider (MetaMask, Rabby, WalletConnect)
4. Approve connection request
5. Sign authentication message (EIP-191)

Your wallet address is your publisher ID. All actions tied to this wallet.

## Dashboard Overview

Upon login, you'll see the main dashboard with four sections:

### Quick Stats

**At-a-glance metrics:**

- **Total Games**: Published games count
- **Active Licenses**: Total licenses sold
- **Monthly Revenue**: LYTH earned this month
- **Downloads (30d)**: Total downloads last 30 days

### Recent Activity

**Activity feed:**

- Game submissions and status changes
- New license purchases
- Reviews and ratings
- Version updates

### Pending Actions

**Actionable items:**

- Games pending your action (fixes required)
- Claimable revenue
- Unanswered player reviews
- Expiring publisher verification

### Performance Charts

**Visual analytics:**

- Downloads over time (7d, 30d, 90d)
- Revenue trends
- Review score distribution

## Games Section

Manage your published games.

### Games List

Table view of all your games:

| Title | Status | Version | Downloads | Revenue | Rating |
|-------|--------|---------|-----------|---------|--------|
| MonoLands v2 | Live | 1.0.0 | 1,247 | 3,421 LYTH | 4.8⭐ |
| Pixel Quest | In Review | 0.9.1 | - | - | - |
| ... | ... | ... | ... | ... | ... |

**Statuses:**

- **Live**: Available in catalog, earning revenue
- **In Review**: Submitted, awaiting approval
- **Scanning**: Security scan in progress
- **Scan Failed**: Security issues detected
- **Rejected**: Did not meet content guidelines
- **Delisted**: Removed from catalog

**Actions:**

- **View**: Game details and analytics
- **Update**: Submit new version
- **Edit Metadata**: Change description, screenshots, etc.
- **Delist**: Remove from catalog (existing licenses remain valid)

### Submit New Game

Click "Submit New Game" to start submission flow:

1. **Basic Info**: Title, publisher, pricing
2. **Platforms**: Select Windows, macOS, Linux
3. **Build Upload**: Upload build files for each platform
4. **Metadata**: Description, screenshots, tags, age rating
5. **System Requirements**: Min and recommended specs
6. **Review**: Preview listing and submit

See [Submission Process](../publishing/submission-process.md) for detailed guide.

### Game Details Page

Click any game to view detailed page:

**Overview Tab:**

- Current status and version
- Download statistics (all-time, 30d, 7d)
- Revenue breakdown
- Review summary

**Builds Tab:**

- All uploaded versions
- Download signed builds
- View security scan reports
- Release notes

**Analytics Tab:**

- Downloads over time (charts)
- Geographic distribution
- Platform breakdown (Windows/macOS/Linux)
- Traffic sources

**Reviews Tab:**

- Player reviews and ratings
- Respond to reviews
- Flag inappropriate reviews

**Settings Tab:**

- Edit metadata
- Update screenshots
- Change pricing
- Configure DLC/updates

## Submissions Section

Track game submissions and reviews.

### Active Submissions

Games currently in review process:

| Game | Submitted | Status | Stage | ETA |
|------|-----------|--------|-------|-----|
| Pixel Quest | Feb 12 | Scanning | Security Scan | 15m |
| Space Raiders | Feb 10 | In Review | Manual Review | 2-3 days |

**Stages:**

1. **Upload Complete**: Waiting for scan
2. **Scanning**: Security analysis in progress
3. **Scan Complete**: Passed security, queued for review
4. **In Review**: Manual content review
5. **Approved**: Ready for signing
6. **Signing**: Code signing in progress
7. **Publishing**: Uploading to GRID
8. **Live**: Available in catalog

### Scan Reports

View security scan results:

- **Executive Summary**: Overall verdict
- **Detailed Findings**: Issues by severity
- **Remediation Steps**: How to fix issues
- **Appeal Option**: Request manual review if disagree

**Download PDF report** for records.

### Submission History

All past submissions with outcomes:

- Approved submissions with publish dates
- Rejected submissions with reasons
- Resubmissions and fixes

## Analytics Section

Detailed performance metrics and insights.

### Downloads

**Charts:**

- Downloads over time (7d, 30d, 90d, all-time)
- Download sources (direct, search, recommendation)
- Platform breakdown
- Geographic heatmap

**Filters:**

- Date range
- Specific game
- Platform
- Region

**Export:** CSV download for external analysis

### Revenue

**Revenue metrics:**

- Total revenue (all-time)
- Revenue by game
- Revenue over time
- Average revenue per license

**Claimable Revenue:**

Revenue earned but not yet withdrawn:

- **Available**: Ready to claim
- **Pending**: In current epoch, not yet finalized
- **Claimed**: Historical withdrawals

**Claim Button**: Withdraw LYTH to your wallet (minus gas fees)

### Player Demographics

**Insights:**

- Geographic distribution (top countries)
- Platform preferences
- Purchase patterns
- Retention metrics (coming soon)

### Reviews and Ratings

**Rating distribution:**

- 5-star, 4-star, 3-star, 2-star, 1-star counts
- Average rating over time
- Review sentiment analysis (positive/negative/neutral)

**Recent reviews** with ability to respond.

## Publisher Profile

Configure your public-facing publisher page.

### Basic Information

- **Display Name**: How you appear to players (editable once per 90 days)
- **Bio**: Short description of your studio (500 chars max)
- **Website**: Link to your site
- **Email**: Public contact email

### Branding

- **Publisher Logo**: 512x512 PNG
- **Banner Image**: 1920x400 PNG
- **Color Theme**: Primary brand color for profile page

### Social Links

Optional social media links:

- Twitter/X
- Discord
- YouTube
- Twitch
- Reddit
- Custom links (up to 3)

### Publisher Page Preview

Live preview of how your profile appears to players.

**Public URL**: `monoplay.xyz/publisher/your-studio-name`

## Settings Section

Account and integration settings.

### Account Settings

**Wallet Address**: Your publisher ID (read-only, cannot change)

**Email Preferences**:

- Submission updates
- Revenue notifications
- Review alerts
- Marketing emails (opt-in)

**Two-Factor Authentication**: Enable 2FA for extra security (email-based)

### API Access

Generate API keys for programmatic access:

**Create API Key:**

1. Click "Generate New Key"
2. Set permissions (read-only, write)
3. Name the key (for identification)
4. Save secret key (shown once)

**Key Management:**

- View active keys
- Revoke keys
- Monitor key usage

See [API Reference](./api-reference.md) for usage.

### Webhooks

Configure webhook endpoints for real-time notifications:

**Add Webhook:**

1. Enter endpoint URL
2. Select events:
   - Game published
   - License purchased
   - Review posted
   - Update released
3. Generate signing secret (verify webhook authenticity)

**Webhook Format:**

```json
{
  "event": "license.purchased",
  "timestamp": "2026-02-14T12:34:56Z",
  "data": {
    "game_id": "monolands-v2",
    "buyer": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "price": 25.0,
    "currency": "LYTH"
  },
  "signature": "sha256=..."
}
```

Verify signature using signing secret.

### Payout Settings

**Preferred Payout Schedule:**

- Daily (minimum 100 LYTH)
- Weekly (minimum 50 LYTH)
- Monthly (minimum 20 LYTH)
- Manual (no automatic payouts)

**Gas Fee Strategy:**

- Minimize fees (claim during low-traffic periods)
- Maximize speed (claim immediately regardless of fees)

### Security

**Active Sessions**: View and revoke active login sessions

**Audit Log**: Recent account activity (logins, settings changes, submissions)

**Verification Status**: Current publisher verification status and expiry

## Support Section

Get help and submit tickets.

### Knowledge Base

Searchable help articles:

- Submission guidelines
- Common rejection reasons
- Best practices
- Technical FAQs

### Submit Support Ticket

Contact MonoPlay team:

**Categories:**

- Technical Issues
- Account Problems
- Submission Questions
- Revenue/Payout Issues
- Report Abuse

**Response time**: 24-48 hours for most tickets

### Live Chat

Chat with support (available during business hours):

**Hours**: Monday-Friday, 9am-5pm EST

## Mobile Access

Developer Console is mobile-responsive:

- View analytics on phone/tablet
- Respond to reviews
- Monitor submission status
- Check revenue

**Limitations**: Build uploads require desktop browser.

## Keyboard Shortcuts

Efficiency shortcuts:

- `G` → Go to Games
- `S` → Submit New Game
- `A` → Analytics
- `P` → Publisher Profile
- `?` → Show all shortcuts

## Tips and Best Practices

### Optimize Your Listings

- **High-quality screenshots**: 1920x1080, actual gameplay
- **Compelling description**: Front-load key features
- **Accurate tags**: Improve discoverability
- **Regular updates**: Show active development

### Monitor Analytics

- Check analytics weekly
- Identify traffic sources
- Respond to reviews promptly
- Track conversion rates

### Revenue Optimization

- Price competitively (check similar games)
- Run launch discounts (20-30% off first week)
- Update regularly to maintain visibility
- Engage with community

### API Integration

- Use webhooks for real-time updates
- Automate routine tasks via API
- Monitor rate limits
- Cache API responses

## Troubleshooting

### Can't Connect Wallet

**Solutions:**

- Ensure on Monolythium network
- Clear browser cache
- Try different wallet
- Use incognito/private browsing

### Build Upload Fails

**Common causes:**

- File too large (50 GB limit)
- Slow internet connection
- Browser timeout
- Unsupported file format

**Solutions:**

- Compress builds further
- Use wired connection
- Increase browser timeout
- Verify file format

### API Key Not Working

**Check:**

- Key hasn't been revoked
- Correct permissions set
- Using correct header format: `Authorization: Bearer YOUR_KEY`
- Not exceeding rate limits

## Next Steps

Explore more developer tools:

- [API Reference](./api-reference.md) - REST API documentation
- [Smart Contracts](./smart-contracts.md) - On-chain integration
- [Submission Process](../publishing/submission-process.md) - How to submit games

Need help? Email developer-support@monoplay.xyz or join Discord #developer-support.
