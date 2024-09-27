import { atom } from "recoil";

export const playlistState = atom({
  key: "playlistState",
  default: null as SpotifyApi.SinglePlaylistResponse | null,
});

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "37i9dQZF1DZ06evO47cwRq",
});
