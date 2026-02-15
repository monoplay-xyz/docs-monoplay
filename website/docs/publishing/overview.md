---
sidebar_position: 1
---

# Publishing Overview

MonoPlay provides a streamlined platform for game developers to distribute their games on the Monolythium blockchain. This section covers the complete publishing lifecycle, from registration to distribution.

## Who Can Publish

Any game developer or studio can publish games on MonoPlay by:

- Connecting a Monolythium-compatible wallet
- Completing publisher registration and verification
- Paying a submission deposit in LYTH
- Adhering to our content guidelines

Both individual developers and studios are welcome. Publishers maintain full ownership of their intellectual property.

## Publishing Lifecycle

### 1. Register as a Publisher

Before submitting games, you must register as a verified publisher:

- Connect your wallet to the Developer Console
- Submit legal information and identity verification
- Pay the publisher registration deposit
- Await verification (typically 1-3 business days)

See [Publisher Registration](./registration.md) for details.

### 2. Submit Your Game

Once verified, submit your game through the Developer Console:

- Upload build files for each platform (Windows, macOS, Linux)
- Provide metadata: title, description, screenshots, tags, age rating
- Set pricing and licensing options
- Pay the submission fee

Games are queued for security scanning immediately after submission.

### 3. Security Scanning

Every submission undergoes automated security analysis:

- Static code analysis
- YARA rule scanning for malware patterns
- Dependency vulnerability checks
- Prohibited content detection

Scans typically complete within 30 minutes. Results are visible in the Developer Console.

### 4. Review Process

Games that pass security scanning enter manual review:

- Content policy compliance check
- Metadata accuracy verification
- Age rating validation
- Final approval decision

Review times vary based on game size and complexity, typically 2-5 business days.

### 5. Approval and Signing

Approved games are digitally signed by MonoPlay:

- Code signing certificates applied for Windows, macOS, and Linux
- Build integrity verified
- Game registered on-chain via GameRegistry contract
- Release metadata recorded via ReleaseRegistry

Players downloading your game will see "Published by [Your Studio]" with MonoPlay's trusted signature.

### 6. Distribution

Once signed, your game is distributed through GRID:

- Build files converted to torrent format
- Seeded by GRID nodes worldwide
- Available in the MonoPlay Launcher catalog
- Players can purchase licenses and download immediately

## Submission Fees

Publishing requires two types of fees:

| Fee Type | Amount | When Charged | Refundable |
|----------|--------|--------------|------------|
| **Publisher Registration** | 500 LYTH | First-time registration | Yes, if rejected |
| **Game Submission** | 100 LYTH per game | Each submission | No |

Submission fees prevent spam and fund security infrastructure. Registration deposits are returned if your publisher application is rejected.

## Version Management

After initial approval, you can submit updates:

- New versions follow the same security scanning process
- Players with existing licenses receive update notifications
- Major version changes may require re-review
- Hotfixes for critical bugs are prioritized

## Publisher Dashboard

Track all your games and submissions in the Developer Console:

- Submission status tracking
- Download and sales analytics
- Revenue reports
- Player reviews and ratings
- Support ticket management

## Support

Need help publishing? Resources available:

- **Documentation**: Detailed guides for each step
- **Developer Forum**: Community support and best practices
- **Email Support**: developer-support@monoplay.xyz
- **Discord**: Real-time help from the MonoPlay team

## Next Steps

Ready to publish? Start with [Publisher Registration](./registration.md).

Already registered? Learn about the [Submission Process](./submission-process.md).
