# Claude Code Installation Guide - Windows

Complete installation guide for Claude Code on Windows using WSL2.

---

## Prerequisites

- Windows 10 (build 19041+) or Windows 11
- Administrator access
- BIOS/UEFI access for virtualization settings
- Claude Pro/Max subscription OR Anthropic API key
- ~30-45 minutes

---

## Overview

This guide covers:
1. WSL2 installation and configuration
2. BIOS virtualization enablement
3. Ubuntu setup
4. Node.js installation via NVM
5. Claude Code installation
6. Authentication and usage

---

## Quick Installation (TL;DR)

```powershell
# Enable WSL components
wsl.exe --install --no-distribution

# Reboot, enable virtualization in BIOS, then:
wsl --install

# In Ubuntu:
sudo apt update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts && nvm use --lts
curl -fsSL https://claude.ai/install.sh | bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc && source ~/.bashrc
claude --version
claude
```

---

## Detailed Installation

### 1. Enable WSL2

Open PowerShell or CMD as Administrator:

```cmd
wsl.exe --install --no-distribution
```

Expected output:
```
The operation completed successfully.
```

**Restart your system.**

---

### 2. Enable Hardware Virtualization

#### Intel Systems:
- BIOS setting: **Intel Virtualization Technology (VT-x)**
- Usually in: Advanced → CPU Configuration

#### AMD Systems:
- BIOS setting: **SVM Mode** or **AMD-V**
- Usually in: Advanced → CPU Configuration or M.I.T. → Advanced CPU Settings

#### Common BIOS Keys by Manufacturer:

| Manufacturer | Key |
|--------------|-----|
| Dell | F2, F12 |
| HP | F10, Esc |
| Lenovo | F1, F2, Fn+F2 |
| ASUS | F2, Del |
| Acer | F2, Del |
| MSI | Del |
| Gigabyte | Del, F2 |

**Steps:**
1. Restart and press the appropriate key during POST
2. Navigate to CPU/Processor settings
3. Enable virtualization (VT-x/AMD-V/SVM)
4. Save changes (usually F10) and exit

---

### 3. Install Ubuntu via WSL

After reboot:

```cmd
wsl --install
```

This will:
- Download Ubuntu (latest LTS)
- Install WSL2 kernel
- Set up Ubuntu as default distribution

**Create Unix user account when prompted:**
- Username: lowercase, no spaces
- Password: won't display when typing (standard Unix behavior)

---

### 4. Update System Packages

Launch Ubuntu and update package lists:

```bash
sudo apt update
sudo apt upgrade -y
```

---

### 5. Install Node.js via NVM

NVM (Node Version Manager) provides better version control:

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload shell configuration
source ~/.bashrc

# Install latest LTS Node.js
nvm install --lts

# Set as active version
nvm use --lts

# Verify installation
node --version
npm --version
```

---

### 6. Install Claude Code

#### Native Binary Installation (Recommended)

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

#### Add to PATH

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

#### Verify Installation

```bash
claude --version
```

Expected output: `2.1.x (Claude Code)`

---

### 7. Authentication

#### Option A: Claude Pro/Max Subscription

```bash
claude
```

Follow OAuth flow:
1. Select theme preference
2. Choose "Claude account with subscription"
3. Browser will open automatically (or copy link with `c`)
4. Authorize in browser
5. Paste authorization code back in terminal

#### Option B: Anthropic API

```bash
# Set API key (temporary)
export ANTHROPIC_API_KEY="sk-ant-your-key-here"

# Make permanent
echo 'export ANTHROPIC_API_KEY="sk-ant-your-key-here"' >> ~/.bashrc
```

Get API key: https://console.anthropic.com/settings/keys

#### Option C: Enterprise Platforms

Supports:
- Amazon Bedrock
- Google Vertex AI
- Microsoft Azure Foundry

Configuration via Claude Code settings.

---

## Usage

### Basic Commands

```bash
# Navigate to project directory
cd /mnt/c/Users/YourName/project-name

# Start Claude Code
claude

# Inside Claude Code:
/help          # Show all commands
/init          # Analyze and document project
/model         # Switch between models
/clear         # Clear conversation
/exit          # Exit Claude Code
```

### Model Selection

- **Haiku 4.5**: Fast, efficient for routine tasks
- **Opus 4.6**: Most capable, for complex work
  - Medium effort: Balanced (default)
  - High effort: Maximum reasoning depth

### File System Access

Windows drives are mounted at `/mnt/`:
- `C:\` → `/mnt/c/`
- `D:\` → `/mnt/d/`

Example:
```bash
cd /mnt/c/Users/username/Documents/project
```

---

## Configuration

### Default Model

```bash
# Set in ~/.claude/settings.json
{
  "model": "claude-sonnet-4-5-20250929",
  "effort": "medium"
}
```

### Project-specific Settings

Create `.claude/` in project root:

```bash
# .claude/settings.json
{
  "model": "claude-opus-4-5-20251101",
  "effort": "high"
}
```

### MCP Servers (Model Context Protocol)

Enable integrations:

```bash
claude mcp add server-name -s local -- command
```

Available servers:
- **Filesystem**: Local file access
- **Git**: Repository operations
- **Browser**: Web automation via Playwright
- **Database**: SQL query execution

---

## Advanced Usage

### Project Initialization

```bash
# Create comprehensive project documentation
/init

# This generates CLAUDE.md with:
# - Project structure
# - Dependencies
# - Architecture overview
# - Key patterns and conventions
```

### Code Generation

```
Create a REST API endpoint for user authentication using Express and JWT
```

### Debugging

```
Analyze test-deploy.js for potential race conditions
```

### Refactoring

```
Refactor the authentication module to use async/await instead of callbacks
```

---

## Troubleshooting

### WSL2 Not Supported Error

**Issue:** `Wsl/InstallDistro/Service/RegisterDistro/CreateVm/HCS/HCS_E_HYPERV_NOT_INSTALLED`

**Solution:**
1. Enable virtualization in BIOS (see section 2)
2. Enable Windows features:
   ```cmd
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   ```
3. Restart system

### Claude Command Not Found

**Solution:**
```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### OAuth Authentication Failure

**Issue:** `OAuth error: Request failed with status code 400`

**Solutions:**
- Retry authentication (links expire quickly)
- Ensure browser cookies are enabled
- Try incognito/private mode
- Check system time is correct

### Node.js Version Issues

**Solution:**
```bash
# Install specific version
nvm install 18.20.0
nvm use 18.20.0

# Set as default
nvm alias default 18.20.0
```

### WSL Performance Issues

**Optimize WSL2 memory usage:**

Create/edit `%USERPROFILE%\.wslconfig`:

```ini
[wsl2]
memory=4GB
processors=2
swap=2GB
```

Restart WSL:
```cmd
wsl --shutdown
```

---

## Performance Optimization

### WSL2 Integration

For better performance with Windows files:
- Store projects in Linux filesystem (`~/projects/`)
- Use symbolic links if needed: `ln -s /mnt/c/Users/name/project ~/project`

### Git Configuration

```bash
# Configure Git in WSL
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Enable credential helper
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager.exe"
```

---

## API Usage & Billing

### Claude Pro/Max
- Fixed monthly cost ($20/$100)
- Higher rate limits
- Recommended for heavy usage

### API Pay-per-use
- Charges per token
- ~$3-15 per 1M tokens (model dependent)
- Add credits at console.anthropic.com
- Set up billing alerts

### Cost Optimization
- Use Haiku for routine tasks
- Reserve Opus for complex work
- Monitor usage in Console

---

## Uninstallation

### Remove Claude Code

```bash
rm ~/.local/bin/claude
rm -rf ~/.local/share/claude
rm -rf ~/.claude
rm ~/.claude.json
```

### Remove WSL

PowerShell (Admin):
```powershell
wsl --unregister Ubuntu
wsl --uninstall
```

### Clean NVM

```bash
rm -rf ~/.nvm
# Remove NVM lines from ~/.bashrc
```

---

## Additional Resources

- **Official Documentation**: https://code.claude.com/docs
- **API Documentation**: https://docs.anthropic.com
- **Console Dashboard**: https://console.anthropic.com
- **Community**: https://discord.gg/anthropic

---

## Security Considerations

- Never commit API keys to version control
- Use environment variables for sensitive data
- Enable 2FA on Anthropic account
- Regularly rotate API keys
- Review MCP server permissions
- Monitor API usage for anomalies

---

## Environment Variables

Common configurations:

```bash
# API Key
export ANTHROPIC_API_KEY="sk-ant-..."

# Model preference
export ANTHROPIC_MODEL="claude-sonnet-4-5-20250929"

# Custom API endpoint (enterprise)
export ANTHROPIC_API_URL="https://custom.endpoint.com"

# Make permanent in ~/.bashrc
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.bashrc
```

---

## Keyboard Shortcuts

Inside Claude Code:

- `Ctrl+C` - Interrupt current operation
- `Ctrl+D` - Exit (alternative to /exit)
- `↑/↓` - Navigate command history
- `Tab` - Autocomplete (when available)
- `?` - Show shortcuts menu

---

## System Requirements

### Minimum
- 4GB RAM
- 10GB free disk space
- Dual-core processor with virtualization support

### Recommended
- 8GB+ RAM
- 20GB+ free disk space
- Quad-core processor
- SSD for better performance

---

## Version Information

- **Claude Code**: 2.1.42+
- **WSL**: 2.0+
- **Ubuntu**: 22.04 LTS or 24.04 LTS
- **Node.js**: 18.x LTS or newer
- **NVM**: 0.39.7+

---

## Changelog & Updates

Claude Code auto-updates by default. Check version:

```bash
claude --version
```

Manual update (if needed):
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

---

## Platform Comparison

| Feature | WSL2 (Windows) | Native Linux | macOS |
|---------|----------------|--------------|-------|
| Installation | Medium complexity | Easy | Easy |
| Performance | Good | Excellent | Excellent |
| File system | Requires /mnt/ | Direct | Direct |
| Updates | Manual WSL updates | Package manager | Homebrew |

---

## Known Limitations

- Windows Defender may slow file operations
- Path length limits on Windows side
- Line ending differences (CRLF vs LF)
- Case-sensitivity differences
- File permission mapping

**Workarounds:**
- Store projects in WSL filesystem
- Configure Git: `git config --global core.autocrlf input`
- Use WSL-native editors when possible

---

**Last Updated:** February 2026  
**Maintained by:** Community Contributors  
**License:** MIT

---

*For issues or contributions, visit the official documentation.*
