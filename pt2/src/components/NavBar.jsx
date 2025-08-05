import { useState } from "react";

export default function NavBar({ activeTab, setActiveTab }) {
  const activeStyle = "rounded-t-xl bg-[#b1b1b1] border-none";

  const navItems = [
    { label: "Portfolio - HOME", key: "home" },
    { label: "Projects - Keys", key: "keys" },
    { label: "Projects - Go", key: "go" },
    { label: "Projects - Others", key: "others" },
    { label: "About - Contact", key: "contact" },
  ];

  return (
    <nav className="bg-[#dfdfdf] w-screen absolute top-0 left-0 z-[100] py-1">
      <div className="relative float-start flex flex-row top-1">
        {navItems.map((item, index) => (
          <div
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`text-xl ml-2 p-2 px-6 font-bold cursor-pointer ${
              activeTab === item.key ? activeStyle : ""
            } ${index !== 0 ? "border-l-2" : ""}`}
          >
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
