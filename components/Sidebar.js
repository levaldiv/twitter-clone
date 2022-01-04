import Image from "next/image";
import { HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import SidebarLink from "./SidebarLink";

function Sidebar() {
  return (
    <div
      className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px]
    p-2 fixed h-full"
    >
      <div
        className="flex items-center justify-center w-14 h-14 
      hoverAnimation p-0 xl:ml-24"
      >
        <Image src="https://rb.gy/ogau5a" width={30} height={30} />
      </div>

      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>

      <button
        className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full
      w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]"
      >
        Tweet
      </button>

      <div
        className="text-[#d9d9d9] flex items-center justify-center hoverAnimation 
      xl:ml-auto xl:-mr-5 mt-auto"
      >
        <img
          src="https://media-exp1.licdn.com/dms/image/D5635AQEyNbzjaS9vpw/profile-framedphoto-shrink_100_100/0/1641261133658?e=1641427200&v=beta&t=Q2BizxXqz07bAzGiayk2wsdeRiOaXeHZRZ_EvCFHVQ8"
          alt=""
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />

        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">Valdivia</h4>
          <p className="text-[#6e767d]">@Valdivia</p>
        </div>

        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  );
}

export default Sidebar;
