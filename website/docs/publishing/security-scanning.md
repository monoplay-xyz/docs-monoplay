---
sidebar_position: 4
---

# Security Scanning

Every game submitted to MonoPlay undergoes automated security analysis before distribution. This protects players from malware, wallet theft, and other security threats.

## Scanning Process

Security scans begin automatically after build upload:

1. **File extraction**: Build archives unpacked in isolated environment
2. **Static analysis**: Executables and scripts analyzed without execution
3. **YARA scanning**: Pattern matching against known malware signatures
4. **Dependency check**: Third-party libraries checked for known vulnerabilities
5. **Behavioral analysis**: Code examined for suspicious patterns
6. **Report generation**: Results compiled and made available to publisher

Typical scan duration: 15-30 minutes, depending on build size and complexity.

## What We Check

### Malware Detection

Scans identify:

- Known malware signatures
- Trojan patterns
- Ransomware characteristics
- Backdoors and remote access tools
- Keyloggers and screen capture tools
- Browser hijackers
- Adware and unwanted software

### Cryptocurrency Threats

Specific checks for blockchain-related attacks:

- **Wallet theft**: Code attempting to access wallet files or seed phrases
- **Clipboard hijacking**: Monitoring clipboard for wallet addresses
- **Crypto miners**: Unauthorized cryptocurrency mining software
- **Transaction manipulation**: Code modifying transaction parameters
- **Private key harvesting**: Attempts to access stored private keys

MonoPlay runs on blockchain infrastructure, making these threats particularly relevant.

### Network Activity

Analysis of network behavior:

- Unauthorized data exfiltration
- Command-and-control server communication
- Suspicious API endpoints
- Unencrypted transmission of sensitive data
- Hard-coded credentials or API keys

### Code Obfuscation

Excessive obfuscation triggers warnings:

- Code deliberately made unreadable
- Encrypted payloads without clear purpose
- Runtime code generation without justification
- Anti-debugging techniques

Reasonable obfuscation (DRM, anti-cheat) is acceptable if disclosed.

### Prohibited Content

Automated detection of:

- Child sexual abuse material (CSAM)
- Illegal content based on platform policies
- Copyright violations (where detectable)
- Impersonation of other games or brands

## Scan Results

### Verdict Types

Each scan produces one of three verdicts:

**PASS** (Green)
- No security issues detected
- Game proceeds to manual review
- Typical outcome for legitimate games

**WARN** (Yellow)
- Minor issues detected
- Manual review required
- Publisher may need to explain findings
- Common for games with anti-cheat or DRM

**FAIL** (Red)
- Serious security threats detected
- Game rejected immediately
- Detailed report provided to publisher
- Must fix issues and resubmit

### Reading Your Report

Scan reports include:

**Executive Summary:**
- Overall verdict
- Critical findings count
- Warnings count
- Recommended actions

**Detailed Findings:**

Each issue includes:
- Severity level (Critical, High, Medium, Low)
- Category (malware, network, obfuscation, etc.)
- File location (path within build)
- Detection method (YARA rule, static analysis, etc.)
- Description of the issue
- Recommended remediation

**Example Finding:**

```
Severity: HIGH
Category: Cryptocurrency Threat
File: bin/game.exe
Offset: 0x4F2A10
Detection: Clipboard monitoring for wallet addresses

Description: Code detected that monitors system clipboard and
searches for Ethereum address patterns. This is commonly used
to steal cryptocurrency by replacing copied addresses.

Recommendation: Remove clipboard monitoring or explain
legitimate use case to reviewers.
```

### False Positives

Legitimate game functionality may trigger warnings:

**Anti-Cheat Systems:**
- Process scanning
- Memory inspection
- Driver-level hooks

**DRM Protection:**
- Code obfuscation
- Integrity checks
- Online activation

**Modding Support:**
- Dynamic code loading
- Script execution
- Plugin systems

**Legitimate Network Features:**
- Telemetry and analytics
- Multiplayer networking
- Cloud saves

If your game triggers false positives, include an explanation in your submission notes.

## Common Issues and Solutions

### Issue: Clipboard Monitoring Detected

**Cause**: Legitimate features like "copy server IP" or screenshot tools.

**Solution**:
- Explain legitimate use in submission notes
- Limit clipboard access to specific user actions
- Request permission explicitly in-game

### Issue: Crypto Miner Detected

**Cause**: Algorithms similar to mining (hashing, proof-of-work).

**Solution**:
- Document why these algorithms are used (blockchain integration, anti-cheat)
- Use well-known libraries with clean reputation
- Explain in submission notes

### Issue: Obfuscation Warning

**Cause**: Code protection, DRM, or anti-cheat.

**Solution**:
- Disclose DRM/anti-cheat in game description
- Provide unobfuscated code samples to reviewers (via secure channel)
- Use industry-standard protection tools

### Issue: Unknown Third-Party Libraries

**Cause**: Dependencies with CVE vulnerabilities or unclear origins.

**Solution**:
- Update to latest library versions
- Remove unused dependencies
- Use reputable, well-maintained libraries
- Include license files and attribution

## Improving Scan Results

### Best Practices

**Before Submission:**
- Remove debug code and development tools
- Update all dependencies to latest stable versions
- Scan your build with public antivirus tools
- Remove unnecessary embedded resources
- Strip debug symbols if not needed

**Code Hygiene:**
- Avoid hard-coded secrets (API keys, passwords)
- Use HTTPS for all network communication
- Implement proper error handling
- Follow secure coding guidelines

**Transparency:**
- Document unusual functionality in submission notes
- Disclose all third-party libraries used
- Explain any DRM or anti-cheat systems
- Provide contact info for security questions

### Tools and Resources

**Recommended Pre-Scan Tools:**

- **VirusTotal**: Multi-engine malware scan
- **Dependency-Check**: OWASP dependency vulnerability scanner
- **Bandit** (Python): Security linter
- **ESLint Security Plugin** (JavaScript): Static analysis
- **GolangCI-Lint** (Go): Includes security checks

Run these before submitting to catch issues early.

## Rescanning and Resubmission

If your scan fails:

1. Review the detailed scan report
2. Fix identified issues in your code
3. Rebuild and test locally
4. Resubmit through Developer Console
5. Add notes explaining changes made

**Resubmission Policy:**
- Unlimited resubmissions allowed
- Each resubmission requires new scan
- No additional fees for failed scans
- Persistent issues may trigger manual review

## Appeal Process

Disagree with scan results?

1. Click "Request Manual Review" in Developer Console
2. Provide detailed explanation of false positive
3. Include technical justification
4. Attach supporting documentation (library docs, code samples)
5. Security team reviews within 2-3 business days

Appeals are handled by human reviewers with software engineering expertise.

## Privacy and Data Handling

**Your code is never:**
- Shared with third parties
- Stored long-term
- Used for any purpose other than security scanning
- Accessible to other publishers

**Scan environment:**
- Fully isolated virtual machines
- No network access (air-gapped)
- Wiped after scan completion
- Logs retained for 30 days for appeal purposes only

## Next Steps

Scan passed? Your game moves to [Manual Review](./submission-process.md#submission-statuses).

Want to understand code signing? See [Code Signing](./code-signing.md).

Questions about prohibited content? Check [Content Guidelines](./content-guidelines.md).
