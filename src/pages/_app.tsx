import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Layout } from "~/layout/Layout";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import { MantineProvider } from "@mantine/core";
import { emotionCache } from "~/emotionCache";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        emotionCache={emotionCache()}
        theme={{
          colorScheme: "dark",
        }}
      >
        <Layout>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </Layout>
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
