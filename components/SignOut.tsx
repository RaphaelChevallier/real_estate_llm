"use client";

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";

export const SignOut = () => {
  return (
    <Button
      onClick={() => signOut()}
      className="text-sm font-semibold leading-6 text-red-700 hover:scale-110"
    >
      Sign Out
    </Button>
  );
};
