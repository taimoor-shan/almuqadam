#!/bin/bash

# This script is used by Netlify to build the application
# It provides more debugging information

echo "Starting Netlify build script..."
echo "Node.js version: $(node -v)"
echo "NPM version: $(npm -v)"

# Create dummy environment variables for build if they don't exist
if [ -z "$DATABASE_URL" ]; then
  echo "WARNING: DATABASE_URL is not set. Using a dummy value for build."
  export DATABASE_URL="postgres://dummy:dummy@localhost:5432/dummy"
fi

if [ -z "$ADMIN_PASSWORD" ]; then
  echo "WARNING: ADMIN_PASSWORD is not set. Using a dummy value for build."
  export ADMIN_PASSWORD="dummy-password-for-build"
fi

if [ -z "$ORIGIN" ]; then
  echo "WARNING: ORIGIN is not set. Using a dummy value for build."
  export ORIGIN="https://dummy-origin-for-build.netlify.app"
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building the application..."
npm run build

echo "Build completed!"
