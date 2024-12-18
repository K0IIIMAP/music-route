"use client";
import { Song, User } from "@/lib/types";
import React from "react";
import SongItem from "./song-item";
import useOnPlay from "@/lib/hooks/useOnPlay";
import { usePlayer } from "@/lib/hooks/usePlayer";
import { toast } from "sonner";

export default function PageContent({
  songs,
  user,
}: {
  songs: Song[] | undefined;
  user: User | null;
}) {
  const player = usePlayer();
  const onPlay = useOnPlay(songs!);
  if (!songs || songs.length === 0) return;
  return (
    <main className="w-full">
      <div className="flex  flex-wrap gap-3 w-full mt-5 max-sm:pb-20 max-sm:justify-center">
        {songs.map((song: Song) => (
          <span
            key={song.id}
            onClick={() => {
              if (!user) {
                return toast.error("You must be logged in to play", {
                  className:
                    "bg-red-400/15 border-red-500 text-white/80 backdrop-blur-xl ",
                });
              }
              onPlay(song.id);
            }}
          >
            <SongItem song={song} active={song?.id === player?.activeId} />
          </span>
        ))}
      </div>
    </main>
  );
}
