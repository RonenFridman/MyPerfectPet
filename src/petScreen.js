import React, { useEffect, useState, useCallback } from 'react';
import heartsFull from './assets/heartsFull.png';
import heartsHalf from './assets/heartsHalf.png';
import heartsEmpty from './assets/heartsEmpty.png';
import clean from './assets/clean2.png';
import clean1 from './assets/clean1.png';
import clean2 from './assets/clean.png';
import food from './assets/food.png';
import petInfo from './assets/petInfo.png';
import medicine from './assets/medicine.png';
import light from './assets/lightMode.png';
import dark from './assets/darkMode.png';
import coin from './assets/coin.png';
import egg from './assets/egg1.png';
import medicine1 from './assets/syringe.png';
import medicine2 from './assets/medicine2.png';
import food1 from './assets/food1.png';
import food2 from './assets/food2.png';
import food3 from './assets/food3.png';
import food4 from './assets/food4.png';
import play from './assets/play.png';
import play1 from './assets/play1.png';
import play2 from './assets/play2.png';
import save from './assets/save.png';

// New icons for the indicators
import boredicon from './assets/boredicon.png';
import hungericon from './assets/hungericon.png';
import dirtyicon from './assets/dirtyicon.png';
import sickicon from './assets/sickicon.png';

// Component to display the "Game Over" popup
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
  // State declarations for various game properties
  const [additionalSquares, setAdditionalSquares] = useState([]); 
  const [coinCount, setCoinCount] = useState(0); 
  const [happiness, setHappiness] = useState(100); 
  const [age, setAge] = useState(0); 
  const [hatched, setHatched] = useState(0); 
  const [lastCleaned, setLastCleaned] = useState(new Date()); 
  const [lastPlayed, setLastPlayed] = useState(new Date()); 
  const [lastFed, setLastFed] = useState(new Date()); 
  const [lastMedicine, setLastMedicine] = useState(new Date()); 
  const [hearts, setHearts] = useState([heartsFull, heartsFull, heartsFull, heartsFull, heartsFull]); 

  const [isCleaned, setIsCleaned] = useState(true); 
  const [isPlayed, setIsPlayed] = useState(true); 
  const [isFed, setIsFed] = useState(true); 
  const [isGivenMedicine, setIsGivenMedicine] = useState(true); 

  // New state to control the visibility of the Game Over popup
  const [showGameOver, setShowGameOver] = useState(false); 

  // Function to calculate and set the hearts array based on happiness level
  const calculateHearts = useCallback((happiness) => {
    const heartsArray = [];

    for (let i = 0; i < 5; i++) {
        const heartHappiness = happiness - i * 20;
        if (heartHappiness >= 20) {
            heartsArray.push(heartsFull);
        } else if (heartHappiness >= 10) {
            heartsArray.push(heartsHalf);
        } else {
            heartsArray.push(heartsEmpty);
        }
    }

    setHearts(heartsArray);
  }, []);

  // Function to load the saved game state from localStorage
  const loadGame = useCallback(() => {
    const savedGameState = localStorage.getItem('petGameState');
    if (savedGameState) {
      const gameState = JSON.parse(savedGameState);
      setCoinCount(gameState.coinCount || 0);
      setHappiness(gameState.happiness || 100);
      setAge(gameState.age || 0);
      setHatched(gameState.hatched || 0);
      setLastCleaned(new Date(gameState.lastCleaned) || new Date());
      setLastPlayed(new Date(gameState.lastPlayed) || new Date());
      setLastFed(new Date(gameState.lastFed) || new Date());
      setLastMedicine(new Date(gameState.lastMedicine) || new Date());
      calculateHearts(gameState.happiness || 100); 
      console.log('Game loaded:', gameState);
    }
  }, [calculateHearts]);

  // Load the game when the component is first rendered
  useEffect(() => {
    loadGame();
  }, [loadGame]);

  // Function to save the game state to localStorage
  const saveGame = useCallback(() => {
    const gameState = {
      coinCount,
      happiness,
      age,
      hatched,
      lastCleaned: lastCleaned.toISOString(),
      lastPlayed: lastPlayed.toISOString(),
      lastFed: lastFed.toISOString(),
      lastMedicine: lastMedicine.toISOString(),
    };
    localStorage.setItem('petGameState', JSON.stringify(gameState));
    console.log('Game saved:', gameState);
  }, [coinCount, happiness, age, hatched, lastCleaned, lastPlayed, lastFed, lastMedicine]);

  // Function to add coins based on a timer, with more coins if happiness is above 50
  const addCoinByTimer = useCallback(() => {
    setCoinCount(prevCount => prevCount + (happiness > 50 ? 15 : 10));
  }, [happiness]);

  // Function to subtract coins based on activity cost
  const subCoinByActivity = useCallback((actionValue) => {
    setCoinCount(prevCount => {
      if (prevCount - actionValue >= 0) {
        return prevCount - actionValue;
      } else {
        console.log(`Not Enough Coins: ${prevCount}`);
        return prevCount;
      }
    });
  }, []);

  // Function to check happiness and handle game over scenario
  const checkHappiness = useCallback((newHappiness) => {
    if (newHappiness <= 0) {
      console.log(`GAME OVER`);
      setShowGameOver(true); // Show the game over popup
    } else {
      console.log(`Happiness is now: ${newHappiness}`);
    }
  }, []);

  // Function to check various pet parameters and reduce happiness accordingly
  const checkParam = useCallback(() => {
    const currentTime = new Date(); 
    let newHappiness = happiness; 

    console.log('Current Happiness:', happiness);

    if ((currentTime - lastCleaned) / 60000 >= 5) { // Reduce happiness if not cleaned in last 5 minutes
        console.log('Reducing happiness due to no cleaning');
        newHappiness -= 4;
        setIsCleaned(false);
    }
    if ((currentTime - lastPlayed) / 6000 >= 0.6) {  // Reduce happiness if not played in last minute
        console.log('Reducing happiness due to no play');
        newHappiness -= 50;
        setIsPlayed(false);
    }
    if ((currentTime - lastFed) / 60000 >= 5) {  // Reduce happiness if not fed in last 5 minutes
        console.log('Reducing happiness due to no feeding');
        newHappiness -= 3;
        setIsFed(false);
    }
    if ((currentTime - lastMedicine) / 60000 >= 10) { // Reduce happiness if not given medicine in last 10 minutes
        console.log('Reducing happiness due to no medicine');
        newHappiness -= 8;
        setIsGivenMedicine(false);
    }

    setHappiness(newHappiness); 
    calculateHearts(newHappiness); 
    checkHappiness(newHappiness);
  }, [happiness, lastCleaned, lastPlayed, lastFed, lastMedicine, checkHappiness, calculateHearts]);

  // Function to increment the pet's age
  const incrementAge = useCallback(() => {
    setAge(prevAge => {
      const newAge = prevAge + 1; 
      if (newAge >= 120) {
        console.log('Your pet has died of old age.');
      } else if (newAge === 18) {
        setHatched(1); 
        console.log('Your egg has hatched!');
      } else {
        console.log(`Pet age is now: ${newAge}`);
      }
      return newAge;
    });
  }, []);

  // Function to add happiness and adjust hearts based on new happiness level
  const addHappiness = useCallback((val) => {
    setHappiness(prevHappiness => {
      let newHappiness = prevHappiness + val;
      if (newHappiness > 100) {
        newHappiness = 100; 
      }
      calculateHearts(newHappiness); 
      return newHappiness;
    });
  }, [calculateHearts]);

  // Handlers for different activities (cleaning, feeding, playing, giving medicine)
  const handleClickCleanBetter = useCallback(() => {
    console.log('Cleaning pet...');
    subCoinByActivity(2); 
    setLastCleaned(new Date());  
    addHappiness(4); 
    setIsCleaned(true);
  }, [subCoinByActivity, addHappiness]);
  
  const handleClickCleanWorst = useCallback(() => {
    console.log('Cleaning pet...');
    subCoinByActivity(4); 
    setLastCleaned(new Date());  
    addHappiness(8); 
    setIsCleaned(true);
  }, [subCoinByActivity, addHappiness]);
  
  const handleClickFoodBetter = useCallback(() => {
    console.log('Feeding pet...');
    subCoinByActivity(4); 
    setLastFed(new Date());  
    addHappiness(8); 
    setIsFed(true);
  }, [subCoinByActivity, addHappiness]);
  
  const handleClickFoodWorst = useCallback(() => {
    console.log('Feeding pet...');
    subCoinByActivity(3); 
    setLastFed(new Date());  
    addHappiness(6); 
    setIsFed(true);
  }, [subCoinByActivity, addHappiness]);
  
  const handleClickPlayBetter = useCallback(() => {
    console.log('Playing with pet...');
    subCoinByActivity(4); 
    setLastPlayed(new Date());  
    addHappiness(10); 
    setIsPlayed(true);
  }, [subCoinByActivity, addHappiness]);
  
  const handleClickPlayWorst = useCallback(() => {
    console.log('Playing with pet...');
    subCoinByActivity(2); 
    setLastPlayed(new Date());  
    addHappiness(5); 
    setIsPlayed(true);
  }, [subCoinByActivity, addHappiness]);
  
  const handleClickMedicineBetter = useCallback(() => {
    console.log('Giving pet medicine...');
    subCoinByActivity(4); 
    setLastMedicine(new Date());  
    addHappiness(8); 
    setIsGivenMedicine(true);
  }, [subCoinByActivity, addHappiness]);
  
  const handleClickMedicineWorst = useCallback(() => {
    console.log('Giving pet medicine...');
    subCoinByActivity(3); 
    setLastMedicine(new Date());  
    addHappiness(6); 
    setIsGivenMedicine(true);
  }, [subCoinByActivity, addHappiness]);

  // Function to handle clicks on the gray squares to show additional options
  const handleGraySquareClick = useCallback((buttonType) => {
    if (buttonType === 'clean') {
      setAdditionalSquares(prevSquares => [
        ...prevSquares,
        { id: prevSquares.length + 1, imgSrc: clean1, onClick: handleClickCleanBetter },
        { id: prevSquares.length + 2, imgSrc: clean2, onClick: handleClickCleanWorst }
      ]);
    } else if (buttonType === 'food') {
      setAdditionalSquares(prevSquares => [
        ...prevSquares,
        { id: prevSquares.length + 1, imgSrc: food1, onClick: handleClickFoodBetter },
        { id: prevSquares.length + 2, imgSrc: food2, onClick: handleClickFoodWorst },
        { id: prevSquares.length + 3, imgSrc: food3, onClick: handleClickFoodWorst },
        { id: prevSquares.length + 4, imgSrc: food4, onClick: handleClickFoodWorst }
      ]);
    } else if (buttonType === 'play') {
      setAdditionalSquares(prevSquares => [
        ...prevSquares,
        { id: prevSquares.length + 1, imgSrc: play1, onClick: handleClickPlayBetter },
        { id: prevSquares.length + 2, imgSrc: play2, onClick: handleClickPlayWorst }
      ]);
    } else if (buttonType === 'medicine') {
      setAdditionalSquares(prevSquares => [
        ...prevSquares,
        { id: prevSquares.length + 1, imgSrc: medicine1, onClick: handleClickMedicineBetter },
        { id: prevSquares.length + 2, imgSrc: medicine2, onClick: handleClickMedicineWorst }
      ]);
    } else if (buttonType === 'light') {
      setAdditionalSquares(prevSquares => [
      ...prevSquares,
      { id: prevSquares.length + 1, imgSrc: light, onClick: handleAdditionalSquareClick },
      { id: prevSquares.length + 2, imgSrc: dark, onClick: handleAdditionalSquareClick } 
    ]);
    }else if (buttonType === 'info') {
      setTimeout(() => {
        document.getElementById('petInfo').classList.remove('hidden');
      }, 500);
    }
  }, [handleClickCleanBetter, handleClickCleanWorst, handleClickFoodBetter, handleClickFoodWorst, 
    handleClickPlayBetter, handleClickPlayWorst, handleClickMedicineBetter, handleClickMedicineWorst]);
  
  // Function to handle clicks on additional squares to remove them
  const handleAdditionalSquareClick = useCallback(() => {
    setAdditionalSquares([]);
  }, []);

  // Function to handle clicking on the coin icon to add a coin
  const handleCoinClick = useCallback(() => {
    setCoinCount(prevCount => prevCount + 1);
  }, []);

  // Function to handle clicking the save button
  const handleSaveClick = () => {
    saveGame(); 
    const saveButton = document.getElementById('saveButton');
    saveButton.classList.add('animate-shake');

    setTimeout(() => {
      saveButton.classList.remove('animate-shake');
    }, 1000);
    console.log('Game saved!'); 
  };

  // Effect to handle clicks on the document and adjust UI accordingly
  useEffect(() => {
    const handleDocumentClick = (event) => {
      const graySquares = document.querySelectorAll('.graySquare');
      if (event.target.classList.contains('graySquare') || event.target.closest('.graySquare')) {
        graySquares.forEach(square => {
          square.classList.add('opacity-0');
          square.classList.add('invisible');
          square.classList.add('disabled');
        });
      } else {
        graySquares.forEach(square => {
          square.classList.remove('opacity-0');
          square.classList.remove('invisible');
          square.classList.remove('disabled');
        });
        setAdditionalSquares([]); 
      }
      const petInfoElement = document.getElementById('petInfo');
      if (petInfoElement && !petInfoElement.classList.contains('hidden')) {
        petInfoElement.classList.add('hidden');
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  // Main interval to handle age, parameters, and coins
  useEffect(() => {
    const timer = setInterval(() => {
      incrementAge();
      checkParam();
      addCoinByTimer();
    }, 6000);

    return () => clearInterval(timer);
  }, [incrementAge, checkParam, addCoinByTimer]);

  // Function to handle closing the game over popup and navigating back to the main menu
  const handleGameOverClose = useCallback(() => {
    setShowGameOver(false);
    setCurrentPage('mainMenu'); // Navigate back to the main menu
  }, [setCurrentPage]);

  return (
    <div className="relative flex flex-col items-center justify-center bg-center bg-no-repeat bg-contain text-center w-[70vw] h-[90vh] bg-[url('./assets/lightbackground.png')]">
      
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
      <img className="eggImg w-[100px] h-[100px] fixed bottom-17" src={egg} alt="Egg" />
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
          <div
            key={square.id}
            className="w-[6vw] h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 mx-[2vw] transition-opacity duration-500"
            onClick={square.onClick}
          >
            <img
              className="max-w-[90%] max-h-[90%] object-contain"
              src={square.imgSrc}
              alt={`Additional ${square.id}`}
            />
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
  );
};

export default PetScreen;
