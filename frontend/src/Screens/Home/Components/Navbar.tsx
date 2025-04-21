import React from "react";
import { TbAdjustmentsCog } from "react-icons/tb";
import { CgAdd, CgHomeAlt, CgHeadset } from "react-icons/cg";

interface SidebarIconProps {
  icon: React.ReactNode;
  text?: string;
  bgColor?: string;
  padding?: string;
  borderRadius?: string;
}

const defaultSize = 32;

const SidebarIcon = ({ icon, text = "tooltip" }: SidebarIconProps) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-text group-hover:scale-100">{text}</span>
  </div>
);

function Navbar() {
  return (
    <>
      <div className="fixed top-0 left-0 h-screen bg-gray-800 text-white flex flex-col items-center space-y-4 shadow-md pt-8 transition-all duration-300 w-[16.666%] md:w-[8.333%]">
        <SidebarIcon icon={<CgHomeAlt size={defaultSize} />} text="Home" />
        <SidebarIcon icon={<CgAdd size={defaultSize} />} text="Add" />
        <SidebarIcon
          icon={<TbAdjustmentsCog size={defaultSize} />}
          text="Config"
        />
        <SidebarIcon icon={<CgHeadset size={defaultSize} />} text="Support" />
      </div>
    </>
  );
}

export default Navbar;
