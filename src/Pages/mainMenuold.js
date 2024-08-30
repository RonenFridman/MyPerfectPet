import React, { useState } from 'react';

import titleImg from '../assets/title3.png';
import animalsImg from '../assets/animals.png';
import animals1Img from '../assets/animals1.png';

const MainMenu = ({ setCurrentPage }) => {
  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility

  const handleContinueGame = () => {
    const savedGameState = localStorage.getItem('petGameState');
    if (savedGameState) {
      setCurrentPage('petScreen'); // This triggers loading of the saved game state in PetScreen
    } else {
      setShowPopup(true); // Show the popup if there's no saved game
    }
  };

  const handleNewGame = () => {
    localStorage.removeItem('petGameState'); // Clear the saved game state
    setCurrentPage('eggSelector'); // Start a new game
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div className="flex justify-center items-center flex-col  w-full h-full fixed">
      <div >
        <div className="relative flex justify-center w-full">
          <img className="w-[40vw]  h-[70vh]" src={titleImg} alt="My Image" />
        </div>
        <div className="relative w-full flex justify-center items-center">
          <img
            id="petImg1"
            className="w-[24vw] sm:w-auto h-auto absolute left-[-10%] bottom-0 animate-bounce"
            src={animals1Img}
            alt="My Image"
          />
          <div className="flex flex-col items-center justify-center ">
            <button
              className="bg-[#e36588] hover:bg-[#cb958e] dark:bg-[#BE234F] dark:hover:bg-[#A8584D] m-[1vh] text-medium sm:text-[1.5vw] w-[20vw] h-[8vh] cursor-pointer font-inherit whitespace-nowrap "
              onClick={handleContinueGame}
            >
              Continue Game
            </button>
            <button
              className="bg-[#e36588] hover:bg-[#cb958e] dark:bg-[#BE234F] dark:hover:bg-[#A8584D] m-[1vh] text-medium sm:text-[1.5vw] w-[20vw] h-[8vh] cursor-pointer font-inherit whitespace-nowrap"
              onClick={handleNewGame}
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

      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <h2 className="text-2xl mb-4">No Saved Game Found</h2>
            <button
              className="bg-[#e36588] hover:bg-[#cb958e] text-white font-bold py-2 px-4 rounded"
              onClick={closePopup}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
