<#
.SYNOPSIS
  Integration script for Attacking-AI security-module16-v1 (post-ZIP download).

.DESCRIPTION
  After downloading + unzipping the course ZIP from Google Drive:
  1. Run this from repo root:  .\docs\security\apply-module16-from-zip.ps1 -ZipExtractedPath "C:\Users\...\unzipped-module16"
  2. Script copies canonical files into docs/security/ (overwrites stubs), 
     stages example diffs if present in ZIP, and prints next commands.
  3. Manually review + apply src/ stubs, run lint/typecheck/test, commit.

.PARAMETER ZipExtractedPath
  Full path to the directory containing the extracted ZIP contents (the folder with MODULE*.md, slides/, code/, etc.)

.EXAMPLE
  pwsh -File docs/security/apply-module16-from-zip.ps1 -ZipExtractedPath "D:\Downloads\Attacking-AI-module16"
#>
param(
  [Parameter(Mandatory=$true)]
  [string]$ZipExtractedPath
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot | Split-Path -Parent
$targetDir = Join-Path $repoRoot "docs/security"

Write-Host "=== security-module16-v1 integration ===" -ForegroundColor Cyan
Write-Host "Repo root: $repoRoot"
Write-Host "ZIP source: $ZipExtractedPath"
Write-Host "Target: $targetDir"

if (-not (Test-Path $ZipExtractedPath)) {
  throw "ZIP extracted path not found: $ZipExtractedPath"
}

# Copy key artifacts (adjust names based on actual ZIP structure)
$filesToCopy = @(
  "SECURITY_MODULE16_DEFENSES.md",
  "MODULE17_COMPLIANCE.md",
  "MODULE18_SWARM.md",
  "SUMMARY_18_MODULES.md",
  "README-SECURITY-MODULE16.md"
)

foreach ($f in $filesToCopy) {
  $src = Join-Path $ZipExtractedPath $f
  if (Test-Path $src) {
    Copy-Item $src (Join-Path $targetDir $f) -Force
    Write-Host "Copied: $f" -ForegroundColor Green
  } else {
    Write-Host "SKIP (not in ZIP): $f" -ForegroundColor Yellow
  }
}

# Optional: copy any sdk-specific/ or code-diffs/ if present
$diffSrc = Join-Path $ZipExtractedPath "paybot-sdk-diffs"
if (Test-Path $diffSrc) {
  $out = Join-Path $targetDir "from-zip-diffs"
  New-Item -ItemType Directory -Path $out -Force | Out-Null
  Copy-Item "$diffSrc\*" $out -Recurse -Force
  Write-Host "Copied diffs to: $out" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Next manual steps ===" -ForegroundColor Cyan
Write-Host "1. Review copied files and any from-zip-diffs/"
Write-Host "2. Apply relevant code changes to src/ (see paybot-integration.md)"
Write-Host "3. cd $repoRoot"
Write-Host "4. npm install"
Write-Host "5. npm run type-check"
Write-Host "6. npm test"
Write-Host "7. git add docs/security src (as applicable)"
Write-Host "8. git commit -m 'docs(security): populate module16-v1 from ZIP (evasions, compliance, swarm, attestation)'"
Write-Host ""
Write-Host "After all three repos populated, push branches and coordinate PRs."
Write-Host "Reference paybotfin-witness for AWP receipts of module completion."
Write-Host "=== Done (script) ==="
