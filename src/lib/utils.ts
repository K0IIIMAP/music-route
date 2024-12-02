import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const warnStyles = "bg-red-400/15 border-red-500 text-white/80";
export const succStyles = "bg-green-500/15 border-green-400 text-white";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
