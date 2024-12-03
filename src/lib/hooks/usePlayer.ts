import { create } from "zustand";

type PlayerStore = {
  ids: number[];
  activeId?: number;
  setId: (id: number) => void;
  setIds: (ids: number[]) => void;
  reset: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  playing: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
};

export const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  volume: 1,
  setVolume: (volume: number) => set({ volume: volume }),
  setId: (id: number) => set({ activeId: id }),
  setIds: (ids: number[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined }),
  playing: false,
  setIsPlaying: (isPlaying: boolean) => set({ playing: isPlaying }),
}));
