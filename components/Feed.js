import { SparklesIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import Input from "./Input";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";
import { useSession } from "next-auth/react";

function Feed() {
  const { data: session } = useSession();
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
    <div className="sideBorder">
      {/* Sticky:  */}
      <div className="topSection">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>

        {/* When i hover over this, i want my icon to be in the center */}
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
          <SparklesIcon className="h-5 text-white" />
        </div>
      </div>

      <Input />

      <div className="pb-72">
        {posts.map((post) => (
          // Key is never sent as a prop
          // data contains all the attributes created in input.js
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
