import React from "react";
import MediaItem from "./ui/media-item";
import { Song } from "@/lib/types";
import LikeButton from "./like-button";
import { getUser } from "@/app/actions";

export default async function SearchContainer({ songs }: { songs: Song[] }) {
  const user = await getUser();
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
              <div className="flex-1">
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
