import React from "react";

function NavBarV2() {
  return (
    <nav className="navBar w-screen top-0 left-0 py-2 font-display flex justify-between px-10">
      <div className="text-sm relative  pt-1">PORTFOLIO 2025</div>
      <div className="text-lg flex pr-10">
        <div className="hover:text-blue-500">PROJECTS</div>
        <div className="mx-20 hover:text-blue-500">ABOUT</div>
        <div className="hover:text-blue-500">CONTACT</div>
      </div>
    </nav>
  );
}

export default NavBarV2;
