"use client";

import { Song } from "../types";
import { usePlayer } from "./usePlayer";

const useOnPlay = (songs: Song[]) => {
  // const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   const forAsync = async () => {
  //     const user = await getUser();
  //     setUser(user);
  //   };
  //   forAsync();
  // }, []); // for the faster loading user has to be passed from a
  const player = usePlayer();

  const onPlay = (id: number) => {
    // if (!user) return toast.error("You need to be logged in to play songs");

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
  return onPlay;
};

export default useOnPlay;
