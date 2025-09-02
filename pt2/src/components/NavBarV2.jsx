import "../App.css";
import { PiBatteryFullDuotone } from "react-icons/pi";

function NavBarV2() {
  const active = "text-primary bg-secondary";
  return (
    <nav className="mx-width flex flex-row justify-between text-secondary glow-sub ">
      <div className="text-sm relative -top-2">[-- PORTFOLIO 2025 ]</div>
      <div className="text-lg flex justify-between gap-10 relative -top-2 glow right-9">
        <a href="#home" className="hover:text-primary hover:bg-secondary px-2">
          HOME
        </a>
        <a
          href="#projects"
          className="mx-22 hover:text-primary hover:bg-secondary px-2"
        >
          PROJECTS
        </a>
        <a
          href="#contact"
          className="hover:text-primary hover:bg-secondary px-2"
        >
          CONTACT
        </a>
      </div>
      <div className="text-4xl relative top-1 p-0 m-0">
        <PiBatteryFullDuotone />
      </div>
    </nav>
  );
}

export default NavBarV2;
