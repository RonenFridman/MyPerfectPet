import React from 'react';
import { logo , light , dark } from './icons';
import useDarkMode from './Logic/useDarkMode';



const Header = ({ setCurrentPage }) => {
    
  const { handleLightClick } = useDarkMode();
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center z-50">
      <div className="flex items-center fixed top-4 left-4">
        <img
          src={logo}
          alt="Logo"
          className="w-[5vw] cursor-pointer transform transition-transform duration-200 hover:scale-110 "
          onClick={() => setCurrentPage('mainMenu')}
        />
      </div>
    <div className="fixed top-4 right-4">
      <img
        src={light}// Replace with the actual path to your image
        alt="Dark Mode"
        className="lightButton w-[4vw] cursor-pointer transform transition-transform duration-200 hover:scale-110"
        onClick={handleLightClick}
      />
    </div>
    </header>
  );
};

export default Header;