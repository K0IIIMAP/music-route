"use client";

import { useEffect, useMemo, useState } from "react";
import { Song } from "../types";
import { supabaseClient } from "@/app/utils/supabase/client";
import { toast } from "sonner";

const useGetSongById = (id?: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const supabase = supabaseClient();

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    const fetchSong = async () => {
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        setSong(undefined); // Clear the song state on error

        setIsLoading(false);
        toast.error("Failed to fetch songs", {
          className: "bg-red-400/15 border-red-500 text-white/80",
        });
      }
      setSong(data);
      setIsLoading(false);
    };
    fetchSong();
  }, [id]); // only when id change
  return useMemo(() => ({ song, isLoading }), [song, isLoading]); // for returning only when song or isLoading change
};

export default useGetSongById;
