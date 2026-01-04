import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminProjectForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const isEditing = id && id !== "new";

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    tech_stack: [] as string[],
    github_url: "",
    live_url: "",
    image_url: "",
  });
  const [newTech, setNewTech] = useState("");

  const { data: project, isLoading } = useQuery({
    queryKey: ["admin-project", id],
    queryFn: async () => {
      if (!isEditing) return null;
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        slug: project.slug || "",
        description: project.description || "",
        tech_stack: project.tech_stack || [],
        github_url: project.github_url || "",
        live_url: project.live_url || "",
        image_url: project.image_url || "",
      });
    }
  }, [project]);

  useEffect(() => {
    if (!isEditing && formData.name) {
      setFormData((prev) => ({
        ...prev,
        slug: prev.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      }));
    }
  }, [formData.name, isEditing]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (isEditing) {
        const { error } = await supabase.from("projects").update(formData).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert([formData]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast({ title: isEditing ? "Project updated successfully" : "Project created successfully" });
      navigate("/admin/projects");
    },
    onError: (error: any) => {
      toast({ title: "Failed to save project", description: error.message, variant: "destructive" });
    },
  });

  const addTech = () => {
    if (newTech.trim()) {
      setFormData((prev) => ({
        ...prev,
        tech_stack: [...prev.tech_stack, newTech.trim()],
      }));
      setNewTech("");
    }
  };

  const removeTech = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tech_stack: prev.tech_stack.filter((_, i) => i !== index),
    }));
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-muted rounded w-1/4" />
        <div className="glass-card p-6 space-y-4">
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/projects">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{isEditing ? "Edit Project" : "New Project"}</h1>
          <p className="text-muted-foreground">
            {isEditing ? "Update project details" : "Add a new project"}
          </p>
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={(e) => {
          e.preventDefault();
          saveMutation.mutate();
        }}
        className="space-y-6"
      >
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="My Project"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                placeholder="my-project"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Project description..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                placeholder="https://github.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="live_url">Live URL</Label>
              <Input
                id="live_url"
                value={formData.live_url}
                onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Tech Stack</h2>
          
          <div className="flex gap-2">
            <Input
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              placeholder="Add technology..."
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
            />
            <Button type="button" onClick={addTech} variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {formData.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tech_stack.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-sm"
                >
                  {tech}
                  <button type="button" onClick={() => removeTech(index)}>
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link to="/admin/projects">Cancel</Link>
          </Button>
          <Button type="submit" className="glow-primary" disabled={saveMutation.isPending}>
            <Save className="w-4 h-4 mr-2" />
            {saveMutation.isPending ? "Saving..." : "Save Project"}
          </Button>
        </div>
      </motion.form>
    </div>
  );
};

export default AdminProjectForm;
