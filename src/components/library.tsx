"use client";

import React from "react";
import UploadModal from "./upload-modal";
import { Song } from "@/lib/types";
import MediaItem from "./ui/media-item";

export default function Library({
  songsById: songs,
}: {
  songsById: Song[] | undefined;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <UploadModal />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs?.map((song) => (
          <MediaItem key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}
