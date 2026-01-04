import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Plus, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const AdminAppForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const isEditing = id && id !== "new";

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    title: "",
    short_description: "",
    description: "",
    instructions: "",
    features: [] as string[],
    download_url: "",
    logo_url: "",
    version: "1.0.0",
    is_featured: false,
  });
  const [newFeature, setNewFeature] = useState("");
  const [images, setImages] = useState<{ id?: string; image_url: string; alt_text: string }[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  // Fetch app data if editing
  const { data: app, isLoading } = useQuery({
    queryKey: ["admin-app", id],
    queryFn: async () => {
      if (!isEditing) return null;
      const { data, error } = await supabase
        .from("apps")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: isEditing,
  });

  // Fetch app images
  const { data: appImages } = useQuery({
    queryKey: ["admin-app-images", id],
    queryFn: async () => {
      if (!isEditing) return [];
      const { data, error } = await supabase
        .from("app_images")
        .select("*")
        .eq("app_id", id)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (app) {
      setFormData({
        name: app.name || "",
        slug: app.slug || "",
        title: app.title || "",
        short_description: app.short_description || "",
        description: app.description || "",
        instructions: app.instructions || "",
        features: app.features || [],
        download_url: app.download_url || "",
        logo_url: app.logo_url || "",
        version: app.version || "1.0.0",
        is_featured: app.is_featured || false,
      });
    }
  }, [app]);

  useEffect(() => {
    if (appImages) {
      setImages(appImages.map((img) => ({
        id: img.id,
        image_url: img.image_url,
        alt_text: img.alt_text || "",
      })));
    }
  }, [appImages]);

  // Auto-generate slug from name
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
        const { error } = await supabase
          .from("apps")
          .update(formData)
          .eq("id", id);
        if (error) throw error;

        // Update images
        await supabase.from("app_images").delete().eq("app_id", id);
        if (images.length > 0) {
          const { error: imgError } = await supabase.from("app_images").insert(
            images.map((img, index) => ({
              app_id: id,
              image_url: img.image_url,
              alt_text: img.alt_text,
              sort_order: index,
            }))
          );
          if (imgError) throw imgError;
        }
      } else {
        const { data, error } = await supabase
          .from("apps")
          .insert([formData])
          .select()
          .single();
        if (error) throw error;

        // Add images
        if (images.length > 0) {
          const { error: imgError } = await supabase.from("app_images").insert(
            images.map((img, index) => ({
              app_id: data.id,
              image_url: img.image_url,
              alt_text: img.alt_text,
              sort_order: index,
            }))
          );
          if (imgError) throw imgError;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-apps"] });
      toast({ title: isEditing ? "App updated successfully" : "App created successfully" });
      navigate("/admin/apps");
    },
    onError: (error: any) => {
      toast({ 
        title: "Failed to save app", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      setImages((prev) => [...prev, { image_url: newImageUrl.trim(), alt_text: "" }]);
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-muted rounded w-1/4" />
        <div className="glass-card p-6 space-y-4">
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
          <div className="h-32 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/apps">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{isEditing ? "Edit App" : "New App"}</h1>
          <p className="text-muted-foreground">
            {isEditing ? "Update app details" : "Add a new application"}
          </p>
        </div>
      </motion.div>

      {/* Form */}
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
        {/* Basic Info */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">App Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="My Awesome App"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                placeholder="my-awesome-app"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="The Ultimate Productivity Tool"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_description">Short Description</Label>
            <Input
              id="short_description"
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              placeholder="A brief description for app listings"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Full Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of your app..."
              rows={5}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                placeholder="1.0.0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="download_url">Download URL</Label>
              <Input
                id="download_url"
                value={formData.download_url}
                onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo_url">Logo URL</Label>
            <Input
              id="logo_url"
              value={formData.logo_url}
              onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
            />
            <Label htmlFor="is_featured">Featured App</Label>
          </div>
        </div>

        {/* Features */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Features</h2>
          
          <div className="flex gap-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add a feature..."
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
            />
            <Button type="button" onClick={addFeature} variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {formData.features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-sm"
                >
                  {feature}
                  <button type="button" onClick={() => removeFeature(index)}>
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Instructions</h2>
          <Textarea
            value={formData.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            placeholder="Installation and usage instructions..."
            rows={5}
          />
        </div>

        {/* Screenshots */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Screenshots</h2>
          
          <div className="flex gap-2">
            <Input
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Image URL..."
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
            />
            <Button type="button" onClick={addImage} variant="outline">
              <Image className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.image_url}
                    alt={img.alt_text || "Screenshot"}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link to="/admin/apps">Cancel</Link>
          </Button>
          <Button type="submit" className="glow-primary" disabled={saveMutation.isPending}>
            <Save className="w-4 h-4 mr-2" />
            {saveMutation.isPending ? "Saving..." : "Save App"}
          </Button>
        </div>
      </motion.form>
    </div>
  );
};

export default AdminAppForm;
