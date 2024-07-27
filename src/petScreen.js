import React, { useEffect, useState } from 'react';
import './style.css';
import './petScreen.css';
import heartsFull from './assets/heartsFull.png';
import clean1 from './assets/clean1.png';
import clean2 from './assets/clean2.png';
import coin from './assets/coin.png';
import egg1 from './assets/egg1.png';

const PetScreen = ({ setCurrentPage }) => {
  const [additionalSquares, setAdditionalSquares] = useState([]);
  const [coinCount, setCoinCount] = useState(0);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const graySquares = document.querySelectorAll('.graySquare');

      // Clicked on .graySquare
      if (event.target.classList.contains('graySquare') || event.target.closest('.graySquare')) {
        graySquares.forEach(square => {
          square.classList.add('hidden');
        });
      } else {
        // Clicked outside .graySquare
        graySquares.forEach(square => {
          square.classList.remove('hidden');
        });
        setAdditionalSquares([]); // Clear additional squares
      }
    };

    document.addEventListener('click', handleDocumentClick);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleGraySquareClick = () => {
    setAdditionalSquares(prevSquares => [
      ...prevSquares,
      { id: prevSquares.length + 1, imgSrc: clean1 },
      { id: prevSquares.length + 2, imgSrc: clean2 }
    ]);
  };

  const handleAdditionalSquareClick = () => {
    setAdditionalSquares([]);
  };

  const handleCoinClick = () => {
    setCoinCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <div className="petBackground">
        <div id="statusBar">
          <div id="coinCounter">
            <img className="coinImg" src={coin} alt="Coin" />
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
            <div className="graySquare" onClick={handleGraySquareClick}>
              <img src={clean1} alt="Clean 1" />
            </div>
            <div className="graySquare" onClick={handleGraySquareClick}>
              <img src={clean2} alt="Clean 2" />
            </div>
            <div className="graySquare" onClick={handleCoinClick}>
              <img src={coin} alt="Coin" />
            </div>
          </div>
          <img className="eggImg" src={egg1} alt="Egg" />
          <div className="actionButtons">
            <div className="graySquare" onClick={handleGraySquareClick}>
              <img src={clean2} alt="Clean 2" />
            </div>
            <div className="graySquare" onClick={handleGraySquareClick}>
              <img src={clean1} alt="Clean 1" />
            </div>
            <div className="graySquare" onClick={handleCoinClick}>
              <img src={coin} alt="Coin" />
            </div>
          </div>
          <div className="additionalSquares">
            {additionalSquares.map(square => (
              <div key={square.id} className="blueSquare" onClick={handleAdditionalSquareClick}>
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