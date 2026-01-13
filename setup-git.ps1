# Git Setup Script for Note App
# Run this script after installing Git for Windows

Write-Host "Setting up Git repository..." -ForegroundColor Green

# Initialize git repository
Write-Host "Initializing git repository..." -ForegroundColor Yellow
git init

# Add remote repository
Write-Host "Adding remote repository..." -ForegroundColor Yellow
git remote add origin https://github.com/ehlalthaehpaltha-glitch/my-note-app.git

# Check if remote already exists and update if needed
$remoteExists = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Remote already exists, updating..." -ForegroundColor Yellow
    git remote set-url origin https://github.com/ehlalthaehpaltha-glitch/my-note-app.git
}

# Add all files
Write-Host "Adding files..." -ForegroundColor Yellow
git add .

# Create initial commit
Write-Host "Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Note-taking app with Markdown support and glassmorphism design"

# Rename branch to main (if needed)
Write-Host "Setting branch to main..." -ForegroundColor Yellow
git branch -M main

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "You may be prompted for your GitHub credentials." -ForegroundColor Cyan
git push -u origin main

Write-Host "`nDone! Your code has been pushed to GitHub." -ForegroundColor Green
Write-Host "Repository: https://github.com/ehlalthaehpaltha-glitch/my-note-app" -ForegroundColor Cyan
