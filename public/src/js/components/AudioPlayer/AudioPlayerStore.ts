import { create } from "zustand";

type AudioPlayerStore = {
  isPlaying: boolean;
  setPlaying: (playing: boolean) => void;

  currentTime: number;
  setCurrentTime: (time: number) => void;
}

export const useAudioPlayerStore = create<AudioPlayerStore>((set) => ({
  isPlaying: false,
  setPlaying: (playing: boolean) => set({ isPlaying: playing }),

  currentTime: 0,
  setCurrentTime: (time: number) => set({ currentTime: time }),
}));
