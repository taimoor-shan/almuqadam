#!/bin/bash

# This script is used by Vercel to build the application
# It uses npm instead of pnpm to avoid lockfile issues

# Install dependencies using npm
npm install

# Build the application
npm run build

# Run database migration if needed
# Uncomment this if you want to run migrations during build
# node scripts/migrate-standalone.js
