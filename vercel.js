// This file is used to provide environment variables during the build process
// It's imported by vite.config.js

// Load environment variables from .env file
import 'dotenv/config';

// Provide fallback values for required environment variables
export const DATABASE_URL = process.env.DATABASE_URL || 'postgres://neondb_owner:npg_qzXhDOWv26TQ@ep-blue-sunset-ab1hs87n-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Qwerty@007';
export const ORIGIN = process.env.ORIGIN || 'https://dummy-origin-for-build.vercel.app';
