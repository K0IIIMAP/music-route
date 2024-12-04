"use client";

import useGetSongById from "@/lib/hooks/useGetSongsById";
import useLoadSongUrl from "@/lib/hooks/useLoadSongUrl";
import { usePlayer } from "@/lib/hooks/usePlayer";
import React from "react";
import PlayerContent from "./player-content";

export default function Player() {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSongUrl(song?.song_path);
  if (!song || !songUrl || !player.activeId) return null;
  // console.log(player);
  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent
        key={songUrl} // for loading a new song when song changes
        song={song}
        songUrl={songUrl}
      />
    </div>
  );
}
