import React from "react";
import { getLikedSongs, getUser } from "../actions";
import Header from "@/components/header";
import Image from "next/image";
import LikedContent from "@/components/liked-content";

import { redirect } from "next/navigation";

export default async function LikedPage() {
  const songs = await getLikedSongs();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }
  return (
    <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <Image
                src="/liked.png"
                fill
                alt="playlist"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">PlayList</p>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>{" "}
      </Header>
      <LikedContent songs={songs} user={user} />
    </div>
  );
}
