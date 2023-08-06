"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function AuthForm() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get("callback_url") ?? "/dashboard";

  const handleLogin = () => {
    setLoading(true);
    try {
      signIn("google", { callbackUrl: search });
    } catch (error) {
      if (error instanceof Error) {
        // TODO: change to toast
        throw new Error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Welcome to Modal Lesson</CardTitle>
        <CardDescription>Sign in to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5 items-center">
            <Label htmlFor="name">Google</Label>
            <Button disabled={loading} onClick={handleLogin}>
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Sign in with Google"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
