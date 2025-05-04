#!/bin/bash

# This script is used by Vercel to build the application
# It uses npm instead of pnpm to avoid lockfile issues

echo "Node.js version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies using npm
npm install

# Build the application
npm run build

# Run database migration if needed
# Uncomment this if you want to run migrations during build
# node scripts/migrate-standalone.js

# Create Vercel output config to specify runtime
mkdir -p .vercel/output
cat > .vercel/output/config.json << EOL
{
  "version": 3,
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/api/serverless" }
  ],
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs18.x"
    },
    ".svelte-kit/output/server/**/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}
EOL

echo "Build completed successfully!"
