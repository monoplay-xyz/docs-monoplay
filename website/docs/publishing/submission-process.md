---
sidebar_position: 3
---

# Submission Process

Submit your game to MonoPlay through the Developer Console. This guide walks through every step from build preparation to final approval.

## Before You Submit

### Build Requirements

Prepare builds for each platform you support:

**Windows:**
- 64-bit executable (.exe)
- Minimum: Windows 10 version 1809
- Packaged as ZIP or installer (NSIS, Inno Setup, WiX)
- Maximum size: 50GB per build

**macOS:**
- Universal Binary (Intel + Apple Silicon) or separate builds
- Minimum: macOS 12 Monterey
- Packaged as .app bundle, .dmg, or .pkg
- Must be unsigned (MonoPlay signs on your behalf)
- Maximum size: 50GB per build

**Linux:**
- AppImage, Flatpak, or tar.gz archive
- Target: Ubuntu 22.04+ (glibc 2.35+)
- Include dependencies or use static linking
- Maximum size: 50GB per build

### Metadata Preparation

Gather the following before starting:

- Game title (3-100 characters)
- Short description (10-160 characters, used in catalog cards)
- Full description (200-5000 characters, Markdown supported)
- At least 3 screenshots (1920x1080 PNG or JPG)
- Game logo (512x512 PNG, transparent background recommended)
- Header image (1920x600 PNG or JPG, used on game page)
- Genre and category tags
- Age rating and content descriptors
- System requirements (minimum and recommended)

## Submission Steps

### 1. Create New Game Entry

In the Developer Console:

1. Click "Submit New Game"
2. Enter the game title
3. Select supported platforms
4. Choose pricing model:
 - **Free**: No purchase required
 - **Paid**: One-time purchase (minimum 5 LYTH)
 - **Free-to-Play**: Free download with optional in-game purchases

### 2. Upload Build Files

For each platform:

1. Click "Upload Build" for the platform
2. Select your build archive
3. Provide version number (semantic versioning: 1.0.0)
4. Add release notes for this version
5. Wait for upload completion (progress bar shown)

**Upload Tips:**
- Use stable, fast internet connection
- Uploads can be resumed if interrupted
- Large files may take 30+ minutes
- Verify checksum after upload completes

### 3. Add Metadata

Complete all required fields:

**Basic Information:**
- Game title (editable, but changes require re-review)
- Developer name (defaults to publisher display name)
- Publisher name (your verified publisher name, read-only)
- Release date (planned or actual)
- Website URL (optional)

**Descriptions:**
- Short description (shown in catalog cards)
- Full description (Markdown formatting supported)
- Features list (bullet points, up to 10 items)
- Story/overview (optional, for narrative-driven games)

**Media Assets:**
- Logo (required, 512x512)
- Header image (required, 1920x600)
- Screenshots (minimum 3, maximum 20, 1920x1080)
- Trailer video (optional, YouTube or direct MP4 link)

**Classification:**
- Primary genre (Action, RPG, Strategy, Puzzle, etc.)
- Secondary genre (optional)
- Tags (minimum 3, maximum 15)
- Age rating (Everyone, Teen, Mature, Adults Only)
- Content descriptors (violence, language, etc.)

**System Requirements:**

For each platform, specify minimum and recommended:
- OS version
- CPU (model or equivalent)
- RAM (in GB)
- GPU (model or equivalent)
- Storage space
- Additional notes (DirectX version, specific drivers, etc.)

### 4. Configure Pricing

**For Paid Games:**
- Set price in LYTH (minimum 5 LYTH)
- Optionally enable regional pricing
- Configure launch discount (optional, up to 50% off)

**For Free-to-Play:**
- Indicate if in-game purchases exist
- Provide in-app purchase ranges (cosmetic, gameplay, etc.)

**License Options:**
- Single-user license (default)
- Multi-user license (family sharing, up to 5 devices)
- Commercial license (for content creators)

### 5. Review and Submit

Before final submission:

1. Preview how your game appears in the catalog
2. Review all metadata for accuracy
3. Verify build checksums match your local files
4. Read and accept the Publisher Agreement
5. Pay the submission fee (100 LYTH)

Click "Submit for Review" to queue for security scanning.

## Submission Statuses

Track your submission status in the Developer Console:

| Status | Meaning | Next Step |
|--------|---------|-----------|
| **Uploading** | Build files uploading | Wait for completion |
| **Queued** | Waiting for security scan | Automated, no action needed |
| **Scanning** | Security analysis in progress | Usually 15-30 minutes |
| **Scan Failed** | Security issues detected | Review scan report, fix issues, resubmit |
| **In Review** | Manual review by MonoPlay team | Wait for reviewer feedback |
| **Approved** | Ready for signing and distribution | Automated signing process begins |
| **Signing** | Code signing in progress | Usually 5-10 minutes |
| **Live** | Available in catalog | Players can purchase and download |
| **Rejected** | Did not meet content guidelines | Review rejection reason, resubmit |

## After Approval

Once your game goes live:

- Appears in the MonoPlay Launcher catalog
- Distributed via GRID seeder nodes
- Analytics available in Developer Console
- Revenue tracked and withdrawable

## Updating Your Game

Submit patches and updates:

1. In Developer Console, select your game
2. Click "Upload New Version"
3. Provide new build files
4. Add version number and release notes
5. Choose update type:
 - **Hotfix**: Critical bugs, fast-tracked review
 - **Patch**: Bug fixes and minor improvements
 - **Minor Update**: New features, same security scan process
 - **Major Update**: Significant changes, full re-review

Players with existing licenses receive update notifications automatically.

## Submission Checklist

Before submitting, verify:

- [ ] Builds tested on minimum spec hardware
- [ ] All platform builds functional
- [ ] No placeholder text in metadata
- [ ] Screenshots represent actual gameplay
- [ ] Age rating accurately reflects content
- [ ] System requirements verified
- [ ] Pricing set correctly
- [ ] Trailer video tested (if provided)
- [ ] Release notes written
- [ ] Publisher profile complete
- [ ] 100 LYTH submission fee available

## Common Issues

### Upload Failures

If uploads fail repeatedly:

- Check file size limits (50GB per platform)
- Verify internet connection stability
- Try different browser (Chrome/Firefox recommended)
- Compress builds further if near size limit
- Contact support if issue persists

### Metadata Validation Errors

Common mistakes:

- Description too short (minimum 200 characters)
- Not enough screenshots (minimum 3)
- Invalid image dimensions
- Missing required system requirements
- Prohibited content in descriptions

### Version Number Conflicts

- Each version number must be unique
- Cannot reuse version numbers from rejected submissions
- Use semantic versioning: MAJOR.MINOR.PATCH

## Support

Need help with submission?

- **Email**: submissions@monoplay.xyz
- **Discord**: #publisher-support channel
- **Documentation**: Check [Developer Console](../developers/dev-console.md) guide

## Next Steps

Submission complete? Learn about [Security Scanning](./security-scanning.md).

Want to optimize your game listing? See [Content Guidelines](./content-guidelines.md).
