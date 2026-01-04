import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function FeaturedApps() {
  const { data: apps, isLoading } = useQuery({
    queryKey: ["featured-apps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("apps")
        .select("*")
        .eq("is_featured", true)
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="gradient-text">Apps</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="w-16 h-16 rounded-xl bg-muted mb-4" />
                <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-full mb-4" />
                <div className="h-10 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!apps || apps.length === 0) {
    return (
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="gradient-text">Apps</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Featured apps will appear here once added.
            </p>
            <Button asChild variant="outline">
              <Link to="/apps">
                Browse All Apps
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Featured</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Apps</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore my most popular applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/apps/${app.slug}`}
                className="block glass-card p-6 h-full hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {app.logo_url ? (
                    <img src={app.logo_url} alt={app.name} className="w-10 h-10 rounded-lg" />
                  ) : (
                    <Download className="w-8 h-8 text-primary" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {app.name}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {app.short_description || "A powerful application"}
                </p>
                <div className="flex items-center text-primary text-sm font-medium">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/apps">
              View All Apps
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
