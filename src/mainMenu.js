import React from 'react';

import titleImg from './assets/title3.png';
import animalsImg from './assets/animals.png';
import animals1Img from './assets/animals1.png';



const MainMenu = ({ setCurrentPage }) => {
  return (
    <div>
      <div>
        <img className="mainTitle" src={titleImg} alt="My Image" />
      </div>
      <img id="petImg2" src={animalsImg} alt="My Image" />
      <img id="petImg1" src={animals1Img} alt="My Image" />
      <div className="menuButtons">
        <button onClick={() => setCurrentPage('eggSelector')}>Continue Game</button>
        <br />
        <button onClick={() => setCurrentPage('home')}>New Game</button>
      </div>
    </div>
  );
};

export default MainMenu;
