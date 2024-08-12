import React from 'react';
//import './style.css';
import musicImg from './assets/music.png';
import infoImg from './assets/info.png';

const Footer = () => {
  return (
    <div>
      <img
        className="fixed bottom-[2vh] left-[2vw] w-[4.5vw] h-auto"
        src={musicImg}
        alt="Music Button"
      />
      <img
        className="fixed bottom-[2vh] right-[2vw] w-[4.5vw] h-auto"
        src={infoImg}
        alt="Info Button"
      />
    </div>
  );
};

export default Footer;
