import { type NextPage } from "next";
import Head from "next/head";
import { Feature } from "~/components/Feature";
import { Hero } from "~/components/Hero";
import { Waitlist } from "~/components/Waitlist";

const Home: NextPage = () => {
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
