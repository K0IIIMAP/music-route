"use client";
import { Song } from "@/lib/types";
import React from "react";
import SongItem from "./song-item";
import useOnPlay from "@/lib/hooks/useOnPlay";

export default function PageContent({ songs }: { songs: Song[] | undefined }) {
  const onPlay = useOnPlay(songs!);
  if (!songs || songs.length === 0) return;
  return (
    <main className="w-full">
      <div className="flex  gap-3 w-full">
        {songs.map((song: Song) => (
          <span
            key={song.id}
            onClick={() => {
              onPlay(song.id);
            }}
          >
            <SongItem song={song} />
          </span>
        ))}
      </div>
    </main>
  );
}
