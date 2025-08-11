import { useState } from "react";
import { TbCameraSelfie } from "react-icons/tb";
import { FaRegCircle } from "react-icons/fa6";
import { VscMultipleWindows } from "react-icons/vsc";
import { IoMdContact } from "react-icons/io";
import { FaKeyboard, FaSignal } from "react-icons/fa";
import { IoVolumeHigh } from "react-icons/io5";
import { ImWindows } from "react-icons/im";

export default function NavBar({ activeTab, setActiveTab }) {
  const activeStyle = " bg-[#094496] border-none text-white";

  const navItems = [
    { label: "Portfolio - HOME", key: "home", icon: <TbCameraSelfie /> },
    { label: "Projects - Keys", key: "keys", icon: <FaKeyboard /> },
    { label: "Projects - Go", key: "go", icon: <FaRegCircle /> },
    { label: "Projects - Others", key: "others", icon: <VscMultipleWindows /> },
    { label: "About - Contact", key: "contact", icon: <IoMdContact /> },
  ];

  return (
    <nav className="bg-tertuary w-screen absolute top-0 left-0 py-1 font-display navBar flex justify-between border-r-8">
      <div className="absolute float-start text-4xl rounded-r-4xl border-y-2 border-r-2 py-3 pl-1 left-0 pr-4 top-0 flex flex-row italic bg-amber-300">
        <ImWindows className="mr-2 top-0.5 relative" />
        start
      </div>
      <div className="relative left-34 flex flex-row top-1 flex-nowrap">
        {navItems.map((item, index) => (
          <div
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`md:text-lg ml-1 p-3 mb-1 px-6 font-medium border-1 rounded-sm cursor-pointer flex flex-row hover:bg-[#cad1d9]
              ${activeTab === item.key ? activeStyle : ""} 
            }`}
          >
            <span
              className={`relative top-1 pr-2 ${
                !activeTab ? "text-white" : ""
              }`}
            >
              {item.icon}
            </span>
            <span className="">{item.label} </span>
          </div>
        ))}
      </div>
    </nav>
  );
}
