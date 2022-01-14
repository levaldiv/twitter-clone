import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";

function PostPage() {
  const { data: session } = useSessionSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  return (
    <div className="">
      <Head>
        <title>Twitter</title>
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
