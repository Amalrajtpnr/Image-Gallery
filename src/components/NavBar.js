import React from "react";

function NavBar() {
  return (
    <div className="w-[95%] min-h-[20%] flex flex-row items-center justify-center mb-5  ">
      <img
        src="/1.webp"
        className="w-[4%] xl2000:w-[2%]  lg:w-[4%] h-[20%] lg1250::w-[5%]   sm600:w-[5%] sm400:w-[8%]  sm300:w-[10%] flex flex-row items-center justify-center"
        alt=""
      />
      <h1 className="text-[35px] sm600:text-[30px] w-[90%]  font-bold flex flex-row items-center justify-center">
        Image Gallery
      </h1>
    </div>
  );
}

export default NavBar;
