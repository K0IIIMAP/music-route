"use client";

import { getUser } from "@/app/actions";
import { supabaseClient } from "@/app/utils/supabase/client";
import { User } from "@/lib/types";
import { warnStyles } from "@/lib/utils";

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
          return toast.error("You must be logged in to like a song", {
            className: `${warnStyles}`,
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
              className: warnStyles,
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
              className: `${warnStyles}`,
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
