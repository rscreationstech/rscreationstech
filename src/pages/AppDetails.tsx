import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, ExternalLink, Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AppDetails = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: app, isLoading: appLoading } = useQuery({
    queryKey: ["app", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("apps")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: images } = useQuery({
    queryKey: ["app-images", app?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("app_images")
        .select("*")
        .eq("app_id", app!.id)
        .order("sort_order", { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!app?.id,
  });

  if (appLoading) {
    return (
      <Layout>
        <section className="py-20 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-pulse">
              <div className="h-8 bg-muted rounded w-32 mb-8" />
              <div className="flex items-start gap-6 mb-8">
                <div className="w-24 h-24 rounded-2xl bg-muted" />
                <div className="flex-1">
                  <div className="h-10 bg-muted rounded w-1/2 mb-4" />
                  <div className="h-6 bg-muted rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!app) {
    return (
      <Layout>
        <section className="py-20 min-h-screen">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">App Not Found</h1>
            <p className="text-muted-foreground mb-8">The app you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/apps">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Apps
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Button variant="ghost" asChild>
                <Link to="/apps">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Apps
                </Link>
              </Button>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-start gap-6 mb-12"
            >
              <div className="w-24 h-24 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                {app.logo_url ? (
                  <img src={app.logo_url} alt={app.name} className="w-16 h-16 rounded-xl object-cover" />
                ) : (
                  <Download className="w-12 h-12 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{app.name}</h1>
                  {app.version && (
                    <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      v{app.version}
                    </span>
                  )}
                </div>
                <p className="text-xl text-muted-foreground">
                  {app.title || app.short_description}
                </p>
              </div>
              {app.download_url && (
                <Button size="lg" className="glow-primary" asChild>
                  <a href={app.download_url} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              )}
            </motion.div>

            {/* Description */}
            {app.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card p-6 mb-8"
              >
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground whitespace-pre-wrap">{app.description}</p>
                </div>
              </motion.div>
            )}

            {/* Features */}
            {app.features && app.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card p-6 mb-8"
              >
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <ul className="space-y-3">
                  {app.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Instructions */}
            {app.instructions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-card p-6 mb-8"
              >
                <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground whitespace-pre-wrap">{app.instructions}</p>
                </div>
              </motion.div>
            )}

            {/* Screenshots */}
            {images && images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold mb-4">Screenshots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="glass-card overflow-hidden">
                      <img
                        src={image.image_url}
                        alt={image.alt_text || `${app.name} screenshot`}
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AppDetails;
