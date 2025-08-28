import "../App.css";
import { PiBatteryFullDuotone } from "react-icons/pi";

function NavBarV2() {
  return (
    <nav className="mx-width flex flex-row justify-between fixed text-secondary glow-sub">
      <div className="text-sm relative -top-2">PORTFOLIO 2025</div>
      <div className="text-lg flex justify-between gap-12 relative -top-2 glow">
        <div className="hover:text-blue-500">PROJECTS</div>
        <div className="mx-20 hover:text-blue-500 px-10">ABOUT</div>
        <div className="hover:text-blue-500">CONTACT</div>
      </div>
      <div className="text-4xl relative top-1 p-0 m-0">
        <PiBatteryFullDuotone />
      </div>
    </nav>
  );
}

export default NavBarV2;
