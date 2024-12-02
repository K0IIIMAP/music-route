"use client";
import React, { useState } from "react";
import { Slider } from "./ui/slider";

export default function SliderComponent({
  volume,
  setVolume,
}: {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <Slider
      defaultValue={[volume]}
      max={100}
      step={2}
      value={[volume]}
      onValueChange={(value) => setVolume(value[0])}
      aria-label="Volume"
    />
  );
}
