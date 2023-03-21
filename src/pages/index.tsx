import Head from "next/head";
import dynamic from "next/dynamic";

const World = dynamic(() => import("@/components/World"));

const Home = () => {
  return (
    <>
      <Head>
        <title>Ball Game</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="w-screen h-screen fixed top-0 left-0">
        <World />
      </div>
    </>
  );
};

export default Home;
