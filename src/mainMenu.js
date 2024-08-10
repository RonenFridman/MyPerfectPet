import React from 'react';
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
    <div>
      <div>
        <img className="mainTitle" src={titleImg} alt="My Image" />
      </div>
      <img id="petImg2" src={animalsImg} alt="My Image" />
      <img id="petImg1" src={animals1Img} alt="My Image" />
      <div className="menuButtons">
        <button onClick={handleContinueGame}>Continue Game</button>
        <br />
        <button onClick={handleNewGame}>New Game</button>
      </div>
    </div>
  );
};

export default MainMenu;
