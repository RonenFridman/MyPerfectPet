import React from 'react';
import { usePetScreenLogic } from '../Logic/usePetGameLogic';
import {
  heartsFull, heartsHalf, heartsEmpty, clean, clean1, clean2,
  food, petInfo, medicine, light, dark, coin, egg1, egg2, egg3,
  egg4, egg5, egg6, pet1, pet2, pet3, medicine1, medicine2,
  food1, food2, food3, food4, play, play1, play2, save,
  boredicon, hungericon, dirtyicon, sickicon
} from '../icons';

const GameOverPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Game Over</h2>
        <p className="mb-4">Your pet's happiness has reached zero.</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

const PetScreen = ({ setCurrentPage }) => {
  const {
    additionalSquares,
    coinCount,
    happiness,
    age,
    hatched,
    hearts,
    eggImageSrc,
    petImageSrc,
    isCleaned,
    isPlayed,
    isFed,
    isGivenMedicine,
    showGameOver,
    handleGraySquareClick,
    handleCoinClick,
    handleSaveClick,
    handleGameOverClose,
    lastCleaned,
    lastFed,
    lastPlayed,
    lastMedicine
    // ... (other values and functions from usePetScreenLogic)
  } = usePetScreenLogic(setCurrentPage);

  return (
    <div id='background' className="relative flex flex-col items-center justify-center text-center w-[90vw] sm:w-[70vw] h-[80vh] sm:h-[90vh]">
      <div className="relative flex flex-col items-center justify-center bg-center bg-no-repeat bg-cover text-center w-[90vw] sm:w-[70vw] h-[80vh] sm:h-[90vh] bg-[url('/src/assets/lightbackground.png')] dark:bg-[url('/src/assets/darkbackground.png')]">
        {/* Indicator icons inside the background */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 flex flex-col items-center space-y-2 mr-4">
          {!isFed && <img src={hungericon} alt="Feed Indicator" className="w-12 h-12 sm:w-20 sm:h-20" />}
          {!isCleaned && <img src={dirtyicon} alt="Clean Indicator" className="w-12 h-12 sm:w-20 sm:h-20" />}
          {!isPlayed && <img src={boredicon} alt="Play Indicator" className="w-12 h-12 sm:w-20 sm:h-20" />}
          {!isGivenMedicine && <img src={sickicon} alt="Medicine Indicator" className="w-12 h-12 sm:w-20 sm:h-20" />}
        </div>

        {/* Game over popup */}
        {showGameOver && <GameOverPopup onClose={handleGameOverClose} />}
        
        <img id='saveButton' src={save} onClick={handleSaveClick} className="absolute left-2 bottom-2 w-16 h-16 sm:w-20 sm:h-20"/>
        <div id="statusBar" className="text-white fixed top-20 flex ml-[2vw] items-center">
          <div id="coinCounter" className=" flex mr-[3vw] items-center">
            <img className="w-[6vw] h-[4vh] sm:w-[2vw] sm:h-[3vh] mr-[2vw] sm:mr-[0.5vw]" src={coin} alt="Coin" onClick={handleCoinClick} />
            <span className="text-sm sm:text-base">{coinCount}</span>
          </div>
          <div id="happyBar" className="flex flex-row items-center text-sm sm:text-base">Happiness:
            {hearts.map((heart, index) => (
              <img key={index} className="happyImg w-4 h-4 sm:w-auto sm:h-auto" src={heart} alt={`Heart ${index + 1}`} />
            ))}
          </div>
        </div>
        {hatched === 0 ? (
          <img className="eggImg w-24 h-24 sm:w-[100px] sm:h-[100px] fixed bottom-[23vh] animate-eggShake" src={eggImageSrc} alt="Egg" />
        ) : (
          <img className="eggImg w-24 h-24 sm:w-[100px] sm:h-[100px] fixed bottom-[23vh] animate-jumpAndShake" src={petImageSrc} alt="Hatched Egg" />
        )}
        <div className="flex flex-row items-center justify-center mt-[30vh] h-0 w-[80vw] sm:w-[400px] ">
          <div className="flex flex-col justify-around  mx-[4vw] sm:mx-[8vw]">
            <div className="graySquare w-[15vw] h-[15vw] sm:w-[6vw] sm:h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('food')}>
              <img className="max-w-[90%] max-h-[90%] object-contain" src={food} alt="food" />
            </div>
            <div className="graySquare w-[15vw] h-[15vw] sm:w-[6vw] sm:h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('clean')}>
              <img className="max-w-[90%] max-h-[90%] object-contain" src={clean} alt="Clean 1" />
            </div>
            <div className="graySquare w-[15vw] h-[15vw] sm:w-[6vw] sm:h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('info')}>
              <img className="max-w-[90%] max-h-[90%] object-contain" src={petInfo} alt="petinfo" />
            </div>
          </div>
          <div className="flex flex-col justify-around mx-[4vw] sm:mx-[8vw]">
            <div className="graySquare w-[15vw] h-[15vw] sm:w-[6vw] sm:h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('play')}>
              <img className="max-w-[90%] max-h-[90%] object-contain" src={play} alt="play" />
            </div>
            <div className="graySquare w-[15vw] h-[15vw] sm:w-[6vw] sm:h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('medicine')}>
              <img className="max-w-[90%] max-h-[90%] object-contain" src={medicine} alt="medicine" />
            </div>
            <div className="graySquare w-[15vw] h-[15vw] sm:w-[6vw] sm:h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('light')}>
              <img id='lightButton' className="lightButton max-w-[90%] max-h-[90%] object-contain" src={light} alt="lightMode" />
            </div>
          </div>
        </div>

        <div className="fixed-container bottom-10 left-0 right-0 flex flex-wrap justify-center gap-4 p-4 mb-[44vh]">
          {additionalSquares.map(square => (
            <div key={square.id}>
              <div className="w-[15vw] h-[15vw] sm:w-[6vw] sm:h-[6vw] mb-3 flex flex-col items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 mx-[2vw] transition-opacity duration-500">
                <img src={coin} alt="Coin" className="mb-2 h-8 w-8" />
                <span className="text-xs sm:text-base text-white mb-1">{square.cost}</span>
                <span className="text-xs sm:text-sm text-white mb-1">happiness: +{square.added_happiness}</span>
              </div>
              <div
                className="w-[15vw] h-[15vw] sm:w-[6vw] sm:h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 mx-[2vw] transition-opacity duration-500"
                onClick={square.onClick}
              >
                <img
                  className="max-w-[90%] max-h-[90%] object-contain"
                  src={square.imgSrc}
                  alt={`Additional ${square.id}`}
                />
              </div>
            </div>
          ))} 
        </div>
        <div id='petInfo' className="fixed text-pretty text-white  bg-black/50 justify-center items-center p-2 hidden">
          <h2 className="text-sm sm:text-lg">Pet Information</h2>
          <p className="text-xs sm:text-base">Name: {localStorage.getItem('petName')}</p>
          <p className="text-xs sm:text-base">Age: {age}</p>
          <p className="text-xs sm:text-base">Last Cleaned: {lastCleaned.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p className="text-xs sm:text-base">Last Fed: {lastFed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p className="text-xs sm:text-base">Last Played: {lastPlayed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p className="text-xs sm:text-base">Last Medicine: {lastMedicine.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} </p>
        </div>
      </div>
    </div>
  );
  };
  
  export default PetScreen;