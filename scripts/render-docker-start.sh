#!/bin/sh

# Script to run when starting the container on Render
# This runs the migration and then starts the app
set -e

echo "Starting render-docker-start.sh script..."

# Run the migration script
echo "Running database migration..."
node scripts/migrate-standalone.js

# Start the application
echo "Starting the application..."
node build
