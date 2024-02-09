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
    <SessionProvider refetchInterval={60 * 5} session={session}>
      {children}
    </SessionProvider>
  );
}
