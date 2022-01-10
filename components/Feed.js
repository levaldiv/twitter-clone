import { SparklesIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import Input from "./Input";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";
import { useSession } from "next-auth/react";

function Feed() {
  // these vars will allow me to retrieve the posts from firebase
  const [posts, setPosts] = useState([]);

  /* Messy way to retrieve posts:
  useEffect(() => {
    const unsubscribe = onSnapshot(
      // querying our posts by timestamp
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      // receiving snapshot 
      (snapshot) => {
        // setting all posts to snapshot docs
        setPosts(snapshot.docs);
      }
    );

    // we can just do an implicit return instead of explicit
    return () => {
    unsubscribe();
    };
  }, [db]); */

  /* Updated "Cleaner" way */
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );
  // console.log(posts);

  return (
    <div
      className="text-white flex-grow border-l border-r border-gray-700
  max-w-2xl sm:ml-[73px] xl:ml-[370px]"
    >
      {/* Sticky:  */}
      <div
        className="text-[#d9d9d9] flex items-center sm:justify-between py-2
      px-3 sticky top-0 z-50 bg-black border-b border-gray-700"
      >
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>

        {/* When i hover over this, i want my icon to be in the center */}
        <div
          className="hoverAnimation w-9 h-9 flex items-center justify-center
        xl:px-0 ml-auto"
        >
          <SparklesIcon className="h-5 text-white" />
        </div>
      </div>

      <Input />

      <div className="pb-72">
        {posts.map((post) => (
          // Key is never sent as a prop
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
