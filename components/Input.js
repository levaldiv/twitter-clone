import { XIcon } from "@heroicons/react/outline";
import { useState } from "react";

function Input() {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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
        <div>
          <textarea
            value={input}
            // makes sure everytime i type something it changes the input
            onChange={(e) => setInput(e.target.value)}
            rows="2"
            placeholder="What's happening?"
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500
            tracking-wide w-full min-h-[50px]"
          />

          <div className="relative">
            <div
              className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center
              justify-center top-1 left-1 cursor-pointer"
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
        </div>
      </div>
    </div>
  );
}

export default Input;
