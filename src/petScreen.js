import React, { useEffect, useState, useCallback } from 'react';
import heartsFull from './assets/heartsFull.png';
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
  const [additionalSquares, setAdditionalSquares] = useState([]);
  const [coinCount, setCoinCount] = useState(0);
  const [happiness, setHappiness] = useState(100);
  const [age, setAge] = useState(0);
  const [hatched, setHatched] = useState(0);
  const [lastCleaned, setLastCleaned] = useState(new Date());
  const [lastPlayed, setLastPlayed] = useState(new Date());
  const [lastFed, setLastFed] = useState(new Date());
  const [lastMedicine, setLastMedicine] = useState(new Date());

  const addCoinByTimer = useCallback(() => {
    setCoinCount(prevCount => prevCount + (happiness > 50 ? 15 : 10));
  }, [happiness]);

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

  const checkHappiness = useCallback((newHappiness) => {
    if (newHappiness <= 0) {
      console.log(`GAME OVER`);
    } else {
      console.log(`Happiness is now: ${newHappiness}`);
    }
  }, []);


  const checkParam = useCallback(() => {
    const currentTime = new Date();
    let newHappiness = happiness;

    if ((currentTime - lastCleaned) / 60000 >= 5) newHappiness -= 4;
    if ((currentTime - lastPlayed) / 60000 >= 1) newHappiness -= 2;
    if ((currentTime - lastFed) / 60000 >= 5) newHappiness -= 3;
    if ((currentTime - lastMedicine) / 60000 >= 10) newHappiness -= 8;

    setHappiness(newHappiness);
    checkHappiness(newHappiness);
  }, [happiness, lastCleaned, lastPlayed, lastFed, lastMedicine, checkHappiness]);

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

  const addHappiness = useCallback((val) => {
    setHappiness(prevHappiness => {
      let newHappiness = prevHappiness + val;
      if (newHappiness > 100) {
        newHappiness = 100;
      }
      return newHappiness;
    });
  }, []);

  const handleClickCleanBetter = useCallback(() => {
    console.log('Cleaning pet...');
    subCoinByActivity(2);
    setLastCleaned(new Date());
    addHappiness(4);
    checkHappiness(happiness);
  }, [subCoinByActivity, addHappiness, checkHappiness, happiness]);

  const handleClickCleanWorst = useCallback(() => {
    console.log('Cleaning pet...');
    subCoinByActivity(4);
    setLastCleaned(new Date());
    addHappiness(8);
    checkHappiness(happiness);
  }, [subCoinByActivity, addHappiness, checkHappiness, happiness]);

  const handleClickFoodBetter = useCallback(() => {
    console.log('Feeding pet...');
    subCoinByActivity(4);
    setLastFed(new Date());
    addHappiness(8);
    checkHappiness(happiness);
  }, [subCoinByActivity, addHappiness, checkHappiness, happiness]);

  const handleClickFoodWorst = useCallback(() => {
    console.log('Feeding pet...');
    subCoinByActivity(3);
    setLastFed(new Date());
    addHappiness(6);
    checkHappiness(happiness);
  }, [subCoinByActivity, addHappiness, checkHappiness, happiness]);

  const handleClickPlayBetter = useCallback(() => {
    console.log('Playing with pet...');
    subCoinByActivity(4);
    setLastPlayed(new Date());
    addHappiness(10);
    checkHappiness(happiness);
  }, [subCoinByActivity, addHappiness, checkHappiness, happiness]);

  const handleClickPlayWorst = useCallback(() => {
    console.log('Playing with pet...');
    subCoinByActivity(2);
    setLastPlayed(new Date());
    addHappiness(5);
    checkHappiness(happiness);
  }, [subCoinByActivity, addHappiness, checkHappiness, happiness]);

  const handleClickMedicineBetter = useCallback(() => {
    console.log('Giving pet medicine...');
    subCoinByActivity(4);
    setLastMedicine(new Date());
    addHappiness(8);
    checkHappiness(happiness);
  }, [subCoinByActivity, addHappiness, checkHappiness, happiness]);

  const handleClickMedicineWorst = useCallback(() => {
    console.log('Giving pet medicine...');
    subCoinByActivity(3);
    setLastMedicine(new Date());
    addHappiness(6);
    checkHappiness(happiness);
  }, [subCoinByActivity, addHappiness, checkHappiness, happiness]);

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

  const handleAdditionalSquareClick = useCallback(() => {
    setAdditionalSquares([]);
  }, []);

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
