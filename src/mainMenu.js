import React from 'react';
import './style.css';

import titleImg from './assets/title3.png';
import animalsImg from './assets/animals.png';
import animals1Img from './assets/animals1.png';

const MainMenu = ({ setCurrentPage }) => {

  const handleContinueGame = () => {
    const savedGameState = localStorage.getItem('petGameState');
    if (savedGameState) {
      setCurrentPage('petScreen'); // This triggers loading of the saved game state in PetScreen
    } else {
      console.log("No saved game found.");
      // Do nothing if there's no saved game
    }
  };

  const handleNewGame = () => {
    localStorage.removeItem('petGameState'); // Clear the saved game state
    setCurrentPage('eggSelector'); // Start a new game
  };

  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <div >
        <div className="mb-8 flex justify-center w-full">
          <img className="w-[80vw] sm:w-auto h-auto" src={titleImg} alt="My Image" />
        </div>
        <div className="relative w-full flex justify-center items-center">
          <img
            id="petImg1"
            className="w-[24vw] sm:w-auto h-auto absolute left-[-10%] bottom-0 animate-bounce"
            src={animals1Img}
            alt="My Image"
          />
          <div className="flex flex-col items-center justify-center z-10">
            <button
              className="bg-[#e36588] hover:bg-[#cb958e] m-[1vh] text-medium sm:text-[1.5vw] w-[20vw] h-[8vh] cursor-pointer font-inherit whitespace-nowrap"
              onClick={() => setCurrentPage('eggSelector')}
            >
              Continue Game
            </button>
            <button
              className="bg-[#e36588] hover:bg-[#cb958e] m-[1vh] text-medium sm:text-[1.5vw] w-[20vw] h-[8vh] cursor-pointer font-inherit whitespace-nowrap"
              onClick={() => setCurrentPage('home')}
            >
              New Game
            </button>
          </div>
          <img
            id="petImg2"
            className="w-[24vw] sm:w-auto h-auto absolute right-[-10%] bottom-0 animate-bounce"
            src={animalsImg}
            alt="My Image"
          />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
