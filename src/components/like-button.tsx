"use client";

import { supabaseClient } from "@/app/utils/supabase/client";
import { User } from "@/lib/types";

import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "sonner";

export default function LikeButton({
  songId,
  user,
}: {
  songId: number;
  user: User | null;
}) {
  const [liked, setIsLiked] = useState(false);

  const supabase = supabaseClient();
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();
      if (!error && data) {
        setIsLiked(true);
      }
    };
    fetchData();
  }, [user, songId]);
  const Icon = liked ? AiFillHeart : AiOutlineHeart;

  return (
    <button
      className="hover:opacity-75 transition"
      onClick={async () => {
        if (!user) {
          return toast.error("You must be logged in to like songs", {
            className: "bg-red-400/15 border-red-500 text-white/80",
          });
        }
        if (liked) {
          const { error } = await supabase
            .from("liked_songs")
            .delete()
            .eq("user_id", user.id)
            .eq("song_id", songId);
          if (error) {
            return toast.error("Failed to unlike song", {
              className: "bg-red-400/15 border-red-500 text-white/80",
            });
          }
          setIsLiked(false);
        }
        if (!liked) {
          const { error } = await supabase
            .from("liked_songs")
            .insert({ user_id: user.id, song_id: songId });
          if (error) {
            return toast.error("Failed to like song", {
              className: "bg-red-400/15 border-red-500 text-white/80",
            });
          }
          setIsLiked(true);
        }
      }}
    >
      <Icon color={liked ? "#22c55e" : "white"} size={25} />
    </button>
  );
}
