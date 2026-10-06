# Workflow rules for Claude

- Write everything in English: commit messages, PR titles, PR descriptions, comments.
- Use semantic commit messages (Conventional Commits): `feat:`, `fix:`, `style:`, `docs:`, `chore:`, `ci:`, etc.
- Make all changes on a new branch and open a pull request. Never push directly to `main`.
- After opening a PR, wait until it is clean: no merge conflicts, no failing checks, no unresolved review comments.
- Then approve it (if GitHub allows it; an author cannot approve their own PR, in which case just continue), squash-merge it, and delete the branch that was created for the PR.
- The site is deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`. Asset URLs get a `?v=<commit SHA>` suffix at deploy time, so no manual cache busting is needed.
