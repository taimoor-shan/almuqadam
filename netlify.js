// This file is used to provide environment variables during the build process
// It's imported by vite.config.js

// Provide fallback values for required environment variables
export const DATABASE_URL = process.env.DATABASE_URL || 'postgres://dummy:dummy@localhost:5432/dummy';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'dummy-password-for-build';
export const ORIGIN = process.env.ORIGIN || 'https://dummy-origin-for-build.netlify.app';
