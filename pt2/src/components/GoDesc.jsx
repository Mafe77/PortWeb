import React from "react";

function GoDesc() {
  return (
    <div className="absolute col-span-3 col-start-3 row-start-1 border-secondary border-6 h-[400px] w-[600px] top-10 tab rounded-md font-display text-white overflow-hidden flex flex-col">
      <div className="flex flex-row bg-secondary w-full p-2 justify-between z-10">
        <div className="relative text-2xl font-bold bottom-1">⁘</div>
        <span className=" text-xl">GoDesc.exe</span>
        <div className="text-2xl font-bold bottom-1 relative">⁘</div>
      </div>
      <div className="bg-white h-full">Image Here</div>
    </div>
  );
}

export default GoDesc;
