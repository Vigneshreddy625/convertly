import { useAuth } from "../authContext/AuthContext";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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