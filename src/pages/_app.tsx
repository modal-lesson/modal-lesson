import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { LandingPageLayout } from "~/layout/LandingPageLayout";
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
import { MainLayout } from "~/layout/MainLayout";

const NONAUTHENTICATED_ROUTES = ["/login"];
const AUTHENTICATED_ROUTES = [
  "/home",
  "/settings",
  "/profile",
  "/create",
  "/create/class",
];

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || colorScheme === "dark" ? "light" : "dark");

  const showLandingPageHeaderAndFooter = NONAUTHENTICATED_ROUTES.includes(
    router.pathname
  );
  const showSidebarInMainLayout = AUTHENTICATED_ROUTES.includes(
    router.pathname
  );

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
          {showSidebarInMainLayout ? (
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          ) : (
            <LandingPageLayout>
              {!showLandingPageHeaderAndFooter && <Navbar />}
              <Component {...pageProps} />
              {!showLandingPageHeaderAndFooter && <Footer />}
            </LandingPageLayout>
          )}
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
