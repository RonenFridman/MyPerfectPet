import React, { useEffect, useState, useCallback } from 'react';
import './style.css';
import './petScreen.css';
import heartsFull from './assets/heartsFull.png';
import heartsHalf from './assets/heartsHalf.png';
import heartsEmpty from './assets/heartsEmpty.png';
import clean1 from './assets/clean1.png';
import clean2 from './assets/clean2.png';
import food from './assets/food.png';
import info from './assets/info.png';
import light from './assets/lightMode.png';
import dark from './assets/darkMode.png';
import coin from './assets/coin.png';
import eggSmelly from './assets/eggSmelly.gif';
import egg from './assets/egg1.png';

const PetScreen = ({ setCurrentPage }) => {
  const [additionalSquares, setAdditionalSquares] = useState([]); // Tracks extra buttons when clicking on gray squarest
  const [coinCount, setCoinCount] = useState(0); // Tracks the number of coins
  const [happiness, setHappiness] = useState(100); // Tracks the pet's happiness level
  const [age, setAge] = useState(0); // Tracks the pet's age
  const [hatched, setHatched] = useState(0); // Tracks whether the egg has hatched
  const [lastCleaned, setLastCleaned] = useState(new Date()); // Stores the last time the pet was cleaned
  const [lastPlayed, setLastPlayed] = useState(new Date()); // Stores the last time the pet was played with
  const [lastFed, setLastFed] = useState(new Date()); // Stores the last time the pet was fed
  const [lastMedicine, setLastMedicine] = useState(new Date()); // Stores the last time the pet received medicine
  const [hearts, setHearts] = useState([heartsFull, heartsFull, heartsFull, heartsFull, heartsFull]); // Tracks the hearts displayed representing happiness

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
    const paramInterval = setInterval(checkParam, 6000); // Checks parameters every 1 min
    const ageInterval = setInterval(incrementAge, 180000); // Increments age every 3 min

    // Cleanup intervals and event listeners when the component is unmounted
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      clearInterval(coinInterval);
      clearInterval(paramInterval);
      clearInterval(ageInterval);
    };
  }, [happiness]); // Dependencies are declared here to ensure effects are correctly re-run when necessary

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

  // Function to check various parameters and adjust happiness accordingly
  const checkParam = useCallback(() => {
    const currentTime = new Date(); // Get the current time
    let newHappiness = happiness; // Start with the current happiness level

    console.log('Current Happiness:', happiness); 

    // Check how long it's been since each action was last performed and reduce happiness if necessary
    if ((currentTime - lastCleaned) / 60000 >= 5) {
        console.log('Reducing happiness due to no cleaning');
        newHappiness -= 4;
    }
    if ((currentTime - lastPlayed) / 6000 >= 0.6) { 
        console.log('Reducing happiness due to no play');
        newHappiness -= 5;
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
        { id: prevSquares.length + 1, imgSrc: food, onClick: handleClickFoodBetter },
        { id: prevSquares.length + 2, imgSrc: food, onClick: handleClickFoodWorst }
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
        { id: prevSquares.length + 1, imgSrc: dark, onClick: handleClickMedicineBetter },
        { id: prevSquares.length + 2, imgSrc: light, onClick: handleClickMedicineWorst }
      ]);
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

  return (
    <div>
      <div className="petBackground">
        <div id="statusBar">
          <div id="coinCounter">
            <img className="coinImg" src={coin} alt="Coin" onClick={handleCoinClick} />
            <span>{coinCount}</span>
          </div>
          <div id="happyBar">Happiness:
            {hearts.map((heart, index) => (
              <img key={index} className="happyImg" src={heart} alt={`Heart ${index + 1}`} />
            ))}
          </div>
        </div>
        <div className='petArea'>
          <div className="actionButtons">
            <div className="graySquare" onClick={() => handleGraySquareClick('food')}>
              <img src={food} alt="food" />
            </div>
            <div className="graySquare" onClick={() => handleGraySquareClick('clean')}>
              <img src={clean1} alt="Clean 1" />
            </div>
            <div className="graySquare" onClick={() => handleGraySquareClick('clean')}>
              <img src={info} alt="info" />
            </div>
          </div>
          <img className="eggImg" src={egg} alt="Egg" />
          <div className="actionButtons">
            <div className="graySquare" onClick={() => handleGraySquareClick('play')}>
              <img src={clean2} alt="Clean 2" />
            </div>
            <div className="graySquare" onClick={() => handleGraySquareClick('medicine')}>
              <img src={clean1} alt="Clean 1" />
            </div>
            <div className="graySquare" onClick={() => handleGraySquareClick('play')}>
              <img src={light} alt="lightMode" />
            </div>
          </div>
          <div className="additionalSquares">
            {additionalSquares.map(square => (
              <div key={square.id} className="blueSquare" onClick={square.onClick} >
                <img src={square.imgSrc} alt={`Additional ${square.id}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetScreen;
