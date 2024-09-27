import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";

import spotifyApi, { LOGIN_URL } from "@/lib/spotify";

async function refreshAccessToken(token: JWT) {
  try {
    spotifyApi.setAccessToken(token.accessToken!);
    spotifyApi.setRefreshToken(token.refreshToken!);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    // console.log("refresh token is ",refreshedToken)

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accesTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // 1hours as 3600 return from spotify API
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, //Replace if new one came back
    };
  } catch {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID!,
      clientSecret: process.env.SPOTIFY_SECRET!,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      //initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accesTokenExpires: account.expires_at,
        };
      }

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken!;
      session.user.refreshToken = token.refreshToken!;
      session.user.username = token.username!;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
