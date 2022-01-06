import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import { getProviders, getSession, useSession } from "next-auth/react";

export default function Home() {
  return (
    <div className="">
      {/* The head edits the text/icon next to the tab */}
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Creating main component that will nest sub components */}
      {/* To have custom values just use []
       * Ex: h-[400px] or bg-[#000] */}
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
        {/* Widgets */}

        {/* Modal (using recoil to control the state of the modal) */}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // trend and follow were created for the widgets comp; both fetching to an api endpoint
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}
