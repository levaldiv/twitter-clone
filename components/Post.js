function Post({ id, post, postPage }) {
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
              alt=""
              className="h-11 w-11 rounded-full mr-4"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
