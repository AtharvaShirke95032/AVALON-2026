---
description: how to deploy the AVALON 2026 website to Vercel
---

Follow these steps to deploy your production-ready Cyberpunk website:

### 1. Push to GitHub
Create a new repository on GitHub and push your local code:
```bash
git init
git add .
git commit -m "Initialize AVALON 2026 Grid"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and click **"Add New"** -> **"Project"**.
2. Import your GitHub repository.

### 3. Configure Environment Variables
In the Vercel project setup, go to the **Environment Variables** section and add:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key.

### 4. Deploy
Click **Deploy**. Vercel will build the project and give you a live URL.

### 5. Final Check
- Verify that the glitched intro boots correctly.
- Test a dummy registration to ensure the Supabase connection is stable.
- Log in to `/admin/login` using your passcode to verify moderator access.
