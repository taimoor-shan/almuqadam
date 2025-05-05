// This script tests the API endpoints for blog functionality
// Run with: node scripts/test-api.js

import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get ORIGIN from environment or use default
const ORIGIN = process.env.ORIGIN || 'http://localhost:5173';

async function testAPI() {
  console.log(`Testing API endpoints using origin: ${ORIGIN}`);
  
  try {
    // Test getting articles
    console.log('\nTesting GET /blog endpoint...');
    const blogResponse = await fetch(`${ORIGIN}/blog`);
    console.log(`Status: ${blogResponse.status} ${blogResponse.statusText}`);
    
    if (blogResponse.ok) {
      console.log('Blog page loaded successfully');
    } else {
      console.error('Failed to load blog page');
    }
    
    // Test getting a specific article
    console.log('\nTesting GET /blog/hello-shan endpoint...');
    const articleResponse = await fetch(`${ORIGIN}/blog/hello-shan`);
    console.log(`Status: ${articleResponse.status} ${articleResponse.statusText}`);
    
    if (articleResponse.ok) {
      console.log('Article page loaded successfully');
    } else {
      console.error('Failed to load article page');
    }
    
    // Test creating a new article (this would require authentication)
    console.log('\nNote: Creating a new article requires authentication');
    console.log('To test article creation, you need to be logged in through the web interface');
    
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testAPI().catch(console.error);
