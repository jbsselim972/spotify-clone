"use client";

import { SpeakerXMarkIcon as VolumeDownIcon } from "@heroicons/react/24/outline";
import {
  ForwardIcon as FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ArrowUturnLeftIcon as ReplyIcon,
  BackwardIcon as RewindIcon,
  ArrowsRightLeftIcon as SwitchHorizontalIcon,
  SpeakerWaveIcon as VolumeUpIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

import Image from "next/image";
import { useEffect, useState } from "react";

import useSpotify from "@/hooks/use-spotify";

import { currentTrackIdState, isPlayingState } from "../atoms/song-atom";
import useSongInfo from "../hooks/use-song-info";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      const fetchCurrentSong = () => {
        if (!songInfo) {
          spotifyApi.getMyCurrentPlayingTrack().then((data) => {
            console.log("Now playing: ", data.body?.item);
            if (!data.body?.item) return;
            setCurrentTrackId(data.body?.item?.id);

            spotifyApi.getMyCurrentPlaybackState().then((data) => {
              setIsPlaying(data.body?.is_playing);
            });
          });
        }
      };

      fetchCurrentSong();
      setVolume(50);
    }
  }, [
    currentTrackId,
    spotifyApi,
    session,
    songInfo,
    setCurrentTrackId,
    setIsPlaying,
  ]);

  return (
    <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-900 px-2 text-xs text-white md:px-8 md:text-base">
      {/**Left */}
      {songInfo && (
        <div className="flex items-center justify-center space-x-4">
          <div className="relative h-10 w-10">
            <Image
              fill
              className="hidden md:inline"
              src={songInfo?.album.images?.[0]?.url}
              alt={songInfo?.name}
            />
          </div>
          <div>
            <h3>{songInfo?.name}</h3>
            <p>{songInfo?.artists?.[0]?.name}</p>
          </div>
        </div>
      )}

      {/**Center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button size-6 hover:cursor-pointer hover:text-gray-300" />
        <RewindIcon
          onClick={() => spotifyApi.skipToPrevious()}
          className="button size-6 hover:cursor-pointer hover:text-gray-300"
        />
        {isPlaying ? (
          <PauseIcon
            onClick={handlePlayPause}
            className="button size-6 hover:cursor-pointer hover:text-gray-300"
          />
        ) : (
          <PlayIcon
            onClick={handlePlayPause}
            className="button size-6 hover:cursor-pointer hover:text-gray-300"
          />
        )}

        <FastForwardIcon
          onClick={() => spotifyApi.skipToNext()}
          className="button size-6 hover:cursor-pointer hover:text-gray-300"
        />
        <ReplyIcon className="button size-6 hover:cursor-pointer hover:text-gray-300" />
      </div>

      {/**Right  */}
      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="button size-6 hover:cursor-pointer hover:text-gray-300"
        />
        <input
          className="w-14 cursor-pointer md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="button size-6 hover:cursor-pointer hover:text-gray-300"
        />
      </div>
    </div>
  );
}

export default Player;
