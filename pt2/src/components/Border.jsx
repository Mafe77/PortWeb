export default function FancyBorder() {
  return (
    <div className="">
      {/* Top border */}
      <div className="absolute top-14 left-12 right-14 border-t-3 border-black">
        <div className="text-9xl font-bold ">FRONTEND</div>
      </div>
      {/* Top right vertical */}
      <div className="fixed top-14 right-12 h-16 border-r-3 border-black"></div>

      {/* Right border */}
      <div className="fixed top-42 right-12 border-r-3 h-96 border-black"></div>
      {/* Diamond in top right */}
      <div className="fixed top-34 right-10 w-4 h-4 bg-black rotate-45"></div>

      {/* Bottom border */}
      {/* <div className="absolute bottom-18 left-12 w-96 border-b-3 border-black"></div> */}
      <div className="text-9xl font-bold absolute bottom-18 right-14">
        DEVELOPER
      </div>
      {/* Bottom left vertical */}
      <div className="absolute bottom-18 left-12 h-16 border-l-3 border-black">
        <div className="flex flex-col text-2xl relative -top-19 -left-2">
          <span>MARIA</span> TALHAFERRO
        </div>
        <div className="relative -bottom-3 -left-1 flex flex-row">
          <div className="h-6 w-6 mr-2 rounded-sm bg-white"></div>
          <div className="h-6 w-6 mr-2 rounded-sm bg-primary"></div>
          <div className="h-6 w-6 mr-2 rounded-sm bg-secondary"></div>
          <div className="h-6 w-6 mr-2 rounded-sm bg-tertuary"></div>
          <div className="h-6 w-6 mr-2 rounded-sm bg-black"></div>
        </div>
      </div>

      {/* Left border */}
      <div className="absolute bottom-54 left-12 h-96 border-l-3 border-black z-0"></div>
    </div>
  );
}
