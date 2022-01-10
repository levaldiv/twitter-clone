import { ChatIcon, DotsHorizontalIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";

function Post({ id, post, postPage }) {
  const { data: session } = useSession();
  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700">
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
            </div>
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              {/* <Moment fromNow> {post?.timestamp?.toDate()} </Moment> */}
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
              e.stopPropagation();
              setPostId(id);
              setIsOpen(true);
            }}
          >
            <div className="icon group:hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>

            {customElements.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;