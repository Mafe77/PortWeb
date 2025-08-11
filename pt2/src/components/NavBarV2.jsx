import React from "react";

function NavBarV2() {
  return (
    <nav className="bg-primary w-screen absolute top-0 left-0 py-1 font-display navBar flex justify-center pt-4">
      <div className="text-2xl">HOME</div>
      <div className="text-2xl mx-32 font-medium">PROJECTS</div>
      <div className="text-2xl font-medium">ABOUT</div>
    </nav>
  );
}

export default NavBarV2;
