# Git Setup Instructions

To connect this project to GitHub and push to the main branch, follow these steps:

## Prerequisites
1. Install Git for Windows: https://git-scm.com/download/win
2. Or use GitHub Desktop: https://desktop.github.com/

## Commands to Run (if using Git CLI)

Once Git is installed, open PowerShell or Command Prompt in this directory and run:

```bash
# Initialize git repository
git init

# Add remote repository
git remote add origin https://github.com/ehlalthaehpaltha-glitch/my-note-app.git

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Note-taking app with Markdown support and glassmorphism design"

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Using GitHub Desktop (Easier Option)

1. Open GitHub Desktop
2. File → Add Local Repository
3. Select this folder (C:\Users\HP\note_app)
4. Click "Publish repository" 
5. Choose the repository: ehlalthaehpaltha-glitch/my-note-app
6. Make sure "main" branch is selected
7. Click "Publish repository"
