"use client";

import { Button } from "@/components/ui/button";
import { env } from "@/env.mjs";
import { signIn } from "next-auth/react";

export function SignIn() {
  const handleSignIn = () => {
    signIn("google", { callbackUrl: `${env.BASE_URL}/dashboard"` });
  };

  return (
    <div>
      <Button onClick={handleSignIn}>Sign in</Button>
    </div>
  );
}
