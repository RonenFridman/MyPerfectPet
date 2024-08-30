import { useState, useCallback, useEffect } from 'react';
import {
    heartsFull, heartsHalf, heartsEmpty, clean, clean1, clean2,
    food, petInfo, medicine, light, dark, coin, egg1, egg2, egg3,
    egg4, egg5, egg6, pet1, pet2, pet3, medicine1, medicine2,
    food1, food2, food3, food4, play, play1, play2, save,
    boredicon, hungericon, dirtyicon, sickicon
  } from '../icons'; 

export const usePetScreenLogic = (setCurrentPage) => {
  // State declarations    // State declarations for various game properties
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
    const [eggImageSrc, setEggImageSrc] = useState(egg1);
    const [petImageSrc, setPetImageSrc] = useState(pet1);
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
  
  
    const handleLightClick = useCallback(() => {
      console.log('Light mode enabled');
      document.documentElement.classList.remove('dark');
  
    }, []);
    const handleDarkClick = useCallback(() => {
      console.log('Dark mode enabled');
      document.documentElement.classList.add('dark');
   
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
      if ((currentTime - lastPlayed) / 60000 >= 1) {  // Reduce happiness if not played in last minute
          console.log('Reducing happiness due to no play');
          newHappiness -= 2;
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
      subCoinByActivity(8); 
      setLastPlayed(new Date());  
      addHappiness(8); 
      setIsPlayed(true);
    }, [subCoinByActivity, addHappiness]);
    
    const handleClickPlayWorst = useCallback(() => {
      console.log('Playing with pet...');
      subCoinByActivity(5); 
      setLastPlayed(new Date());  
      addHappiness(7); 
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
          { id: prevSquares.length + 1, imgSrc: clean1, onClick: handleClickCleanBetter , cost: 2 , added_happiness: 4},
          { id: prevSquares.length + 2, imgSrc: clean2, onClick: handleClickCleanWorst , cost: 4 , added_happiness: 8 }
        ]);
      } else if (buttonType === 'food') {
        setAdditionalSquares(prevSquares => [
          ...prevSquares,
          { id: prevSquares.length + 1, imgSrc: food1, onClick: handleClickFoodBetter , cost: 4 , added_happiness: 8 },
          { id: prevSquares.length + 2, imgSrc: food2, onClick: handleClickFoodWorst , cost: 1 , added_happiness: 2},
          { id: prevSquares.length + 3, imgSrc: food3, onClick: handleClickFoodWorst , cost: 3 , added_happiness: 8},
          { id: prevSquares.length + 4, imgSrc: food4, onClick: handleClickFoodWorst , cost: 3 , added_happiness: 6}
        ]);
      } else if (buttonType === 'play') {
        setAdditionalSquares(prevSquares => [
          ...prevSquares,
          { id: prevSquares.length + 1, imgSrc: play1, onClick: handleClickPlayBetter , cost: 5 , added_happiness: 7 },
          { id: prevSquares.length + 2, imgSrc: play2, onClick: handleClickPlayWorst , cost: 7 , added_happiness: 8}
        ]);
      } else if (buttonType === 'medicine') {
        setAdditionalSquares(prevSquares => [
          ...prevSquares,
          { id: prevSquares.length + 1, imgSrc: medicine1, onClick: handleClickMedicineBetter , cost: 3 , added_happiness: 6 },
          { id: prevSquares.length + 2, imgSrc: medicine2, onClick: handleClickMedicineWorst , cost: 4 , added_happiness: 8 }
        ]);
      } else if (buttonType === 'light') {
        setAdditionalSquares(prevSquares => [
        ...prevSquares,
        { id: prevSquares.length + 1, imgSrc: light, onClick: handleLightClick },
        { id: prevSquares.length + 2, imgSrc: dark, onClick: handleDarkClick } 
      ]);
      }else if (buttonType === 'info') {
        setTimeout(() => {
          document.getElementById('petInfo').classList.remove('hidden');
        }, 500);
      }
    }, [handleDarkClick,handleLightClick,handleClickCleanBetter, handleClickCleanWorst, handleClickFoodBetter, handleClickFoodWorst, 
      handleClickPlayBetter, handleClickPlayWorst, handleClickMedicineBetter, handleClickMedicineWorst]);
    
  
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
      const savedEggId = localStorage.getItem('selectedEgg');
  
      switch (savedEggId) {
        case 'egg1':
          setEggImageSrc(egg1);
          setPetImageSrc(pet1);
          break;
        case 'egg2':
          setEggImageSrc(egg2);
          setPetImageSrc(pet1);
          break;
        case 'egg3':
          setEggImageSrc(egg3);
          setPetImageSrc(pet2);
          break;
        case 'egg4':
          setEggImageSrc(egg4);
          setPetImageSrc(pet2);
          break;
        case 'egg5':
          setEggImageSrc(egg5);
          setPetImageSrc(pet3);
          break;
        case 'egg6':
          setEggImageSrc(egg6);
          setPetImageSrc(pet3);
          break;
        default:
          console.error('Invalid egg ID');
          break;
      }
  
  
      const timer = setInterval(() => {
        incrementAge();
        checkParam();
        addCoinByTimer();
      }, 60000);
  
      return () => clearInterval(timer);
    }, [incrementAge, checkParam, addCoinByTimer]);
  
    // Function to handle closing the game over popup and navigating back to the main menu
    const handleGameOverClose = useCallback(() => {
      setShowGameOver(false);
      setCurrentPage('mainMenu'); // Navigate back to the main menu
    }, [setCurrentPage]);
  

  return {
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
    // ... (other returned values and functions)
  };
};