"use client";
import { Song, User } from "@/lib/types";

import React from "react";
import MediaItem from "./ui/media-item";
import LikeButton from "./like-button";
import useOnPlay from "@/lib/hooks/useOnPlay";

export default function LikedContent({
  songs,
  user,
}: {
  songs: Song[] | undefined;
  user: User | null;
}) {
  const onPlay = useOnPlay(songs || []);
  if (!songs)
    return (
      <div className="px-10 max-md:text-center text-xl md:text-5xl">
        No liked songs
      </div>
    );

  return (
    <>
      {songs?.length === 0 ? (
        <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
          No liked songs
        </div>
      ) : (
        <div className="flex flex-col gap-y-2 w-full p-6">
          {songs.map((song) => (
            <div key={song.id} className="flex items-center gap-x-4 w-full">
              <div
                className="flex-1"
                onClick={() => {
                  if (!user) return;
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
