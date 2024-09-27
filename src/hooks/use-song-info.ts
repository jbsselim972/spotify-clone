import { useRecoilState } from "recoil";

import { useEffect, useState } from "react";

import { currentTrackIdState } from "../atoms/song-atom";
import useSpotify from "./use-spotify";

type SongInfo = {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
};

function useSongInfo() {
  const spotifyApi = useSpotify();
  const [currentTrackId] = useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState<SongInfo | null>(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());
        console.log(spotifyApi.getAccessToken());

        setSongInfo(trackInfo);
      }
    };

    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);
  return songInfo;
}

export default useSongInfo;
