"use client";

import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  );
}

export default AuthProvider;
