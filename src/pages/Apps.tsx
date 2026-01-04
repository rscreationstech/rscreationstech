import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Download, Search } from "lucide-react";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Apps = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: apps, isLoading } = useQuery({
    queryKey: ["apps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("apps")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const filteredApps = apps?.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.short_description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <section className="py-20 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="gradient-text">Apps</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Explore the applications I've built. Each one is crafted with attention to detail and user experience.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search apps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border/50"
              />
            </div>
          </motion.div>

          {/* Apps Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass-card p-6 animate-pulse">
                  <div className="w-16 h-16 rounded-xl bg-muted mb-4" />
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-full mb-4" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : filteredApps && filteredApps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link
                    to={`/apps/${app.slug}`}
                    className="block glass-card p-6 h-full hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {app.logo_url ? (
                          <img src={app.logo_url} alt={app.name} className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <Download className="w-8 h-8 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors truncate">
                          {app.name}
                        </h3>
                        {app.version && (
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                            v{app.version}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {app.short_description || "A powerful application built with modern technologies."}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-muted flex items-center justify-center">
                <Download className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Apps Found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? "Try a different search term" : "Apps will appear here once added."}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Apps;
