#!/bin/sh

# Script to run when deploying to Render
# This creates or migrates the database and then starts the app
set -e

echo "Starting render-start.sh script..."

# Create data directory if it doesn't exist
FOLDER=./data
if [ ! -d "$FOLDER" ]; then
    echo "$FOLDER directory doesn't exist, creating it..."
    mkdir -p ./data
fi

# Check if database file exists
if [ ! -f ./data/db.sqlite3 ]; then
    echo "Database file doesn't exist, creating it..."
    touch ./data/db.sqlite3
fi

# Always initialize/update the database with schema
echo "Initializing database with schema..."
cat ./sql/schema.sql
sqlite3 ./data/db.sqlite3 < ./sql/schema.sql

# Verify tables were created
echo "Verifying database tables..."
sqlite3 ./data/db.sqlite3 "SELECT name FROM sqlite_master WHERE type='table';"

# Start the application
echo "Starting the application..."
node build
