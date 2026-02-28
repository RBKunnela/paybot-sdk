@echo off
REM AIOS Orchestration Skill - Windows Launcher
REM Usage: aios-orchestration "Create PRD for task orchestration"

cd /d "%~dp0"
python aios-orchestration-skill.py %*