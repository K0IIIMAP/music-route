import { supabaseClient } from "@/app/utils/supabase/client";
import { Song } from "./types";

export const getImage = (song: Song) => {
  const supabase = supabaseClient();
  if (!song.image_path) return;
  const { data: imageData } = supabase.storage
    .from("images")
    .getPublicUrl(song.image_path);
  return imageData.publicUrl;
};
