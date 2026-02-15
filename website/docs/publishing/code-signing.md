---
sidebar_position: 5
---

# Code Signing

MonoPlay digitally signs all approved games before distribution. This ensures players know your game is legitimate and hasn't been tampered with.

## What is Code Signing?

Code signing uses cryptographic signatures to verify software authenticity:

- **Identity verification**: Confirms the software publisher
- **Integrity protection**: Detects unauthorized modifications
- **Trust establishment**: Operating systems recognize signed software

Without code signing, players see "unknown publisher" warnings that discourage downloads.

## How MonoPlay Signing Works

### Publisher-Authorized Signing

MonoPlay signs games **on behalf of publishers**:

1. Publisher submits game and passes security review
2. Publisher authorizes MonoPlay to sign via smart contract
3. MonoPlay applies its trusted code signing certificate
4. Game distributed with dual attribution:
   - **Signer**: MonoPlay Platform
   - **Publisher**: [Your Studio Name]

Players see: "Published by [Your Studio] via MonoPlay"

### Why Not Self-Signing?

Code signing certificates are expensive and complex:

- **Cost**: $300-500 USD per year per platform
- **Validation**: Extended validation (EV) required for Windows
- **Hardware**: EV certificates require physical USB token
- **Reputation**: New certificates trigger warnings until trust is established

MonoPlay handles all of this, saving publishers time and money.

## Platform-Specific Signing

### Windows Code Signing

**Certificate Type**: Extended Validation (EV)

**What's Signed:**
- .exe executables
- .dll libraries
- .msi installers
- .appx packages

**Player Experience:**
- No SmartScreen warnings
- Verified publisher shown in properties
- Windows Defender recognizes signature

**Technical Details:**
- SHA-256 with RSA (4096-bit)
- RFC 3161 timestamping
- Signed with DigiCert certificate

### macOS Code Signing

**Certificate Type**: Apple Developer ID Application

**What's Signed:**
- .app bundles
- .dmg disk images
- .pkg installers
- Frameworks and dylibs

**Player Experience:**
- No Gatekeeper warnings ("app from unidentified developer")
- Verified in System Preferences > Security
- Installable without right-click workarounds

**Technical Details:**
- Apple Developer ID certificate
- Hardened runtime enabled
- Notarized via Apple notary service
- Includes secure timestamp

### Linux Code Signing

**Certificate Type**: X.509 code signing certificate

**What's Signed:**
- AppImage files
- Flatpak bundles
- Binary executables

**Player Experience:**
- Verified via GPG signature check
- Repository managers show verified status
- No OS-level warnings

**Technical Details:**
- GPG/PGP signature attached
- SHA-512 checksums included
- Signed with MonoPlay Linux signing key

## Signing Process Timeline

After your game is approved:

1. **Preparation** (1-2 minutes): Build files prepared for signing
2. **Signing** (5-10 minutes): Signatures applied to all executables
3. **Verification** (2-3 minutes): Signatures validated
4. **Notarization** (macOS only, 10-30 minutes): Apple notary service review
5. **Packaging** (5-10 minutes): Signed builds packaged for distribution
6. **Upload to GRID** (varies): Torrent creation and initial seeding

Total time: 15-45 minutes depending on build size and platform.

## Signature Verification

### For Publishers

Verify your signed builds in Developer Console:

**Download signed build:**
1. Navigate to game page > Versions
2. Click "Download Signed Build" for verification
3. Compare checksums with unsigned original

**Verify signature:**

**Windows:**
```powershell
Get-AuthenticodeSignature .\game.exe | Format-List
```

**macOS:**
```bash
codesign --verify --verbose=4 Game.app
spctl --assess --verbose=4 Game.app
```

**Linux:**
```bash
gpg --verify game.AppImage.sig game.AppImage
```

### For Players

Players can verify signatures before running games:

**Windows:**
- Right-click .exe > Properties > Digital Signatures tab
- Shows "MonoPlay Platform" with publisher details

**macOS:**
- Right-click .app > Show Package Contents
- Check _CodeSignature folder exists
- Terminal: `codesign -dv Game.app`

**Linux:**
- Check AppImage signature file
- Verify with: `gpg --verify`

## Signature Revocation

Signatures can be revoked in specific scenarios:

**Automatic Revocation:**
- Game found to contain malware after approval
- Publisher account suspended for violations
- DMCA takedown request validated
- Critical security vulnerability discovered

**Manual Revocation:**
- Publisher requests takedown
- Legal or regulatory requirement
- Platform policy violation

**Impact:**
- Operating systems will warn about revoked signatures
- Game delisted from catalog
- Existing downloads may trigger security warnings
- GRID nodes stop seeding

## Certificates and Trust

### Root Certificates

MonoPlay signatures chain to trusted root authorities:

- **Windows**: DigiCert Trusted Root
- **macOS**: Apple Root CA
- **Linux**: MonoPlay GPG key (distributed via keyservers)

Players' operating systems trust these roots by default.

### Certificate Details

**Windows Certificate:**
- Issuer: DigiCert
- Subject: MonoPlay Platform, Inc.
- Valid: 3 years (renewed automatically)
- Key Usage: Code Signing

**macOS Certificate:**
- Issuer: Apple Developer Relations
- Team ID: [Redacted for public docs]
- Valid: 1 year (renewed automatically)

**Linux GPG Key:**
- Key ID: Available at keybase.io/monoplay
- Fingerprint: Published in documentation
- Signed by MonoPlay security team

## Compliance and Auditing

### Security Standards

MonoPlay signing infrastructure meets:

- **NIST FIPS 140-2**: Cryptographic module validation
- **Common Criteria**: EAL2+ for key storage
- **WebTrust**: Audit for certificate authorities

### Key Storage

Code signing keys protected via:

- Hardware Security Modules (HSMs)
- Multi-party authorization required
- Air-gapped signing environment
- Comprehensive audit logging

### Annual Audits

Independent security audits conducted annually:

- Key management procedures reviewed
- Signing process validated
- Access controls verified
- Results published in transparency report

## Frequently Asked Questions

### Can I use my own code signing certificate?

Not currently. MonoPlay signing ensures consistent player experience and prevents certificate abuse.

### What happens if MonoPlay's certificate expires?

Certificates renewed automatically before expiration. Signed games remain valid even if certificate later expires (due to timestamping).

### Do I need to renew signatures annually?

No. Signatures are permanent and timestamped. No renewal needed.

### Can players verify my game came from me?

Yes. Signatures include publisher attribution. Players see your studio name alongside MonoPlay's signature.

### What if I leave MonoPlay?

Games remain signed and functional. You can delist games but cannot remove existing signatures. Export your game and self-sign for distribution elsewhere.

### Does signing affect game performance?

No. Code signing adds minimal overhead (typically under 1% startup time increase). No runtime performance impact.

## Best Practices

**For Publishers:**

- Download and verify signed builds before distribution
- Communicate to players that MonoPlay signs on your behalf
- Include signature verification instructions in game documentation
- Report signature issues immediately

**For Players:**

- Always verify signatures before running downloaded games
- Install only from official MonoPlay distribution
- Report unsigned versions found on third-party sites
- Keep operating system updated for latest certificate trust lists

## Support

Questions about code signing?

- **Email**: security@monoplay.xyz
- **Documentation**: [Smart Contracts](../developers/smart-contracts.md)
- **Technical Support**: developer-support@monoplay.xyz

## Next Steps

Game signed and live? Learn about [Content Guidelines](./content-guidelines.md).

Want technical details? See [Smart Contracts](../developers/smart-contracts.md).
