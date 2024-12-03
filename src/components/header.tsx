import React from "react";

import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

import ForwardBackBtns from "./forw-back-btns";
import Nav from "./nav";

import { getUser } from "@/app/actions";
import Link from "next/link";

export default async function Header({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const user = await getUser();

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6 ${className}`
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <ForwardBackBtns />
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <Link href="/">
              <HiHome className="text-black" size={20} />
            </Link>
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <Link href="/search">
              <BiSearch className="text-black" size={20} />
            </Link>
          </button>
        </div>
        <Nav user={user} />
      </div>
      {children}
    </div>
  );
}
