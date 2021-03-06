import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  onSnapshot,
  doc,
  addDoc,
  collection,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Moment from "react-moment";

function Modal() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");
  const router = useRouter();

  useEffect(
    () =>
      // Get a snapshot -> go into the document -> retrieve this single post
      onSnapshot(doc(db, "posts", postId), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );

  // accepting an event
  const sendComment = async (e) => {
    // dont want the page to refresh
    e.preventDefault();

    // going to the collection of db -> into posts -> inside postId -> create a collection of comments and add the comments inside there
    await addDoc(collection(db, "posts", postId, "comments"), {
      // whats going to be stored inside comments
      comment: comment,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    // do these things after successfully storing the comment
    setIsOpen(false);
    setComment("");

    // push to that page (where the comment is going to be)
    router.push(`/${postId}`);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={setIsOpen}>
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0" >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" >
            
            <div className="popupBkgd">
              <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
                <div
                  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                  // this lets user click the x icon and close the modal (changing globally)
                  onClick={() => setIsOpen(false)} >
                  
                  <XIcon className="h-[22px] text-white" />
                </div>
              </div>

              <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                <div className="w-full">
                  <div className="text-[#6e767d] flex gap-x-3 relative">
                    
                    <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600" />
                    <img
                      src={post?.userImg}
                      alt=""
                      className="h-11 w-11 rounded-full" />

                    <div>
                      <div className="inline-block group">
                        
                        <h4 className="font-bold text-[#d9d9d9] inline-block text-[15px] sm:text-base">
                          {post?.username}
                        </h4>
                        
                        <span className="ml-1.5 text-sm sm:text-[15px]">
                          {" "}
                          @{post?.tag}{" "}
                        </span>
                      </div>{" "}
                      ??{" "}
                      
                      <span>
                        <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                      </span>
                      
                      <p className="text-[#d9d9d9] text-[15px] sm:text-base">
                        {post?.text}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 flex space-x-3 w-full">
                    <img
                      // this will be the image for the person who is going to reply to the post
                      src={session.user.image}
                      className="h-11 w-11 rounded-full" />

                    <div className="flex-grow mt-2">
                      {/* This is where the user will post their reply to a previously made post */}
                      <textarea
                        // comment is a piece of state
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tweet your reply"
                        rows="2"
                        className="tweetComm" />

                      <div className="flex items-center justify-between pt-2.5">
                        <div className="flex items-center">
                          <div className="icon">
                            <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>

                          <div className="icon rotate-90">
                            <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>

                          <div className="icon">
                            <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>

                          <div className="icon">
                            <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>
                        </div>

                        <button
                          className="replyBtn"
                          type="submit"
                          // When Reply is clicked, triger sendComment function
                          onClick={sendComment}
                          disabled={!comment.trim()} >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
