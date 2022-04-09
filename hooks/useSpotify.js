import {signIn,useSession} from "next-auth/react"
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi  = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET
})

function useSpotify() {
    const {data:session,status} = useSession();
    
    useEffect(()=>{
        if(session){
            //If refresh access token attemps fails, direct user to lotgin
            if(session.error==='RefreshAccessTokenError'){
                signIn();
            }

            spotifyApi.setAccessToken(session.user.accessToken);
        }
    },[session])

  return spotifyApi;
}

export default useSpotify