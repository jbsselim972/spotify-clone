"use client";

import { useRecoilValue } from "recoil";

import { playlistState } from "@/atoms/playlist-atom";

import Song from "./song";

function Songs() {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="flex flex-col space-y-1 px-8 pb-28 text-white">
      {playlist?.tracks.items.map((track, i) => (
        <Song key={track?.track?.id} order={i} track={track} />
      ))}
    </div>
  );
}

export default Songs;
