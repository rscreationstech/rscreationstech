-- Site stats table
CREATE TABLE public.site_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  apps_count INTEGER NOT NULL DEFAULT 0,
  projects_count INTEGER NOT NULL DEFAULT 0,
  downloads_count INTEGER NOT NULL DEFAULT 0,
  users_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Apps table
CREATE TABLE public.apps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  title TEXT,
  short_description TEXT,
  description TEXT,
  instructions TEXT,
  features TEXT[],
  download_url TEXT,
  logo_url TEXT,
  version TEXT DEFAULT '1.0.0',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- App images table
CREATE TABLE public.app_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  app_id UUID NOT NULL REFERENCES public.apps(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[],
  github_url TEXT,
  live_url TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Contact messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can view published content)
CREATE POLICY "Anyone can view site stats" ON public.site_stats FOR SELECT USING (true);
CREATE POLICY "Anyone can view apps" ON public.apps FOR SELECT USING (true);
CREATE POLICY "Anyone can view app images" ON public.app_images FOR SELECT USING (true);
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Anyone can view published posts" ON public.blog_posts FOR SELECT USING (is_published = true);

-- Contact form - anyone can submit
CREATE POLICY "Anyone can submit contact form" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Authenticated user policies (admin can manage everything)
CREATE POLICY "Authenticated users can manage site stats" ON public.site_stats FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage apps" ON public.apps FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage app images" ON public.app_images FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage projects" ON public.projects FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage blog posts" ON public.blog_posts FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage contact messages" ON public.contact_messages FOR ALL USING (auth.uid() IS NOT NULL);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_site_stats_updated_at BEFORE UPDATE ON public.site_stats FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_apps_updated_at BEFORE UPDATE ON public.apps FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial site stats
INSERT INTO public.site_stats (apps_count, projects_count, downloads_count, users_count) VALUES (0, 0, 0, 0);