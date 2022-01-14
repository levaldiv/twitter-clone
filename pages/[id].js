import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
// import Widgets from "../components/Widgets";
// import Post from "../components/Post";
import { db } from "../firebase";
import { ArrowLeftIcon } from "@heroicons/react/solid";
// import Comment from "../components/Comment";
import Head from "next/head";

function PostPage({ trendingResults, followResults, providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();

  // getting the post
  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );
  /* Doesnt return if there is no session, so i return the login component */
  if (!session) return <Login providers={providers} />;

  return (
    <div className="">
      <Head>
        <title>
          {/* added dynamic info to show in the tab bar */}
          {post?.username} on Twitter: "{post?.text}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        {isOpen && <Modal />}
      </main>
    </div>
  );
}

export default PostPage;

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
