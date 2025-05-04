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

# Debug: List directories to see what was created
echo "Listing directories after build:"
ls -la
ls -la .netlify || echo ".netlify directory not found"
ls -la .netlify/functions-internal || echo ".netlify/functions-internal directory not found"

# Create the functions-internal directory if it doesn't exist
if [ ! -d ".netlify/functions-internal" ]; then
  echo "Creating .netlify/functions-internal directory..."
  mkdir -p .netlify/functions-internal

  # If the adapter created a different directory, try to find and copy it
  if [ -d ".netlify/server" ]; then
    echo "Found .netlify/server directory, copying to functions-internal..."
    cp -r .netlify/server/* .netlify/functions-internal/
  elif [ -d ".netlify/functions" ]; then
    echo "Found .netlify/functions directory, copying to functions-internal..."
    cp -r .netlify/functions/* .netlify/functions-internal/
  elif [ -d "build" ]; then
    echo "Found build directory, copying to functions-internal..."
    cp -r build/* .netlify/functions-internal/
  else
    echo "ERROR: Could not find any build output directory!"
    find . -type d -name "*.netlify*" -o -name "build" | sort
  fi
fi

echo "Final directory structure:"
ls -la .netlify/functions-internal || echo ".netlify/functions-internal directory still not found"

echo "Build completed!"
