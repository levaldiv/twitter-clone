import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { db } from "../firebase";

function Post({ id, post, postPage }) {
  const { data: session } = useSession();
  // gloablly available
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  // comments are going ot be tracked in fb to be able to see them
  const [comments, setComments] = useState([]);
  // this will allow us to see the number of likes a post got
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  /* How are we going to know a post has been liked and how do we actually setLiked?
   * Bc likes is an array, we can use findIndex to find an index of likes so it takes
   * a predicate and a value */
  useEffect(
    () =>
      /* find index, get one like, then check if the like.id matches the session.user.uid
       * and if it does not return false and will return true instead */
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    // if the post is liked
    if (liked) {
      // have to check if it is already liked, if like is true, delete the doc
      // go into db -> "posts" -> id -> go into the collection of likes -> look for uid of user
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      /* go into db -> post collections -> particular post -> go into the collection of likes (the collection of
       * likes is being created here) -> inside the collection of likes, i want this like to be stored inside of
       * the id of the session.user.uid */
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  };

  return (
    <div
      className="p-3 flex cursor-pointer border-b border-gray-700"
      // when i click on my post, i want to push to a page called /id
      onClick={() => router.push(`/${id}`)}
    >
      {/* Using option chaining to prevent erroring out
       * If it is undefined, it waits until it gets the user image
       * This will only happen if it is a post */}
      {!postPage && (
        <img
          src={post?.userImg}
          alt=""
          className="h-11 w-11 rounded-full mr-4"
        />
      )}

      <div className="flex flex-col space-y-2 w-full">
        {/* if it is not a post page, do just bw */}
        <div className={`flex ${!postPage && "justify-between"}`}>
          {/* If it is a post page */}
          {postPage && (
            <img
              src={post?.userImg}
              alt="Profile pic"
              className="h-11 w-11 rounded-full mr-4"
            />
          )}

          {/* This will show the post the user made with all the info */}
          <div className="text-[#6e767d]">
            {/* group: the hover action will happen for the items inside this div (upto the @tag) */}
            <div className="inline-block group">
              <h4
                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${
                  !postPage && "inline-block"
                }`}
              >
                {post?.username}
              </h4>
              <span
                className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}
              >
                @{post?.tag}
              </span>
            </div>{" "}
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow> {post?.timestamp?.toDate()} </Moment>
            </span>
            {!postPage && (
              <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                {post?.text}
              </p>
            )}
          </div>

          <div className="icon group flex-shrink-0 ml-auto">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>

        {postPage && (
          <p className="text-[#d9d9d9] mt-0.5 text-xl">{post?.text}</p>
        )}
        <img
          src={post?.image}
          alt=""
          className="rounded-2xl max-h-[700px] object-cover mr-2"
        />

        <div
          className={`text-[#6e767d] flex justify-between w-10/12 ${
            postPage && "mx-auto"
          }`}
        >
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              // this prevents the routing when clicking the item
              e.stopPropagation();
              // set the postid to the id of the post, which we are going to retrieve through the feed
              setPostId(id);
              // this is the modal state, so in this case i want it to be open
              setIsOpen(true);
            }}
          >
            <div className="icon group:hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>

            {/* When comments = 0, dont show anything but when there is a reply,
             * show the following (will show how many comments the post has) */}
            {comments.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {/* Fetching the comments (array) through a useEffect */}
                {comments.length}
              </span>
            )}
          </div>

          {/* Only want to display delete icon when it is MY post and not someonelse's
           * Through MY session, im checking the uid with the post id to see if they match
           * so it knows it is MY session */}
          {session.user.uid === post?.id ? (
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                // ensures it doesnt open to a new page via onclick
                e.stopPropagation();
                // using firebase to delete the post i want to delete
                deleteDoc(doc(db, "posts", id));
                // after deleting that post i want to push back to our home page
                router.push("/");
              }}
            >
              <div className="icon group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          ) : (
            // If the post is not mine, show this icon instead
            <div className="flex items-center space-x-1 group">
              <div className="icon group-hover:bg-green-500/10">
                <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
              </div>
            </div>
          )}

          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              // this will happen when we click on the heart
              likePost();
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {/* this will display the number of likes for a post if it has more than 0
             * It will fetch the number of likes from firebase */}
            {likes.length > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  liked && "text-pink-600"
                }`}
              >
                {likes.length}
              </span>
            )}
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>

          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
