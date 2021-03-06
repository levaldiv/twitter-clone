import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
// const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

function Input() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  // vars to show emojis
  const [showEmojis, setShowEmojis] = useState(false);
  // references are pointers
  const filePickerRef = useRef(null);

  // this will send the posts/text/emojis to firebase
  const sendPost = async () => {
    // if loading is true ; return
    if (loading) return;
    // if loading isnt true and its false, set the loading immediately to true
    setLoading(true);

    /* inside firestore, i want to create a collection and add a document to a collection
     * called posts with the follwing items (eg. id, username ....) */
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    /* get the storage, provide the URL of how its going to store the image */
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      /* uploads a string to the objects location
       * Converted the selected file into a 'clean' URL (which firbase creates for us) */
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        // getting the created firebase url and storing it in downloadurl
        const downloadURL = await getDownloadURL(imageRef);
        // then it updates the document (which i created inside posts)
        await updateDoc(doc(db, "posts", docRef.id), {
          // then im updating the the document with the images download url
          image: downloadURL,
        });
      });
    }

    // happens AFTER the post has been made (resets everything to the original state)
    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
  };

  // accepts an event
  const addImageToPost = (e) => {
    // adding image to my poster
    const reader = new FileReader();
    // this is how you target files
    if (e.target.files[0]) {
      // use the reader and then read the data as data URL and send in the 'blob'
      reader.readAsDataURL(e.target.files[0]);
    }

    // accepts reader event
    reader.onload = (readerEvent) => {
      // get event and set selected file to the result of the that event
      setSelectedFile(readerEvent.target.result);
    };
  };

  // accepting an event
  const addEmoji = (e) => {
    // this combines the input feild with the emojis so they can be used togther
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  return (
    <div className={`scrollBar ${loading && "opacity-60"}`}>
      <img
        src={session.user.image}
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer" 
        /* onClick={signOut} */ />

      {/* divide-y: basically creates a line bw each of the child without adding it manually to each div */}
      <div className="divide-y divide-gray-700 w-full">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          
          <textarea
            value={input}
            // makes sure everytime i type something it changes the input
            onChange={(e) => setInput(e.target.value)}
            rows="2"
            placeholder="What's happening?"
            className="textArea" />

          {selectedFile && (
            <div className="relative">
              
              <div className="xIco"
                // when the X icon is clicked, it sets the file to null (in other words, removes the selected file)
                onClick={() => setSelectedFile(null)} >
                
                <XIcon className="text-white h-5" />
              </div>

              <img
                src={selectedFile}
                alt=""
                // object contain makes the file not stretched (object fit)
                className="rounded-2xl max-h-80 object-contain" />
            </div>
          )}
        </div>

        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              
              {/* This onClick selects the current file from filepickerref and want the event to occur here (on the img icon) */}
              <div className="icon"
                onClick={() => filePickerRef.current.click()} >
                
                <PhotographIcon className="h-[22px] text-[#1d9bf0]" />

                {/* Pointing the reference to this input field here */}
                <input
                  type="file"
                  // this functionality happens on the onlcick above
                  ref={filePickerRef}
                  hidden
                  onChange={addImageToPost} />
              </div>

              {/* creating the other icons */}
              <div className="icon rotate-90">
                <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              <div className="icon">
                <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              {/* Renders if showemojis is true (if the emoji icon is clicked) */}
              {showEmojis && (
                <Picker
                  onSelect={addEmoji}
                  style={{
                    position: "absolute",
                    marginTop: "465px",
                    marginLeft: -40,
                    maxWidth: "320px",
                    borderRadius: "20px",
                  }}
                  theme="dark"
                />
              )}
            </div>

            <button
              className="tweetBtn"
              /* if the btn is disabled, the disabled classes in global css kick in to change the
               * appearance of the bt
               * input.trim removes the leading & trailing spaces ensuring that the btn stays disabled
               * when only spaces are added */
              disabled={!input.trim() && !selectedFile}
              onClick={sendPost} >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
