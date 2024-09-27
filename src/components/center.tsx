"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { shuffle } from "lodash";
import { signOut, useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue } from "recoil";

import Image from "next/image";
import { useEffect, useState } from "react";

import useSpotify from "@/hooks/use-spotify";

import { playlistIdState, playlistState } from "../atoms/playlist-atom";
import Songs from "./songs";

const colors: string[] = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState<string>("from-indigo-500");
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    const shuffleColors = shuffle(colors).pop();
    if (shuffleColors) {
      setColor(shuffleColors);
    }
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong!", err));
  }, [spotifyApi, playlistId, setPlaylist]);

  return (
    <div className="scrollbar-hide h-screen flex-grow overflow-y-scroll">
      <header className="absolute right-8 top-5">
        <div
          className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-80"
          onClick={() => signOut()}
        >
          <div className="relative h-10 w-10">
            <Image
              fill
              className="rounded-full"
              src={session?.user.image ?? ""}
              alt={session?.user.name ?? "User"}
            />
          </div>
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="size-6 hover:cursor-pointer hover:text-gray-400" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8 text-white`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url ?? ""}
          alt={playlist?.name ?? ""}
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-5xl font-bold md:text-3xl xl:text-2xl">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
