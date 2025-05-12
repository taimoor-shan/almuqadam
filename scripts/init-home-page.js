// This script initializes the home page
// Run with: node scripts/init-home-page.js

import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get DATABASE_URL from environment
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

async function initHomePage() {
  console.log('Initializing home page...');
  console.log(`Using database URL: ${DATABASE_URL.replace(/:[^:]*@/, ':****@')}`);

  // Create a PostgreSQL client with appropriate SSL settings
  const client = new pg.Client({
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false } // Enable SSL with self-signed certificates for production
      : DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false } // Disable SSL for localhost, enable for other environments
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    // Check if home page exists
    const homeCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM pages
        WHERE page_id = 'home'
      );
    `);

    if (!homeCheck.rows[0].exists) {
      console.log('Creating home page...');

      // Create default home page
      const defaultHomePage = {
        title: "Welcome to 509 Real Estate",
        logoText: "509 Real Estate",
        subtitle: "Your trusted partner in real estate",
        aboutBlurb: "We help you find your dream home.",
        faqs: [
          {
            question: "What areas do you serve?",
            answer: "We serve the entire 509 area code region."
          },
          {
            question: "How do I get started?",
            answer: "Contact us to schedule a consultation."
          }
        ],
        testimonials: [
          {
            quote: "They helped us find our dream home!",
            author: "John Doe"
          }
        ],
        counters: [
          {
            number: "100+",
            label: "Happy Clients"
          },
          {
            number: "50+",
            label: "Properties Sold"
          }
        ],
        introStep1: "Consultation",
        introStep2: "Property Search",
        introStep3: "Negotiation",
        introStep4: "Closing",
        bioPicture: "",
        bioTitle: "About Us",
        bio: "We are a team of experienced real estate professionals dedicated to helping you find your perfect home.",
        heroImage: "",
        whatWeDoTitle: "Our Services",
        steps: [
          {
            title: "Buying",
            description: "We help you find and purchase your dream home."
          },
          {
            title: "Selling",
            description: "We help you sell your property for the best price."
          },
          {
            title: "Investing",
            description: "We help you find profitable investment properties."
          }
        ],
        stepsTitle: "Our Process",
        galleryImages: [],
        galleryTitle: "Featured Properties",
        contactTitle: "Contact Us",
        contactEmail: "info@509realestate.com",
        contactPhone: "(509) 123-4567",
        contactAddress: "123 Main St, Spokane, WA 99201"
      };

      // Insert home page
      await client.query(
        'INSERT INTO pages (page_id, data, updated_at) VALUES ($1, $2, $3)',
        ['home', defaultHomePage, new Date().toISOString()]
      );

      console.log('Home page created successfully');
    } else {
      console.log('Home page already exists');
    }

    console.log('Initialization completed successfully');
  } catch (error) {
    console.error('Error during initialization:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

initHomePage().catch(console.error);
