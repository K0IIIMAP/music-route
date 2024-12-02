"use client";
import { getImage } from "@/lib/helpers";
import { Song } from "@/lib/types";
import Image from "next/image";
import React from "react";
import PlayButton from "./play-button";
import { cn } from "@/lib/utils";

export default function SongItem({
  song,
  active,
}: {
  song: Song;
  active: boolean;
}) {
  const imagePath = getImage(song);

  return (
    <div
      className={cn(
        `relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3 text-white w-[200px]`,
        active && "bg-neutral-400/10"
      )}
    >
      <div className="relative aspect-square w-full rounded-md overflow-hidden">
        <Image
          src={imagePath!}
          fill
          className="object-cover"
          alt={imagePath!}
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{song.title}</p>
        <p className="text-neutral-400 text-sm pb-4 truncate w-full">
          by {song.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton active={active} />
      </div>
    </div>
  );
}
