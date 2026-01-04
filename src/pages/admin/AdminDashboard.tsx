import { motion } from "framer-motion";
import { Package, FolderGit2, Download, FileText, MessageSquare, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [appsResult, projectsResult, postsResult, messagesResult, siteStatsResult] = await Promise.all([
        supabase.from("apps").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("is_read", false),
        supabase.from("site_stats").select("*").limit(1).maybeSingle(),
      ]);

      return {
        apps: appsResult.count ?? 0,
        projects: projectsResult.count ?? 0,
        posts: postsResult.count ?? 0,
        unreadMessages: messagesResult.count ?? 0,
        downloads: siteStatsResult.data?.downloads_count ?? 0,
      };
    },
  });

  const statCards = [
    { label: "Total Apps", value: stats?.apps ?? 0, icon: Package, href: "/rscraft/apps", color: "text-blue-500" },
    { label: "Total Projects", value: stats?.projects ?? 0, icon: FolderGit2, href: "/rscraft/projects", color: "text-green-500" },
    { label: "Blog Posts", value: stats?.posts ?? 0, icon: FileText, href: "/rscraft/blog", color: "text-purple-500" },
    { label: "Unread Messages", value: stats?.unreadMessages ?? 0, icon: MessageSquare, href: "/rscraft/messages", color: "text-red-500" },
  ];

  const quickActions = [
    { label: "Add New App", href: "/rscraft/apps/new", icon: Package },
    { label: "Add New Project", href: "/rscraft/projects/new", icon: FolderGit2 },
    { label: "Write Blog Post", href: "/rscraft/blog/new", icon: FileText },
    { label: "Update Stats", href: "/rscraft/stats", icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your site.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <Link
              to={stat.href}
              className="block glass-card p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.href}
              className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <action.icon className="w-5 h-5 text-primary" />
              <span className="font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
