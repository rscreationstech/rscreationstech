# RS Creations 🚀

A **modern, premium, tech-themed personal product ecosystem website** built to showcase all my apps, projects, and digital creations in one place.

This platform acts as my **central hub** — similar to a personal Play Store + portfolio — where users can explore projects and download apps directly.

---

## ✨ Highlights

- ⚡ Premium modern UI with smooth animations
- 🌙 Dark-mode, tech-startup aesthetic
- 📱 Fully responsive (mobile-first)
- 🧩 Dynamic apps & projects system
- ⬇️ Direct app download support
- 📝 Blog & updates section
- 📊 Editable home page statistics
- 🔐 Private admin dashboard (solo login)

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Backend / Auth / Database / Storage:** Supabase
- **Language:** TypeScript / JavaScript

> ❌ No Firebase  
> ❌ No service role key  
> ✅ Uses Supabase anon key only  

---

## 🔐 Authentication Model

- This is a **solo-developer project**
- Only one user (admin) logs in
- No public registration
- No role-based access system
- If authenticated → admin dashboard access

---

## 🌐 Pages Overview

- `/` – Home (featured apps, stats, highlights)
- `/about` – About & vision
- `/apps` – All apps
- `/apps/[slug]` – App details page
- `/projects` – Projects showcase
- `/blog` – Updates & posts
- `/contact` – Contact form
- `/rscraft/login` – Admin login
- `/rscraft` – Admin dashboard
- `/privacy-policy`, `/terms`, `/disclaimer`

---

## 🧑‍💻 Admin Dashboard Features

- Add / edit / delete apps
- Upload multiple screenshots per app
- Add app instructions & descriptions
- Manage app download links
- Edit home page statistics
- Manage projects and blog posts

---

## 🗄️ Database Structure (Supabase)

- `apps`
- `app_images`
- `projects`
- `blog_posts`
- `site_stats`

All content is **fully dynamic** and fetched from the database.

---

## 🔒 Security Notes (Public Repo Safe)

- No secrets are committed
- `.env.local` is ignored
- No service role key used
- Supabase Row Level Security (RLS) enforced
- Public access limited to read-only where applicable
- All write operations require authentication

This repository is **safe to be public**.

---

## 📦 Local Development

```bash
git clone https://github.com/your-username/rs-creations.git
cd rs-creations
npm install
npm run dev
