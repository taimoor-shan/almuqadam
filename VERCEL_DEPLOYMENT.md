# Vercel Deployment Guide

This guide will help you deploy your SvelteKit application to Vercel with PostgreSQL database integration.

## Prerequisites

1. A Vercel account (https://vercel.com)
2. A PostgreSQL database (Neon, Supabase, or any other PostgreSQL provider)
3. Node.js 18+ installed locally

## Step 1: Set Up Your PostgreSQL Database

1. Create a PostgreSQL database with your preferred provider (Neon, Supabase, etc.)
2. Get your database connection string in the format:
   ```
   postgres://username:password@host:port/database?sslmode=require
   ```
3. Make sure your database is accessible from Vercel's servers

## Step 2: Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Deploy your application:
   ```bash
   vercel
   ```

4. Follow the prompts to configure your project
   - When asked to link to an existing project, choose "No" to create a new project
   - Set up the environment variables (see Step 3)

5. Deploy to production:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to https://vercel.com/new
3. Import your repository
4. Configure your project settings
5. Set up the environment variables (see Step 3)
6. Deploy

## Step 3: Set Up Environment Variables

In the Vercel dashboard, go to your project settings and add the following environment variables:

1. `DATABASE_URL`: Your PostgreSQL connection string
2. `ADMIN_PASSWORD`: A secure password for admin access
3. `ORIGIN`: Your Vercel deployment URL (e.g., https://your-app.vercel.app)

## Step 4: Verify Database Connection

1. After deployment, check the function logs in the Vercel dashboard
2. Verify that the application is connecting to the PostgreSQL database
3. If there are connection issues, check that:
   - The database connection string is correct
   - The database is accessible from Vercel's servers
   - SSL settings are properly configured

## Step 5: Set Up Cron Jobs (Optional)

The `vercel.json` file includes a cron job configuration that runs daily at 5 AM to clean up expired sessions. This is automatically set up during deployment.

## Troubleshooting

### Database Connection Issues

If you encounter database connection errors:

1. Check that your `DATABASE_URL` environment variable is correctly set
2. Ensure your database provider allows connections from Vercel's IP addresses
3. Verify that SSL is properly configured (most cloud PostgreSQL providers require SSL)

### Build Errors

If you encounter build errors:

1. Check the build logs in the Vercel dashboard
2. Ensure all dependencies are properly installed
3. Verify that your SvelteKit version is compatible with the Vercel adapter

## Local Testing

To test your Vercel deployment locally:

```bash
npm run vercel-dev
```

This will start a local development server that simulates the Vercel environment.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
