"use client";
import React from "react";
import MediaItem from "./ui/media-item";
import { Song, User } from "@/lib/types";
import LikeButton from "./like-button";
import useOnPlay from "@/lib/hooks/useOnPlay";
import { toast } from "sonner";

export default function SearchContainer({
  songs,
  user,
}: {
  songs: Song[];
  user: User | null;
}) {
  const onPlay = useOnPlay(songs || []);
  return (
    <>
      {songs.length === 0 ? (
        <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
          No Songs Found
        </div>
      ) : (
        <div className="flex flex-col gap-y-2 w-full px-6">
          {songs.map((song) => (
            <div key={song.id} className="flex items-center gap-x-4 w-full">
              <div
                className="flex-1"
                onClick={() => {
                  if (!user) {
                    return toast.error("You must be logged in to play songs", {
                      className: "bg-red-400/15 border-red-500 text-white/80",
                    });
                  }
                  onPlay(song.id);
                }}
              >
                <MediaItem song={song} />
              </div>

              <LikeButton songId={song.id} user={user} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
