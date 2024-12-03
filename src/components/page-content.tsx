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
      <div className="flex  gap-3 w-full">
        {songs.map((song: Song) => (
          <span
            key={song.id}
            onClick={() => {
              if (!user) {
                return toast.error("Log in to play songs");
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
