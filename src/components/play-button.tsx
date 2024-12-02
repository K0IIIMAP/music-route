import { cn } from "@/lib/utils";
import React from "react";
import { FaPlay } from "react-icons/fa";

export default function PlayButton({ active }: { active?: boolean }) {
  return (
    <button
      className={cn(
        `transition opacity-0 rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110`,
        active && "opacity-100 :translate-y-0 "
      )}
    >
      <FaPlay className="text-black" />
    </button>
  );
}
