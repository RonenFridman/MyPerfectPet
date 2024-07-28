import React, { useEffect, useState, useCallback } from 'react';
import './style.css';
import './petScreen.css';
import heartsFull from './assets/heartsFull.png';
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
  const [additionalSquares, setAdditionalSquares] = useState([]);
  const [coinCount, setCoinCount] = useState(0);
  const [happiness, setHappiness] = useState(100);
  const [age, setAge] = useState(0);
  const [hatched, setHatched] = useState(0);
  const [lastCleaned, setLastCleaned] = useState(new Date());
  const [lastPlayed, setLastPlayed] = useState(new Date());
  const [lastFed, setLastFed] = useState(new Date());
  const [lastMedicine, setLastMedicine] = useState(new Date());

  useEffect(() => {
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
        setAdditionalSquares([]);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    const coinInterval = setInterval(addCoinByTimer, 60000);
    const paramInterval = setInterval(checkParam, 60000);
    const ageInterval = setInterval(incrementAge, 180000);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      clearInterval(coinInterval);
      clearInterval(paramInterval);
      clearInterval(ageInterval);
    };
  }, []);

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
        { id: prevSquares.length + 1, imgSrc: food, onClick: handleClickFoodBetter },
        { id: prevSquares.length + 2, imgSrc: food, onClick: handleClickFoodWorst },
        { id: prevSquares.length + 2, imgSrc: food, onClick: handleClickFoodWorst },
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
  

  const handleAdditionalSquareClick = useCallback(() => {
    setAdditionalSquares([]);
  }, []);

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
            <img className="happyImg" id="heart1" src={heartsFull} alt="Heart 1" />
            <img className="happyImg" id="heart2" src={heartsFull} alt="Heart 2" />
            <img className="happyImg" id="heart3" src={heartsFull} alt="Heart 3" />
            <img className="happyImg" id="heart4" src={heartsFull} alt="Heart 4" />
            <img className="happyImg" id="heart5" src={heartsFull} alt="Heart 5" />
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
