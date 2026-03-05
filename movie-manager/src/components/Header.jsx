import React from "react";
import Navbar from "./Navbar";

// header wrap for the navbar and background boarder
const Header = ({ sidebarView, onSidebarToggle, isGuest }) => {
  return (
    <header className="site-navbar bg-[#4b0e13] shadow-sm">
      <div className="max-w-full mx-auto w-full px-4">
        <Navbar
          sidebarView={sidebarView}
          onSidebarToggle={onSidebarToggle}
          isGuest={isGuest}
        />
      </div>
    </header>
  );
};

export default Header;