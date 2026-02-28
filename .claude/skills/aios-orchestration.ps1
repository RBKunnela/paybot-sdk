#!/usr/bin/env pwsh
# AIOS Orchestration Skill - PowerShell Launcher
# Usage: aios-orchestration "Create PRD for task orchestration"

param(
    [string]$Request,
    [switch]$Interactive
)

$ScriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $ScriptPath

if ($Interactive) {
    python aios-orchestration-skill.py --interactive
} elseif ($Request) {
    python aios-orchestration-skill.py $Request
} else {
    Write-Host "Usage:"
    Write-Host "  aios-orchestration.ps1 -Request 'your request'"
    Write-Host "  aios-orchestration.ps1 -Interactive"
    Write-Host ""
    Write-Host "Or use as a Claude Code skill with /aios-orchestration"
}