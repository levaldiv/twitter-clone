import { useRouter } from "next/router";

function SidebarLink({ Icon, text, active }) {
  const router = useRouter();
  
  return (
    <div className={`sidebarTextStyle hoverAnimation ${active && "font-bold"}`}>
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
}

export default SidebarLink;
