# Security Policy

## About This Repository

This repository hosts vibe-coded apps: experimental, AI-assisted projects built
for learning and personal use. Code here may not follow production security
standards. Use anything from this repo at your own risk.

## Scope

These apps are **not** intended for production deployment or handling sensitive
data. No uptime, patching, or incident response SLA is offered or implied.

If you deploy any of these apps yourself, you are responsible for your own
security posture.

## Supported Versions

There are no versioned releases. All work is on `main`. Only the latest commit
is considered current.

## Reporting a Vulnerability

If you find something worth flagging -- a hardcoded credential, an obvious
injection vector, a dependency with a known critical CVE -- please report it
responsibly rather than opening a public issue.

**How to report:**
- Email: [security@ishaqzafar.com]
- Or open a [GitHub private security advisory](https://github.com/KeyboardMonkey/vibe-artifacts/security/advisories/new)

**What to include:**
- Which file or app is affected
- A brief description of the issue
- Steps to reproduce or a proof of concept (if applicable)

**What to expect:**
- Acknowledgement within a few days (best effort, no SLA)
- A fix or a documented decision to accept the risk, depending on severity
- Credit in the commit message if you want it

## Out of Scope

The following will not be acted on:

- Theoretical risks without a realistic attack path
- Issues in apps you have deployed yourself in a modified state
- Missing security headers on apps not intended for public hosting
- Dependency version bumps unless a critical/high CVE is actively exploitable

## Dependencies and AI-Generated Code

Some code in this repo was generated or heavily assisted by AI tools. Dependency
hygiene and code review coverage may be incomplete. If you spot a real risk,
the report is appreciated.
