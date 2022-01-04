function SidebarLink({ Icon, text, active }) {
  return (
    <div className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start`}>
      <Icon className="h-7" />
      <span>{text}</span>
    </div>
  );
}

export default SidebarLink;
