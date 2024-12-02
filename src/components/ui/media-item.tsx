import { getImage } from "@/lib/helpers";
import { Song } from "@/lib/types";
import Image from "next/image";
import React from "react";

export default function MediaItem({ song }: { song: Song }) {
  const imageUrl = getImage(song);
  return (
    <div className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md">
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden  ">
        <Image fill src={imageUrl!} alt={song.title!} />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate w-full">{song.title} </p>
        <p className="text-neutral-400 text-sm truncate w-full">
          {song.author}
        </p>
      </div>
    </div>
  );
}
