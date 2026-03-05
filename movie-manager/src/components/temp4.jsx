import React from "react";
import Navbar from "./navbar";

// header wrap for the navbar and background boarder
const Header = ({ sidebarView, onSidebarToggle }) => {
  return (
    <header className="site-navbar bg-[#4b0e13] shadow-sm">
      <div className="max-w-full mx-auto w-full px-4">
        <Navbar
          sidebarView={sidebarView}
          onSidebarToggle={onSidebarToggle}
        />
      </div>
    </header>
  );
};

export default Header;