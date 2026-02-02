#!/usr/bin/env bash
set -euo pipefail

# Release script for @azerothian/infisical
# Usage: ./scripts/release.sh [patch|minor|major]
#
# Steps:
#   1. Validate clean tree on master, up-to-date with remote
#   2. Run tests
#   3. Bump version (npm version) — creates git commit + tag
#   4. Build (verification)
#   5. Push commit + tag to origin → triggers release workflow

BUMP="${1:-patch}"

if [[ "$BUMP" != "patch" && "$BUMP" != "minor" && "$BUMP" != "major" ]]; then
  echo "Usage: $0 [patch|minor|major]"
  exit 1
fi

# Ensure clean working tree
if [[ -n "$(git status --porcelain)" ]]; then
  echo "Error: Working tree is not clean. Commit or stash changes first."
  exit 1
fi

# Ensure we're on master
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$BRANCH" != "master" ]]; then
  echo "Error: Releases must be made from the master branch (currently on '$BRANCH')."
  exit 1
fi

# Ensure up to date with remote
git fetch origin master
LOCAL="$(git rev-parse HEAD)"
REMOTE="$(git rev-parse origin/master)"
if [[ "$LOCAL" != "$REMOTE" ]]; then
  echo "Error: Local master is not up to date with origin/master. Pull first."
  exit 1
fi

echo "==> Running tests..."
npm test

echo "==> Bumping version ($BUMP)..."
NEW_VERSION="$(npm version "$BUMP" -m "release: v%s")"
echo "    New version: $NEW_VERSION"

echo "==> Building (verification)..."
npm run build

echo "==> Pushing to origin (triggers CI release workflow)..."
git push origin master
git push origin "$NEW_VERSION"

echo ""
echo "Release $NEW_VERSION pushed to origin."
echo "CI will handle npm publish and GitHub release creation."
echo "Monitor: https://github.com/Azerothian/node-infisical/actions"
