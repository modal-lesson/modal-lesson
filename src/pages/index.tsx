import { type NextPage } from "next";
import Head from "next/head";


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Modal Lesson</title>
        <meta name="description" content="Create lesson plans for teachers!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to Modal Lesson</h1>
      </main>
    </>
  );
};

export default Home;