import React, { useState, useEffect, useRef } from 'react';
import musicImg from './assets/music.png';
import musicMuteImg from './assets/mute.png';
import infoImg from './assets/info.png';
import bgMusic from './assets/background_music.mp3';

const Footer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const audio = new Audio(bgMusic);
  const infoContentRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
    return () => {
      audio.pause();
    };
  }, [isPlaying, audio]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const handleOutsideClick = (event) => {
    if (infoContentRef.current && !infoContentRef.current.contains(event.target)) {
      setShowInfo(false);
    }
  };

  


  return (
    <div>
      <img
        className="fixed bottom-[2vh] left-[2vw] w-[4.5vw] h-auto cursor-pointer"
        src={isPlaying ? musicImg : musicMuteImg}
        alt="Music Button"
        onClick={toggleMusic}
      />
      <img
        className="fixed bottom-[2vh] right-[2vw] w-[4.5vw] h-auto cursor-pointer"
        src={infoImg}
        alt="Info Button"
        onClick={toggleInfo}
      />
      {showInfo && (
        <div className="info-window fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
             onClick={handleOutsideClick}>
          <div className="info-content bg-[#fffa90] p-4 shadow-lg rounded-lg max-w-lg" ref={infoContentRef} onClick={(e) => e.stopPropagation()}>
            <p><b>How to Play:</b></p>
            <p>----------------------------</p>
            <p>First of all, start by choosing one of the six unique eggs. Each egg will hatch into a different type of pet.</p>
            <p><b>How to Take Care of Your Pet:</b></p>
            <p>----------------------------</p>
            <p>Every minute, you earn 10 PetCoins. PetCoins are used to buy food, medicine, soap, and games for your pet.</p>
            <p>If you do not take care of your pet, it becomes hungry, sick, dirty, and unhappy. If your pet's health reaches zero hearts, it will die!</p>
            <p>At the age of 18, your egg will hatch, and you will receive your very own virtual Perfect Pet &lt;3.</p>
            <p><b>Credits:</b> Reemy Halaby, Ronen Fridman, Alon Barak, Shay Osmo</p>
            <button className="close-btn" onClick={toggleInfo}>Close</button>
          </div>
        </div>
      )}
      <style jsx>{`
        .info-content {
          background: #fffa90;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1), 0 6px 20px rgba(0,0,0,0.19); /* Multi-layer shadows for 3D effect */
          max-width: 500px;
          text-align: left;
          position: relative;
          transform: scale(1); /* Slightly scale up the container for 3D effect */
          transition: transform 0.3s ease;
        }
        .info-content:hover {
          transform: scale(1.05); /* Scale effect on hover */
        }
        .close-btn {
          background-color: black;
          color: white;
          border: none;
          padding: 10px 20px;
          margin-top: 20px;
          cursor: pointer;
          border-radius: 5px;
          font-size: 16px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.4); /* Shadow for 3D button effect */
          transition: transform 0.3s ease;
        }
        .close-btn:hover {
          transform: translateY(-3px); /* Small lift effect on hover */
          box-shadow: 0 10px 20px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
};

export default Footer;
