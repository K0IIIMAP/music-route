"use client";

import { toast } from "sonner";
import { Song, User } from "../types";
import { usePlayer } from "./usePlayer";
import { useEffect, useState } from "react";
import { getUser } from "@/app/actions";

const useOnPlay = (songs: Song[]) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const forAsync = async () => {
      const user = await getUser();
      setUser(user);
    };
    forAsync();
  }, []);
  const player = usePlayer();

  const onPlay = (id: number) => {
    if (!user) return toast.error("You need to be logged in to play songs");

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
  return onPlay;
};

export default useOnPlay;
