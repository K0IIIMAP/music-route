"use client";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Box from "./box";
import SidebarItem from "./sidrebar-item";
import Library from "./library";
import { Song } from "@/lib/types";
import { usePlayer } from "@/lib/hooks/usePlayer";
import { cn } from "@/lib/utils";

export default function Sidebar({
  children,
  songsById,
}: {
  children: React.ReactNode;
  songsById: Song[] | undefined;
}) {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );
  const player = usePlayer();
  return (
    <div
      className={cn(`flex h-full`, player.activeId && "h-[calc(100%-80px)]")}
    >
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songsById={songsById} />
        </Box>
      </div>
      <main className="w-full md:py-2 md:pr-2">{children}</main>
    </div>
  );
}
