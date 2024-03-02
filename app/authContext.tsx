"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthContext(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>,
  { session }: { session: any }
) {
  return (
    <SessionProvider refetchInterval={3 * 60 * 60} session={session}>
      {children}
    </SessionProvider>
  );
}
