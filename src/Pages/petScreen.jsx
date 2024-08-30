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
  // ... (GameOverPopup component implementation)
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
    <div id='background' className="relative flex flex-col items-center justify-center bg-center bg-no-repeat bg-contain text-center w-[70vw] h-[90vh] bg-[url('/src/assets/lightbackground.png')] dark:bg-[url('/src/assets/darkbackground.png')] ">
      <div className="relative flex flex-col items-center justify-center bg-center bg-no-repeat bg-contain text-center w-[70vw] h-[90vh] bg-[url('/src/assets/lightbackground.png')] dark:bg-[url('/src/assets/darkbackground.png')]">
        {/* Indicator icons inside the background */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 flex flex-col items-center space-y-2 mr-4">
          {!isFed && <img src={hungericon} alt="Feed Indicator" style={{ width: '4rem', height: '4rem' }} />}
          {!isCleaned && <img src={dirtyicon} alt="Clean Indicator" style={{ width: '4rem', height: '4rem' }} />}
          {!isPlayed && <img src={boredicon} alt="Play Indicator" style={{ width: '4rem', height: '4rem' }} />}
          {!isGivenMedicine && <img src={sickicon} alt="Medicine Indicator" style={{ width: '4rem', height: '4rem' }} />}
        </div>

        {/* Game over popup */}
        {showGameOver && <GameOverPopup onClose={handleGameOverClose} />}
        
        <img id='saveButton' src={save} onClick={handleSaveClick} className="absolute saveButton left-0 bottom-0 w-20 h-20"/>
        <div id="statusBar" className="h-[220px] flex ml-[1vw] items-center">
          <div id="coinCounter" className="flex mr-[3vw]">
            <img className="w-[2vw] h-[3vh] mr-[0.5vw]" src={coin} alt="Coin" onClick={handleCoinClick} />
            <span>{coinCount}</span>
          </div>
          <div id="happyBar" className="flex flex-row items-center">Happiness:
            {hearts.map((heart, index) => (
              <img key={index} className="happyImg w-auto h-auto" src={heart} alt={`Heart ${index + 1}`} />
            ))}
          </div>
        </div>
        {hatched === 0 ? (
          <img className="eggImg w-[100px] h-[100px] fixed bottom-17" src={eggImageSrc} alt="Egg" />
        ) : (
          <img className="eggImg w-[100px] h-[100px] fixed bottom-17" src={pet1} alt="Hatched Egg" />
        )}
        <div className="flex flex-row items-center justify-center" style={{ width: '400px', height: '77vh' }}>
          <div className="flex-row justify-around mx-[8vw]">
            <div className="graySquare w-[6vw] h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('food')}>
              <img className="max-w-[90%] max-h-[90%] object-contain" src={food} alt="food" />
            </div>
            <div className="graySquare w-[6vw] h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('clean')}>
              <img className="max-w-[90%] max-h-[90%] object-contain" src={clean} alt="Clean 1" />
            </div>
            <div className="graySquare w-[6vw] h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('info')}>
              <img className="max-w-[90%] max-h-[90%] object-contain" src={petInfo} alt="petinfo" />
            </div>
          </div>
          <div className="flex-row justify-around mx-[8vw]">
            <div className="graySquare w-[6vw] h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('play')}>
              <img className="max-w-[90%] max-h-[90%] object-contain" src={play} alt="play" />
            </div>
            <div className="graySquare w-[6vw] h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('medicine')}>
              <img className="max-w-[90%] max-h-[90%] object-contain" src={medicine} alt="medicine" />
            </div>
            <div className="graySquare w-[6vw] h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('light')}>
              <img className="max-w-[90%] max-h-[90%] object-contain" src={light} alt="lightMode" />
            </div>
          </div>
        </div>

        <div className="fixed-container bottom-0vh left-0 right-0 flex flex-wrap justify-center gap-4 p-4">
          {additionalSquares.map(square => (
            <div key={square.id}>
              <div className="w-[6vw] h-[6vw] mb-3 flex flex-col items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 mx-[2vw] transition-opacity duration-500">
                <img src={coin} alt="Coin" className="mb-2 h-8 w-8" />
                <span className="text-base text-white mb-1">{square.cost}</span>
                <span className="text-sm text-white mb-1">happiness: +{square.added_happiness}</span>
              </div>
              <div
                className="w-[6vw] h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 mx-[2vw] transition-opacity duration-500"
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
        <div id='petInfo' className="fixed bg-black/50 justify-center items-center p-10 hidden">
          <h2>Pet Information</h2>
          <p>Name: lily</p>
          <p>Age: {age}</p>
          <p>Last Cleaned: {lastCleaned.toLocaleDateString()}</p>
          <p>Last Fed: {lastFed.toLocaleDateString()}</p>
          <p>Last Played: {lastPlayed.toLocaleDateString()}</p>
          <p>Last Medicine: {lastMedicine.toLocaleDateString()} </p>
        </div>
      </div>
    </div>
  );
};

export default PetScreen;