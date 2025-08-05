import { useState } from "react";
import { TbCameraSelfie } from "react-icons/tb";
import { FaRegCircle } from "react-icons/fa6";
import { VscMultipleWindows } from "react-icons/vsc";
import { IoMdContact } from "react-icons/io";
import { FaKeyboard } from "react-icons/fa";

export default function NavBar({ activeTab, setActiveTab }) {
  const activeStyle = "rounded-t-xl bg-primary border-none";

  const navItems = [
    { label: "Portfolio - HOME", key: "home", icon: <TbCameraSelfie /> },
    { label: "Projects - Keys", key: "keys", icon: <FaKeyboard /> },
    { label: "Projects - Go", key: "go", icon: <FaRegCircle /> },
    { label: "Projects - Others", key: "others", icon: <VscMultipleWindows /> },
    { label: "About - Contact", key: "contact", icon: <IoMdContact /> },
  ];

  return (
    <nav className="bg-secondary w-screen absolute top-0 left-0 z-[100] py-1 text-black">
      <div className="relative float-start flex flex-row top-1 flex-nowrap">
        {navItems.map((item, index) => (
          <div
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`md:text-lg ml-4 p-2 px-6 font-medium cursor-pointer flex flex-row hover:bg-[#f0f6fc]${
              activeTab === item.key ? activeStyle : ""
            } ${index !== 0 ? "border-l-2" : ""}`}
          >
            <span className="relative top-1 pr-2">{item.icon}</span>
            {item.label}
            {activeTab === item.key && (
              <span className="relative left-4">✕</span>
            )}
          </div>
        ))}
      </div>
      <div className="float-end flex flex-row pl-10">
        <div className="text-2xl mx-10">⚊</div>
        <div className="text-2xl mr-10">❒</div>
        <div className="text-2xl mr-10">✕</div>
      </div>
    </nav>
  );
}
