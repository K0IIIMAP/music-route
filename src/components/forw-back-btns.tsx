"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

export default function ForwardBackBtns() {
  const router = useRouter();

  return (
    <>
      {" "}
      <button
        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
        onClick={() => router.back()}
      >
        <RxCaretLeft className="text-white" size={35} />
      </button>
      <button
        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
        onClick={() => router.forward()}
      >
        <RxCaretRight className="text-white" size={35} />
      </button>
    </>
  );
}
