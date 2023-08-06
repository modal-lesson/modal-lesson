"use client";

import { useSearchParams, useRouter } from "next/navigation";

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("callback_url") ?? "/";

  const handleLogin = () => {
    router.push(search);
  };

  return (
    <div>
      <p>temp auth form</p>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
}
