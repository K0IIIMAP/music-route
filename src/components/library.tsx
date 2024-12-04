"use client";

import React from "react";
import UploadModal from "./upload-modal";
import { Song } from "@/lib/types";
import MediaItem from "./ui/media-item";
import useOnPlay from "@/lib/hooks/useOnPlay";
import { usePlayer } from "@/lib/hooks/usePlayer";

export default function Library({
  songsById: songs,
}: {
  songsById: Song[] | undefined;
}) {
  const onPlay = useOnPlay(songs || []);
  const player = usePlayer();
  // console.log(player.ids);
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <UploadModal />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs?.map((song) => (
          <span key={song.id} onClick={() => onPlay(song.id)}>
            <MediaItem song={song} />
          </span>
        ))}
      </div>
    </div>
  );
}
