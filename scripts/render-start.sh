#!/bin/sh

# Script to run when deploying to Render
# This creates or migrates the database and then starts the app
set -e

# Create data directory if it doesn't exist
FOLDER=./data
if [ ! -d "$FOLDER" ]
then
    echo "$FOLDER is not a directory, initializing database" 
    mkdir -p ./data
    touch ./data/db.sqlite3
fi

# Initialize the database with schema
sqlite3 ./data/db.sqlite3 < ./sql/schema.sql

# Start the application
node build
