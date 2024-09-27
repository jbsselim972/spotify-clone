"use client";

import { useRecoilState } from "recoil";

import Image from "next/image";

import { currentTrackIdState, isPlayingState } from "@/atoms/song-atom";
import useSpotify from "@/hooks/use-spotify";
import { millisToMinutesAndSeconds } from "@/lib/time";

type SongProps = {
  order: number;
  track: SpotifyApi.PlaylistTrackObject;
};

function Song({ order, track }: SongProps) {
  const spotifyApi = useSpotify();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    if (!track.track) return;
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  if (!track.track) return null;

  return (
    <div
      className="grid cursor-pointer grid-cols-2 rounded-lg px-5 py-4 text-gray-500 hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <div className="relative h-10 w-10">
          <Image
            fill
            className="h-10 w-10"
            src={track.track.album.images[0].url}
            alt=""
          />
        </div>
        <div>
          <p className="w-32 truncate text-white lg:w-64">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden w-40 md:inline-flex">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
