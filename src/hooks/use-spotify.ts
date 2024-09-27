import { signIn, useSession } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";

import { useEffect } from "react";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
});

function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      //If refresh access token attemps fails, direct user to lotgin
      if (session.error === "RefreshAccessTokenError") {
        signIn("spotify", { callbackUrl: process.env.NEXT_PUBLIC_URL });
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return spotifyApi;
}

export default useSpotify;
