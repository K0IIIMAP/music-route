"use client";
import { Song, User } from "@/lib/types";
import React, { useEffect, useLayoutEffect, useState } from "react";
import MediaItem from "./ui/media-item";
import LikeButton from "./like-button";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import useSound from "use-sound";
import SliderComponent from "./slider";
import { usePlayer } from "@/lib/hooks/usePlayer";
import { getUser } from "@/app/actions";

export default function PlayerContent({
  song,
  songUrl,
}: {
  song: Song;
  songUrl: string;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const forAsync = async () => {
      const user = await getUser();
      setUser(user);
    };
    forAsync();
  }, []);
  const player = usePlayer();
  console.log(player.activeId);

  const [playing, setIsPlaying] = useState(false);

  const VolumeIcon = player.volume ? HiSpeakerWave : HiSpeakerXMark;
  const Icon = playing ? BsPauseFill : BsPlayFill;

  const onPlayNext = () => {
    if (player.ids.length === 0) return;
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    const nextId = player.ids[currentIndex + 1];

    if (!nextId) {
      return player.setId(player.ids[0]);
    }
    player.setId(nextId);
  };
  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousId = player.ids[currentIndex - 1];
    if (!previousId) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    player.setId(previousId);
  };
  const [play, { pause, sound }] = useSound(songUrl, {
    volume: player.volume / 100,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => {
      setIsPlaying(false);
    },
    format: ["mp3", "wav", "mpeg"],
  });

  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);
  const handlePlay = () => {
    if (playing) {
      sound?.pause();
      setIsPlaying(false);
    } else {
      sound?.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (player.volume === 0) {
      player.setVolume(1);
    } else {
      player.setVolume(0);
    }
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem song={song} />
          <LikeButton songId={song.id} user={user} />
        </div>
      </div>
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={() => {}}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>
      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={onPlayPrevious}
        />
        <div
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
          onClick={handlePlay}
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={32}
          />
          <SliderComponent />
        </div>
      </div>
    </div>
  );
}
