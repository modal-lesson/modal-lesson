import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Feature } from "~/components/Feature";
import { Hero } from "~/components/Hero";
import { Waitlist } from "~/components/Waitlist";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const userQuery = api.user.me.useQuery(undefined, {
    enabled: session?.user !== undefined,
  });

  useEffect(() => {
    if (userQuery.data) {
      void router.push("/home");
    }
  }, [router, userQuery.data]);

  return (
    <>
      <Head>
        <title>Modal Lesson</title>
        <meta name="description" content="Create lesson plans for teachers!" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <main className="flex-grow">
        <Hero />
        <Feature />
        <Waitlist />
      </main>
    </>
  );
};

export default Home;
