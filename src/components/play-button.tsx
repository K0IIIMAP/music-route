"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import {
  DotLottieCommonPlayer,
  DotLottiePlayer,
} from "@dotlottie/react-player";
import { FaPlay } from "react-icons/fa";

import { usePlayer } from "@/lib/hooks/usePlayer";

export default function PlayButton({ active }: { active?: boolean }) {
  const dotLottieRef = useRef<DotLottieCommonPlayer>(null);
  const player = usePlayer();
  useEffect(() => {
    if (!dotLottieRef) return;
    if (player.playing) {
      dotLottieRef?.current?.seek(0);
      dotLottieRef?.current?.play();
    } else {
      dotLottieRef?.current?.pause();
    }
  }, [player.playing, dotLottieRef.current]);

  return (
    <button
      className={cn(
        `relative transition opacity-0 rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110`,
        active && "opacity-100 :translate-y-0 w-[45px] h-[45px] scale-110 "
      )}
    >
      {!active ? (
        <FaPlay className="text-black" />
      ) : (
        <DotLottiePlayer
          src="/playing.lottie"
          loop
          ref={dotLottieRef}
          className="absolute w-[70px] h-[70px] right-[49%] translate-x-1/2 bottom-[-5px]"
        />
      )}
    </button>
  );
}
