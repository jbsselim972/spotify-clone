import { atom } from "recoil";

export const currentTrackIdState = atom({
  key: "currentTrackIdState",
  default: null as string | null,
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});
