import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { Toaster } from "sonner";
import { getSongsById } from "./actions";
import Player from "@/components/player";

const figtree = Figtree({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MusicRoute - Listen, Share and Enjoy",
  description: "A music player with a collection of songs to listen to",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const songsById = await getSongsById();
  return (
    <html lang="en">
      <body className={`${figtree.className}  antialiased`}>
        <Sidebar songsById={songsById}>{children}</Sidebar>
        <Player />
        <Toaster />
      </body>
    </html>
  );
}
