import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-purple-600 text-white py-2.5">
      <div className="logo">
        <span className="font-bold text-2xl  mx-8 text-black">i-Task</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer hover:font-bold hover:underline transition-all duration-200 text-black ">Home</li>
        <li className="cursor-pointer hover:font-bold hover:underline transition-all duration-200 text-black">Your Task</li>
      </ul>
    </nav>
  );
};

export default Navbar;
