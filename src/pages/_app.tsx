import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import { rtlCache } from "rtl-cache";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
        }}
        emotionCache={rtlCache}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
