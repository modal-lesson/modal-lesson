import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Layout } from "~/layout/Layout";
import { Footer } from "~/components/Footer";
import { Nav } from "~/components/Nav";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
