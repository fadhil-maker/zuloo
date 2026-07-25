# ZULOO Website — Deployment Guide

This guide covers the deployment of the ZULOO website to Vercel (free hosting) using your GitHub repository.

## 1. Push to GitHub

1. Open your terminal and navigate to the project directory:
   ```bash
   cd C:\Users\vavac\.gemini\antigravity\scratch\zuloo-website
   ```
2. Initialize and push your repository:
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/fadhil-maker/zuloo.git
   git push -u origin main
   ```
   *Note: Ensure you have authenticated with GitHub.*

## 2. Set Up Supabase

1. Go to your Supabase project dashboard (https://supabase.com).
2. Open the **SQL Editor**.
3. Copy the contents of `schema.sql` from this project.
4. Paste it into the SQL Editor and click **Run**.
5. Go to **Project Settings -> API** to get your URLs and Keys.

## 3. Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in with your GitHub account.
2. Click **Add New...** -> **Project**.
3. Import the `zuloo` repository from GitHub.
4. In the configuration step, open the **Environment Variables** section.
5. Add the following variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: (Your Supabase URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Your Supabase Anon Key)
   - `SUPABASE_SERVICE_ROLE_KEY`: (Your Supabase Service Role Key)
   - `ADMIN_PASSWORD`: (Choose a strong password for your admin panel)
6. Click **Deploy**.

## 4. Admin Panel Access

1. Once deployed, navigate to your Vercel URL (e.g., `https://zuloo.vercel.app/admin`).
2. Log in using the `ADMIN_PASSWORD` you set in Vercel.
3. You can now manage services, portfolio works, testimonials, and contact info directly from the admin panel!
