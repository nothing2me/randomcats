@echo off
setlocal
cd /d "%~dp0"

where py >nul 2>&1
if not errorlevel 1 (
    set "PYTHON=py"
) else (
    where python >nul 2>&1
    if errorlevel 1 (
        echo Python was not found. Install Python and try again.
        pause
        exit /b 1
    )
    set "PYTHON=python"
)

echo Serving this project at http://localhost:8080/
echo Press Ctrl+C to stop the server.
%PYTHON% -m http.server 8080 --bind 127.0.0.1
