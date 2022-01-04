import Head from "next/head";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Creating main component that will nest sub components */}
      <main>
        {/* Sidebar */}
        {/* Feed */}
        {/* Widgets */}

        {/* Modal (using recoil to control the state of the modal) */}
      </main>
    </div>
  );
}
