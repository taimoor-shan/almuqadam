#!/bin/bash

# Script to switch between Netlify and Vercel configurations

if [ "$1" == "vercel" ]; then
  echo "Switching to Vercel configuration..."
  cp svelte.config.vercel.js svelte.config.js
  echo "Configuration switched to Vercel"
elif [ "$1" == "netlify" ]; then
  echo "Switching to Netlify configuration..."
  # Assuming you have a backup of the original Netlify configuration
  cp svelte.config.netlify.js svelte.config.js
  echo "Configuration switched to Netlify"
else
  echo "Usage: ./switch-config.sh [vercel|netlify]"
  exit 1
fi
