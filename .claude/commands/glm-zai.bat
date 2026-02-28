@echo off
REM GLM Integration via ZAI API - Windows Batch Command
REM Usage: glm-zai-command.bat {analyze|generate|review} [arguments]

if "%ZAI_API_KEY%"=="" (
    echo Error: ZAI_API_KEY environment variable not set
    echo Run: set ZAI_API_KEY=your_api_key_here
    exit /b 1
)

set "API_URL=https://api.z.ai/api/coding/paas/v4"
set "MODEL=glm-4.7"
set "TEMPERATURE=0.6"
set "MAX_TOKENS=131072"

if "%1"=="" goto usage
if "%1"=="analyze" goto analyze
if "%1"=="generate" goto generate
if "%1"=="review" goto review

:usage
echo Usage: glm-zai-command.bat {analyze^|generate^|review} [arguments]
echo.
echo Commands:
echo   analyze ^<code_file^>    - Analyze code for AIOS compliance
echo   generate ^<prompt^>      - Generate code from prompt
echo   review ^<code_file^>     - Review code quality
echo.
echo Environment variables:
echo   ZAI_API_KEY             - Your Z.AI API key ^(required^)
exit /b 1

:analyze
if "%2"=="" (
    echo Error: Code file not specified
    exit /b 1
)
powershell -Command "Invoke-RestMethod -Uri '%API_URL%/chat/completions' -Method POST -Headers @{'Content-Type'='application/json'; 'Authorization'='Bearer %ZAI_API_KEY%'} -Body '{\"model\": \"%MODEL%\",\"messages\":[{\"role\":\"system\",\"content\":\"You are GLM, a large language model trained by Z.AI. You are helping with AIOS development tasks.\"},{\"role\":\"user\",\"content\":\"Context: $(Get-Content -Raw %2)^^n^^nTask: Analyze this code for AIOS architecture compliance and suggest improvements:\"}],\"temperature\": %TEMPERATURE%,\"max_tokens\": %MAX_TOKENS%,\"stream\":false}' | ConvertFrom-Json | Select-Object -ExpandProperty choices | Select-Object -ExpandProperty message | Select-Object -ExpandProperty content"
goto end

:generate
set "prompt=%*"
set "prompt=%prompt:glm-zai-command.bat generate =%"
powershell -Command "Invoke-RestMethod -Uri '%API_URL%/chat/completions' -Method POST -Headers @{'Content-Type'='application/json'; 'Authorization'='Bearer %ZAI_API_KEY%'} -Body '{\"model\": \"%MODEL%\",\"messages\":[{\"role\":\"system\",\"content\":\"You are GLM, a large language model trained by Z.AI. You are helping with AIOS development tasks.\"},{\"role\":\"user\",\"content\":\"Context: ^n^nTask: %prompt%\"}],\"temperature\": %TEMPERATURE%,\"max_tokens\": %MAX_TOKENS%,\"stream\":false}' | ConvertFrom-Json | Select-Object -ExpandProperty choices | Select-Object -ExpandProperty message | Select-Object -ExpandProperty content"
goto end

:review
if "%2"=="" (
    echo Error: Code file not specified
    exit /b 1
)
powershell -Command "Invoke-RestMethod -Uri '%API_URL%/chat/completions' -Method POST -Headers @{'Content-Type'='application/json'; 'Authorization'='Bearer %ZAI_API_KEY%'} -Body '{\"model\": \"%MODEL%\",\"messages\":[{\"role\":\"system\",\"content\":\"You are GLM, a large language model trained by Z.AI. You are helping with AIOS development tasks.\"},{\"role\":\"user\",\"content\":\"Context: $(Get-Content -Raw %2)^^n^^nTask: Review this code for quality, security, and performance:\"}],\"temperature\": %TEMPERATURE%,\"max_tokens\": %MAX_TOKENS%,\"stream\":false}' | ConvertFrom-Json | Select-Object -ExpandProperty choices | Select-Object -ExpandProperty message | Select-Object -ExpandProperty content"
goto end

:end