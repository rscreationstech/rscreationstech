import { useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminStats = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-site-stats"],
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

  const [formData, setFormData] = useState({
    apps_count: 0,
    projects_count: 0,
    downloads_count: 0,
    users_count: 0,
  });

  // Update form when data loads
  useState(() => {
    if (stats) {
      setFormData({
        apps_count: stats.apps_count,
        projects_count: stats.projects_count,
        downloads_count: stats.downloads_count,
        users_count: stats.users_count ?? 0,
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (stats?.id) {
        const { error } = await supabase
          .from("site_stats")
          .update(formData)
          .eq("id", stats.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("site_stats").insert([formData]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-site-stats"] });
      queryClient.invalidateQueries({ queryKey: ["site-stats"] });
      toast({ title: "Stats updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update stats", variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-muted rounded w-1/4" />
        <div className="glass-card p-6 space-y-4">
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Site Stats</h1>
        <p className="text-muted-foreground">Update the stats displayed on the home page</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={(e) => {
          e.preventDefault();
          updateMutation.mutate();
        }}
        className="glass-card p-6 space-y-6"
      >
        <div className="space-y-2">
          <Label htmlFor="apps_count">Apps Count</Label>
          <Input
            id="apps_count"
            type="number"
            value={formData.apps_count}
            onChange={(e) => setFormData({ ...formData, apps_count: parseInt(e.target.value) || 0 })}
            min={0}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="projects_count">Projects Count</Label>
          <Input
            id="projects_count"
            type="number"
            value={formData.projects_count}
            onChange={(e) => setFormData({ ...formData, projects_count: parseInt(e.target.value) || 0 })}
            min={0}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="downloads_count">Downloads Count</Label>
          <Input
            id="downloads_count"
            type="number"
            value={formData.downloads_count}
            onChange={(e) => setFormData({ ...formData, downloads_count: parseInt(e.target.value) || 0 })}
            min={0}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="users_count">Active Users</Label>
          <Input
            id="users_count"
            type="number"
            value={formData.users_count}
            onChange={(e) => setFormData({ ...formData, users_count: parseInt(e.target.value) || 0 })}
            min={0}
          />
        </div>

        <Button type="submit" className="w-full glow-primary" disabled={updateMutation.isPending}>
          <Save className="w-4 h-4 mr-2" />
          {updateMutation.isPending ? "Saving..." : "Save Stats"}
        </Button>
      </motion.form>
    </div>
  );
};

export default AdminStats;
