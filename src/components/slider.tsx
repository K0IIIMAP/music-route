"use client";
import React, { useState } from "react";
import { Slider } from "./ui/slider";
import { usePlayer } from "@/lib/hooks/usePlayer";

export default function SliderComponent() {
  const { volume, setVolume } = usePlayer();
  return (
    <Slider
      defaultValue={[volume]}
      max={100}
      step={2}
      value={[volume]}
      onValueChange={(value) => {
        setVolume(value[0]);
      }}
      aria-label="Volume"
    />
  );
}
