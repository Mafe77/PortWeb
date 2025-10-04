import "../App.css";

const textAscii =
  " _____ _____ _____ _____ _____ _____ _____ ____  _____ _____ _____ __    _____ _____ _____ _____ \n|   __| __  |     |   | |_   _|   __|   | |    \\|   __|  |  |   __|  |  |     |  _  |   __| __  |\n|   __|    -|  |  | | | | | | |   __| | | |  |  |   __|  |  |   __|  |__|  |  |   __|   __|    -|\n|__|  |__|__|_____|_|___| |_| |_____|_|___|____/|_____|\\___/|_____|_____|_____|__|  |_____|__|__|";

export default function Header() {
  return (
    <pre
      className="text-art absolute glow-sub 
    left-1/2 transform -translate-x-1/2 
    w-[99%] 
    text-center leading-none overflow-hidden
    xl:text-[1.6rem]
    lg:text-[1.12rem]
    md:text-[0.82rem]
    sm:text-[0.3rem]
  "
    >
      {textAscii}
    </pre>
  );
}
