import { type ReactElement, type ReactNode } from "react";
import { type NextPage } from "next";
import { type AppProps } from "next/app";
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
import { AUTHENTICATED_ROUTES, NONAUTHENTICATED_ROUTES } from "~/constants";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: Session | null;
};

function MyApp({ Component, pageProps, session }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
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
            <>{getLayout(<Component {...pageProps} />)}</>
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
}

export default api.withTRPC(MyApp);
