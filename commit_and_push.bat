@echo off
echo Starting git operations...
git add -A
echo Files staged.
git status --short > git_status_output.txt
git commit -m "feat: add marketing creative and design system sections with new components"
echo Commit created.
git log -1 --oneline > latest_commit.txt
git push origin main 2>&1 > push_output.txt
echo Push completed.
type git_status_output.txt
type latest_commit.txt
type push_output.txt
