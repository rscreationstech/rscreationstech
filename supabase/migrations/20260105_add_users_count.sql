-- Add users_count column to site_stats table
ALTER TABLE public.site_stats
ADD COLUMN users_count INTEGER DEFAULT 0;
