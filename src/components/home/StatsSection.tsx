import { motion } from "framer-motion";
import { Package, FolderGit2, Download, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const iconMap = {
  apps: Package,
  projects: FolderGit2,
  downloads: Download,
  users: Users,
};

export function StatsSection() {
  const { data: stats } = useQuery({
    queryKey: ["site-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_stats")
        .select("*")
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  const statsData = [
    { 
      label: "Apps Published", 
      value: stats?.apps_count ?? 0, 
      icon: "apps" as const,
      suffix: "+"
    },
    { 
      label: "Projects Built", 
      value: stats?.projects_count ?? 0, 
      icon: "projects" as const,
      suffix: "+"
    },
    {
      label: "Active Users",
      value: stats?.users_count ?? 0,
      icon: "users" as const,
      suffix: "+"
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            By the <span className="gradient-text">Numbers</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A snapshot of my journey in software development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {statsData.map((stat, index) => {
            const Icon = iconMap[stat.icon];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="stat-card text-center group"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-4xl font-bold mb-2">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
