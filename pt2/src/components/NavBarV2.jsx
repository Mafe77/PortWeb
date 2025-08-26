import "../App.css";

function NavBarV2() {
  return (
    <nav className="mx-width flex flex-row justify-between fixed text-secondary">
      <div className="text-sm relative  pt-1">PORTFOLIO 2025</div>
      <div className="text-lg flex justify-between gap-12">
        <div className="hover:text-blue-500">PROJECTS</div>
        <div className="mx-20 hover:text-blue-500 px-10">ABOUT</div>
        <div className="hover:text-blue-500">CONTACT</div>
      </div>
      <div>RESUME</div>
    </nav>
  );
}

export default NavBarV2;
