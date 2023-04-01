import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Layout } from "~/layout/Layout";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import {
  type ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { emotionCache } from "~/emotionCache";
import { useState } from "react";
import { Notifications } from "@mantine/notifications";
import { useRouter } from "next/router";

const ROUTE_PATH = {
  login: "/login",
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || colorScheme === "dark" ? "light" : "dark");

  const loginPage = router.pathname === ROUTE_PATH.login ? true : false;

  return (
    <SessionProvider session={session}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          emotionCache={emotionCache()}
          theme={{ colorScheme }}
        >
          <Notifications position="bottom-center" className="!bg-primary" />
          <Layout>
            {!loginPage && <Navbar />}
            <Component {...pageProps} />
            {!loginPage && <Footer />}
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
