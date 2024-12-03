"use client";
import Box from "@/components/box";
import React from "react";

import { Audio } from "react-loader-spinner";

export default function Loading() {
  return (
    <Box className="h-full flex items-center justify-center">
      <Audio
        height="120"
        width="120"
        color="#22c55e"
        ariaLabel="three-dots-loading"
      />
    </Box>
  );
}
