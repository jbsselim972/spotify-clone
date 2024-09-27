"use client";

import {
  HomeIcon,
  BuildingLibraryIcon as LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  MagnifyingGlassIcon as SearchIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

import { useEffect, useState } from "react";

import { playlistIdState } from "@/atoms/playlist-atom";
import useSpotify from "@/hooks/use-spotify";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="scrollbar-hide hidden h-screen overflow-y-scroll border-r border-gray-900 p-5 pb-36 text-xs text-gray-500 sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] lg:text-sm">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="size-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="size-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="size-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="size-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="size-5 text-blue-500" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="size-5 text-green-500" />
          <p>Your episodes</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        {/**Playlists */}
        {playlists.map((playlist) => (
          <p
            onClick={() => setPlaylistId(playlist.id)}
            key={playlist.id}
            id={playlistId === playlist.id ? "active" : ""}
            className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
