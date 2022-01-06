import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useRef, useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function Input() {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  // vars to show emojis
  const [showEmojis, setShowEmojis] = useState(false);
  // references are pointers
  const filePickerRef = useRef(null);

  const addImageToPost = () => {};

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
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll`}
    >
      <img
        src="https://media-exp1.licdn.com/dms/image/D5635AQEyNbzjaS9vpw/profile-framedphoto-shrink_100_100/0/1641261133658?e=1641427200&v=beta&t=Q2BizxXqz07bAzGiayk2wsdeRiOaXeHZRZ_EvCFHVQ8"
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
      />

      {/* divide-y: basically creates a line bw each of the child without adding it manually to each div */}
      <div className="w-full divide-y divide-gray-700">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            // makes sure everytime i type something it changes the input
            onChange={(e) => setInput(e.target.value)}
            rows="2"
            placeholder="What's happening?"
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500
            tracking-wide w-full min-h-[50px]"
          />

          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center
              justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="text-white h-5" />
              </div>

              <img
                src={selectedFile}
                alt=""
                // object contain makes the file not stretched (object fit)
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            {/* This onClick selects the current file from filepickerref and want the event to occur here (on the img icon) */}
            <div className="icon" onClick={() => filePickerRef.current.click()}>
              <PhotographIcon className="h-[22px] text-[#1d9bf0]" />

              {/* Pointing the reference to this input field here */}
              <input
                type="file"
                hidden
                onChange={addImageToPost}
                // this functionality happens on the onlcick above
                ref={filePickerRef}
              />
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
            className="tweet"
            /* if the btn is disabled, the disabled classes in global css kick in to change the
             * appearance of the bt
             * input.trim removes the leading & trailing spaces ensuring that the btn stays disabled
             * when only spaces are added */
            disabled={!input.trim() && !selectedFile}
            // onClick={sendPost}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Input;
