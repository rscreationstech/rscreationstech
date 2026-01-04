# Security Policy & Configuration

## ✅ Security Verified for Public Repository

This project has been audited for public deployment. All sensitive data is protected.

### Environment Variables (CRITICAL)

**Required for deployment:**
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

**Protection:**
- ✅ `.env.local` is in `.gitignore`
- ✅ Only `VITE_` prefixed variables are exposed to frontend (safe)
- ✅ No service role key is ever used on client-side
- ✅ Never commit `.env.local` or any `.env` files

### Supabase Security

**Authentication:**
- ✅ Uses Supabase Auth with email/password
- ✅ Admin dashboard requires authentication
- ✅ Session persists via localStorage with auto-refresh
- ✅ All admin routes check auth state before rendering

**Row Level Security (RLS):**
- ✅ RLS enabled on ALL tables
- ✅ Public users can ONLY read published content
- ✅ Contact form submissions allowed for all (no auth required)
- ✅ All write operations require `auth.uid() IS NOT NULL`
- ✅ Blog posts require `is_published = true` for public view

**Database Access Rules:**
```
- site_stats: Public read, Auth write only
- apps: Public read, Auth write only
- app_images: Public read, Auth write only
- projects: Public read, Auth write only
- blog_posts: Public read published only, Auth all
- contact_messages: Public insert, Auth all
```

### Frontend Security

**✅ Safe Practices Verified:**
- No hardcoded secrets or API keys
- No `dangerouslySetInnerHTML` with user data
- Content is rendered as plain text (whitespace-pre-wrap)
- All forms validate input before submission
- XSS protection: User content is escaped automatically
- CSRF protection: Supabase handles auth tokens

**Unsafe Code Explanation:**
- `chart.tsx` uses `dangerouslySetInnerHTML` - SAFE
  - Used only for internal theme color generation
  - Never receives user input
  - Hardcoded CSS variables only

### Admin Dashboard Security

**✅ Protected Routes:**
- Login page: `/admin/login` (public)
- Dashboard: `/admin/*` (requires auth)
- Auth check on every admin route
- Automatic redirect to login if session expires
- Logout available at all times

**Access Control:**
- Only registered Supabase users can access admin
- Admin user list managed in Supabase Dashboard
- No hardcoded admin accounts

### Deployment Checklist

- [ ] Create `.env.local` in production environment
- [ ] Add only `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`
- [ ] Use Supabase anon key (NOT service role key)
- [ ] Enable RLS on all database tables (see migrations)
- [ ] Create admin user in Supabase Dashboard
- [ ] Run `npm install` to install dependencies
- [ ] Run `npm run build` to build production
- [ ] Deploy build output (dist folder)

### Security Headers (Recommended)

Add to your hosting provider:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'wasm-unsafe-eval'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### Reporting Security Issues

Found a security issue? Email your report privately (do not open public issues).

### Audit Results

**Status:** ✅ SAFE FOR PUBLIC REPOSITORY

**Verified:**
- No secrets hardcoded
- RLS policies enforced
- Admin routes protected
- User input escaped
- HTTPS enforced on Supabase
- Environment variables properly configured
