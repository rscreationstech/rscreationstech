# Deployment & Security Guide

## Before Pushing to GitHub

### 1. Environment Variables Setup

```bash
# Create .env.local (already in .gitignore - won't be committed)
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
```

**CRITICAL:**
- ✅ Only use ANON (publishable) key
- ✅ NEVER commit `.env.local`
- ✅ NEVER use service role key in frontend

### 2. Supabase Setup

1. Create a new Supabase project
2. Run the SQL migration:
   - Go to Supabase Dashboard > SQL Editor
   - Copy contents from `supabase/migrations/20260103173833_*.sql`
   - Execute the SQL
3. Create admin user:
   - Go to Authentication > Users
   - Click "Add user"
   - Set email and password
4. Verify RLS is enabled on all tables

### 3. Local Testing

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Visit http://localhost:8080
# Login at http://localhost:8080/admin/login
```

### 4. Build for Production

```bash
npm run build
npm run preview  # Test production build locally
```

### 5. Deployment Options

#### Option A: Vercel (Recommended)
```bash
npm i -g vercel
vercel login
vercel

# Set environment variables in Vercel dashboard
# VITE_SUPABASE_URL
# VITE_SUPABASE_PUBLISHABLE_KEY
```

#### Option B: Netlify
1. Push to GitHub
2. Connect repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables in Netlify dashboard

#### Option C: Self-hosted (Node.js)
```bash
npm install
npm run build
npm install -g serve
serve -s dist
```

### 6. Verify Security After Deployment

- [ ] Confirm `.env.local` was NOT pushed to GitHub
- [ ] Verify RLS policies are active in Supabase
- [ ] Test that public users can only read published content
- [ ] Test that unauthenticated users cannot access `/admin`
- [ ] Check that blog content is rendered as plain text

## Troubleshooting

**Admin login not working:**
- Verify user exists in Supabase > Authentication
- Check that Supabase URL and anon key are correct
- Clear browser cache and localStorage

**Database queries failing:**
- Verify RLS policies are enabled
- Check that authenticated user has proper permissions
- Review Supabase logs

**Pages not loading:**
- Verify VITE environment variables are set
- Check browser console for errors
- Confirm Supabase project is active

## Security Best Practices

1. **Never commit secrets** - Keep .env.local in .gitignore
2. **Use anon key only** - Service role key stays in backend only
3. **Enable RLS** - Always enable Row Level Security on all tables
4. **Validate input** - Frontend validation + Supabase RLS
5. **Monitor access** - Review Supabase logs regularly
6. **Update dependencies** - Run `npm audit fix` periodically

## Post-Deployment

1. Test all features:
   - View public pages
   - Submit contact form
   - Admin login
   - Create/update/delete content

2. Monitor for errors:
   - Check browser console
   - Review Supabase logs
   - Monitor site performance

3. Backup regularly:
   - Export database from Supabase
   - Keep code backups

## Support

For issues:
1. Check Supabase status page
2. Review console logs
3. Verify environment variables
4. Test in incognito window
