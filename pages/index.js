import Head from "next/head";
import Sidebar from "../components/Sidebar";

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
        {/* Widgets */}

        {/* Modal (using recoil to control the state of the modal) */}
      </main>
    </div>
  );
}
