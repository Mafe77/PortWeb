import { Component } from "react";

export class NavBar extends Component {
  render() {
    return (
      <nav className="bg-[#f5f5f5] flex justify-center">
        <div className="flex flex-wrap items-center justify-between">
          <div
            className="items-center justify-between w-full text-2xl"
            id="navbar-cta"
          >
            <ul className="flex flex-row font-medium p-4">
              <li>
                <a href="#" className=" px-10" aria-current="page">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className=" px-10 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 "
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className=" px-10  text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 "
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className=" px-10  text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 "
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
