import { useAuth } from "../authContext/AuthContext";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";

const supabaseUrl = "https://eavjujizrdiumsfyhtlx.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhdmp1aml6cmRpdW1zZnlodGx4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzQwNTE1MCwiZXhwIjoyMDYyOTgxMTUwfQ.Oc_u9vuIvmBdZuz5lN1rjArUXMP3j7z-qdENms6x3ho";

const supabase = createClient(supabaseUrl, supabaseKey);

export function userAvatarUpload(userId) {
  const { profileUpdate } = useAuth();
  const [loading, setLoading] = useState(false);

  async function uploadAvatar(file) {
    if (!file) {
      toast.error("No file selected.");
      return null;
    }

    setLoading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}_${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { contentType: file.type });

      if (uploadError) throw uploadError;

      const { publicURL, error: urlError } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      if (urlError) throw urlError;

      const result = await profileUpdate({ avatar: publicURL });

      if (!result.success) throw new Error(result.error || "Failed to update profile");

      toast.success("Avatar updated successfully!");
      return { user: result.user, avatarUrl: publicURL };

    } catch (error) {
      console.error("Avatar upload failed:", error);
      toast.error(`Avatar upload failed: ${error.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { uploadAvatar, loading };
}