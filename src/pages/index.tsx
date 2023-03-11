import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";


const Home: NextPage = () => {
  const {data: session} = useSession(); 
  console.log({session})
  return (
    <>
      <Head>
        <title>Modal Lesson</title>
        <meta name="description" content="Create lesson plans for teachers!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to Modal Lesson</h1>
        <button onClick={() => void signIn()}>asdf</button>
      </main>
    </>
  );
};

export default Home;