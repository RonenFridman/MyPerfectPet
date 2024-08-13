import React, { useEffect, useState, useCallback } from 'react';
import heartsFull from './assets/heartsFull.png';
import heartsHalf from './assets/heartsHalf.png';
import heartsEmpty from './assets/heartsEmpty.png';
import clean1 from './assets/clean1.png';
import clean2 from './assets/clean2.png';
import food from './assets/food.png';
import info from './assets/info.png';
import petInfo from './assets/petInfo.png';
import medicane from './assets/medicine.png';
import light from './assets/lightMode.png';
import dark from './assets/darkMode.png';
import coin from './assets/coin.png';
import eggSmelly from './assets/eggSmelly.gif';
import egg from './assets/egg1.png';
import medicine1 from './assets/syringe.png';
import medicine2 from './assets/medicine2.png';
import food1 from './assets/food1.png';
import food2 from './assets/food2.png';
import food3 from './assets/food3.png';

const PetScreen = ({ setCurrentPage }) => {
  const [additionalSquares, setAdditionalSquares] = useState([]); // Tracks extra buttons when clicking on gray squares
  const [coinCount, setCoinCount] = useState(0); // Tracks the number of coins
  const [happiness, setHappiness] = useState(100); // Tracks the pet's happiness level
  const [age, setAge] = useState(0); // Tracks the pet's age
  const [hatched, setHatched] = useState(0); // Tracks whether the egg has hatched
  const [lastCleaned, setLastCleaned] = useState(new Date()); // Stores the last time the pet was cleaned
  const [lastPlayed, setLastPlayed] = useState(new Date()); // Stores the last time the pet was played with
  const [lastFed, setLastFed] = useState(new Date()); // Stores the last time the pet was fed
  const [lastMedicine, setLastMedicine] = useState(new Date()); // Stores the last time the pet received medicine
  const [hearts, setHearts] = useState([heartsFull, heartsFull, heartsFull, heartsFull, heartsFull]); // Tracks the hearts displayed representing happiness

  // Function to calculate which heart images to display based on happiness
  const calculateHearts = useCallback((happiness) => {
    const heartsArray = [];

    for (let i = 0; i < 5; i++) {
        const heartHappiness = happiness - i * 20; // Calculates happiness range for each heart
        if (heartHappiness >= 20) {
            heartsArray.push(heartsFull); // Full heart if happiness is above 20 for this segment
        } else if (heartHappiness >= 10) {
            heartsArray.push(heartsHalf); // Half heart if happiness is between 10 and 20
        } else {
            heartsArray.push(heartsEmpty); // Empty heart if happiness is below 10
        }
    }

    setHearts(heartsArray); // Updates the hearts array in state
  }, []);

  // Function to load the game state
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
      calculateHearts(gameState.happiness || 100); // Update hearts display based on loaded happiness
      console.log('Game loaded:', gameState);
    }
  }, [calculateHearts]);

  useEffect(() => {
    // Automatically load the game when the component mounts
    loadGame();
  }, [loadGame]);

  useEffect(() => {
    // This function handles click events on the document and toggles visibility of gray squares
    const handleDocumentClick = (event) => {
      const graySquares = document.querySelectorAll('.graySquare');
      if (event.target.classList.contains('graySquare') || event.target.closest('.graySquare')) {
        graySquares.forEach(square => {
          square.classList.add('hidden');
        });
      } else {
        graySquares.forEach(square => {
          square.classList.remove('hidden');
        });
        setAdditionalSquares([]); // Resets additional squares if a click happens outside a gray square
      }
    };
    
    document.addEventListener('click', handleDocumentClick);

    // Setup intervals for recurring tasks: adding coins, checking parameters, and incrementing age
    const coinInterval = setInterval(addCoinByTimer, 60000); // Adds coins every 1 min
    const paramInterval = setInterval(checkParam, 60000); // Checks parameters every 1 min
    const ageInterval = setInterval(incrementAge, 180000); // Increments age every 3 min

    // Cleanup intervals and event listeners when the component is unmounted
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      clearInterval(coinInterval);
      clearInterval(paramInterval);
      clearInterval(ageInterval);
    };
  }, [happiness]); // Dependencies are declared here to ensure effects are correctly re-run when necessary

  // Function to save the game state
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

  // Function to add coins based on the current happiness level
  const addCoinByTimer = useCallback(() => {
    setCoinCount(prevCount => prevCount + (happiness > 50 ? 15 : 10));
  }, [happiness]);

  // Function to subtract coins based on an activity's cost 
  const subCoinByActivity = useCallback((actionValue) => {
    setCoinCount(prevCount => {
      if (prevCount - actionValue >= 0) {
        return prevCount - actionValue; // Deducts coins if enough coins are available
      } else {
        console.log(`Not Enough Coins: ${prevCount}`);
        return prevCount; // If not enough coins, returns the same count without deduction
      }
    });
  }, []);

  // Function to check the pet's happiness and log appropriate messages
  const checkHappiness = useCallback((newHappiness) => {
    if (newHappiness <= 0) {
      console.log(`GAME OVER`); // Logs game over if happiness drops to zero or below
    } else {
      console.log(`Happiness is now: ${newHappiness}`); // Logs the current happiness
    }
  }, []);


  const checkParam = useCallback(() => {
    const currentTime = new Date(); // Get the current time
    let newHappiness = happiness; // Start with the current happiness level

    console.log('Current Happiness:', happiness); 

    // Check how long it's been since each action was last performed and reduce happiness if necessary
    if ((currentTime - lastCleaned) / 60000 >= 5) {
        console.log('Reducing happiness due to no cleaning');
        newHappiness -= 4;
    }
    if ((currentTime - lastPlayed) / 60000 >= 1) { 
        console.log('Reducing happiness due to no play');
        newHappiness -= 2;
    }
    if ((currentTime - lastFed) / 60000 >= 5) {
        console.log('Reducing happiness due to no feeding');
        newHappiness -= 3;
    }
    if ((currentTime - lastMedicine) / 60000 >= 10) {
        console.log('Reducing happiness due to no medicine');
        newHappiness -= 8;
    }

    setHappiness(newHappiness); // Updates happiness value
    calculateHearts(newHappiness); // Update the hearts display based on the new happiness
    checkHappiness(newHappiness); // checks if happiness is between 0-100
  }, [happiness, lastCleaned, lastPlayed, lastFed, lastMedicine, checkHappiness, calculateHearts]);

  // Function to increment the pet's age
  const incrementAge = useCallback(() => {
    setAge(prevAge => {
      const newAge = prevAge + 1; // Increment age by one
      if (newAge >= 120) {
        console.log('Your pet has died of old age.'); // Pet dies of old age at 120
      } else if (newAge === 18) {
        setHatched(1); // Set hatched to true when age reaches 18
        console.log('Your egg has hatched!');
      } else {
        console.log(`Pet age is now: ${newAge}`); // Log the current age
      }
      return newAge;
    });
  }, []);

  // Function to increase happiness, capped at 100, and recalculate hearts
  const addHappiness = useCallback((val) => {
    setHappiness(prevHappiness => {
      let newHappiness = prevHappiness + val;
      if (newHappiness > 100) {
        newHappiness = 100; // Cap happiness at 100
      }
      calculateHearts(newHappiness); // Update hearts display based on new happiness
      return newHappiness;
    });
  }, [calculateHearts]);

  // Handlers for various actions the user can take, including cleaning, feeding, playing, and giving medicine
  const handleClickCleanBetter = useCallback(() => {
    console.log('Cleaning pet...');
    subCoinByActivity(2); // Deduct coins
    setLastCleaned(new Date());  // Update lastCleaned to the current time
    addHappiness(4); // Increase happiness
  }, [subCoinByActivity, addHappiness]);
  
  const handleClickCleanWorst = useCallback(() => {
    console.log('Cleaning pet...');
    subCoinByActivity(4); // Deduct coins
    setLastCleaned(new Date());  // Update lastCleaned to the current time
    addHappiness(8); // Increase happiness
  }, [subCoinByActivity, addHappiness]);
  
  const handleClickFoodBetter = useCallback(() => {
    console.log('Feeding pet...');
    subCoinByActivity(4); // Deduct coins
    setLastFed(new Date());  // Update lastFed to the current time
    addHappiness(8); // Increase happiness
  }, [subCoinByActivity, addHappiness]);
  
  const handleClickFoodWorst = useCallback(() => {
    console.log('Feeding pet...');
    subCoinByActivity(3); // Deduct coins
    setLastFed(new Date());  // Update lastFed to the current time
    addHappiness(6); // Increase happiness
  }, [subCoinByActivity, addHappiness]);
  
  const handleClickPlayBetter = useCallback(() => {
    console.log('Playing with pet...');
    subCoinByActivity(4); // Deduct coins
    setLastPlayed(new Date());  // Update lastPlayed to the current time
    addHappiness(10); // Increase happiness
  }, [subCoinByActivity, addHappiness]);
  
  const handleClickPlayWorst = useCallback(() => {
    console.log('Playing with pet...');
    subCoinByActivity(2); // Deduct coins
    setLastPlayed(new Date());  // Update lastPlayed to the current time
    addHappiness(5); // Increase happiness
  }, [subCoinByActivity, addHappiness]);
  
  const handleClickMedicineBetter = useCallback(() => {
    console.log('Giving pet medicine...');
    subCoinByActivity(4); // Deduct coins
    setLastMedicine(new Date());  // Update lastMedicine to the current time
    addHappiness(8); // Increase happiness
  }, [subCoinByActivity, addHappiness]);
  
  const handleClickMedicineWorst = useCallback(() => {
    console.log('Giving pet medicine...');
    subCoinByActivity(3); // Deduct coins
    setLastMedicine(new Date());  // Update lastMedicine to the current time
    addHappiness(6); // Increase happiness
  }, [subCoinByActivity, addHappiness]);

  // Function to handle clicks on gray squares and display additional action options
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
        { id: prevSquares.length + 4, imgSrc: food, onClick: handleClickFoodWorst }
      ]);
    } else if (buttonType === 'play') {
      setAdditionalSquares(prevSquares => [
        ...prevSquares,
        { id: prevSquares.length + 1, imgSrc: light, onClick: handleClickPlayBetter },
        { id: prevSquares.length + 2, imgSrc: dark, onClick: handleClickPlayWorst }
      ]);
    } else if (buttonType === 'medicine') {
      setAdditionalSquares(prevSquares => [
        ...prevSquares,
        { id: prevSquares.length + 1, imgSrc: medicine1, onClick: handleClickMedicineBetter },
        { id: prevSquares.length + 2, imgSrc: medicine2, onClick: handleClickMedicineWorst }
      ]);
    } else if (buttonType === 'info') {
      setTimeout(() => {
        document.getElementById('petInfo').classList.remove('hidden');
      }, 500);
      
      

    }
  }, [handleClickCleanBetter, handleClickCleanWorst, handleClickFoodBetter, handleClickFoodWorst, 
    handleClickPlayBetter, handleClickPlayWorst, handleClickMedicineBetter, handleClickMedicineWorst]);
  
  // Function to handle clicks on additional squares and reset the displayed options
  const handleAdditionalSquareClick = useCallback(() => {
    setAdditionalSquares([]);
  }, []);

  // Function to handle clicks on the coin and increment the coin count
  const handleCoinClick = useCallback(() => {
    setCoinCount(prevCount => prevCount + 1);
  }, []);

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
        setAdditionalSquares([]); // Reset additional squares
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

  useEffect(() => {
    const timer = setInterval(() => {
      incrementAge();
      checkParam();
      addCoinByTimer();
    }, 60000);

    return () => clearInterval(timer);
  }, [incrementAge, checkParam, addCoinByTimer]);

  return (
    <div className="flex flex-col items-center justify-center bg-center bg-no-repeat bg-contain text-center w-[90vw] h-[90vh] bg-[url('./assets/bg.jpg')]">
      <div id="statusBar" className="w-[400px] h-[200px] flex ml-[1vw] items-center">
        <div id="coinCounter" className="flex mr-[3vw]">
          <img className="w-[2vw] h-[3vh] mr-[0.5vw]" src={coin} alt="Coin" onClick={handleCoinClick} />
          <span>{coinCount}</span>
        </div>
        <div id="happyBar" className="flex flex-row items-center">
          Happiness:
          <img className="w-auto h-auto" id="heart1" src={heartsFull} alt="Heart 1" />
          <img className="w-auto h-auto" id="heart2" src={heartsFull} alt="Heart 2" />
          <img className="w-auto h-auto" id="heart3" src={heartsFull} alt="Heart 3" />
          <img className="w-auto h-auto" id="heart4" src={heartsFull} alt="Heart 4" />
          <img className="w-auto h-auto" id="heart5" src={heartsFull} alt="Heart 5" />
        </div>
      </div>
      <img className="eggImg w-[100px] h-[100px] fixed" src={egg} alt="Egg" />
      <div className="flex flex-row items-center justify-center" style={{ width: '400px', height: '77vh' }}>
        <div className="flex-row justify-around mx-[8vw]">
          <div className="graySquare w-[6vw] h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('food')}>
            <img className="max-w-[90%] max-h-[90%] object-contain" src={food} alt="food" />
          </div>
          <div className="graySquare w-[6vw] h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('clean')}>
            <img className="max-w-[90%] max-h-[90%] object-contain" src={clean1} alt="Clean 1" />
          </div>
          <div id="happyBar">Happiness:
            {hearts.map((heart, index) => (
              <img key={index} className="happyImg" src={heart} alt={`Heart ${index + 1}`} />
            ))}
          <div className="graySquare w-[6vw] h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('info')}>
            <img className="max-w-[90%] max-h-[90%] object-contain" src={petInfo} alt="petinfo" />
          </div>
        </div>
        <div className="flex-row justify-around mx-[8vw]">
          <div className="graySquare w-[6vw] h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('play')}>
            <img className="max-w-[90%] max-h-[90%] object-contain" src={clean2} alt="Clean 2" />
          </div>
          <div className="graySquare w-[6vw] h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('medicine')}>
            <img className="max-w-[90%] max-h-[90%] object-contain" src={medicane} alt="medicine" />
          </div>
          <div className="graySquare w-[6vw] h-[6vw] bg-black/50 flex items-center justify-center border-3 border-blue-500 rounded-lg opacity-100 transform scale-100 cursor-pointer transition-opacity transition-transform duration-500 mt-[5vh]" onClick={() => handleGraySquareClick('play')}>
            <img className="max-w-[90%] max-h-[90%] object-contain" src={light} alt="lightMode" />
          </div>
          <button onClick={saveGame} className="saveButton">Save Game</button>
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
        <p>Age: 22</p>
        <p>Last Cleaned: 333</p>
        <p>Last Fed: 222</p>
        <p>Last Played: 3223</p>
        <p>Last Medicine: 112</p>
      </div>
    </div>
  );
};

export default PetScreen;
