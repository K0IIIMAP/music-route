"use client";

import { supabaseClient } from "@/app/utils/supabase/client";

const useLoadSongUrl = (songPath?: string | null) => {
  const supabase = supabaseClient();
  if (!songPath) return;

  const { data: songData } = supabase.storage
    .from("songs")
    .getPublicUrl(songPath);

  return songData.publicUrl;
};

export default useLoadSongUrl;
