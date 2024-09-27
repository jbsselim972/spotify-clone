"use client";

import { signIn } from "next-auth/react";

import Image from "next/image";

function Login() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
      <Image
        className="mb-5 w-52"
        src="https://i.imgur.com/fPuEa9V_d.webp?maxwidth=760&fidelity=grand"
        alt="spotify"
        width={200}
        height={200}
      />

      <button
        onClick={() => signIn("spotify", { callbackUrl: "/" })}
        className="rounded-full bg-[#18D860] p-5 font-bold text-white hover:bg-green-600"
      >
        Login with your Spotify Account
      </button>
    </div>
  );
}

export default Login;
