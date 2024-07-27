import React from 'react';
import './style.css';
import musicImg from './assets/music.png';
import infoImg from './assets/info.png';

const Footer = () => {
  return (
        <div>
        <img className="musicBtn" src={musicImg} alt="My Image" />
        <img className="infoBtn" src={infoImg} alt="My Image" />
    </div>
  );
};

export default Footer;