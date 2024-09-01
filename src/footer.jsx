import React, { useState, useEffect, useRef, useMemo } from 'react';
import musicImg from './assets/music.png';
import musicMuteImg from './assets/mute.png';
import infoImg from './assets/info.png';
import bgMusic from './assets/background_music.mp3';

const Footer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const audio = useMemo(() => new Audio(bgMusic), []);
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
        className="fixed bottom-[2vh] left-[2vw] w-[10vw] sm:w-[4.5vw] h-auto cursor-pointer"
        src={isPlaying ? musicImg : musicMuteImg}
        alt="Music Button"
        onClick={toggleMusic}
      />
      <img
        className="fixed bottom-[2vh] right-[2vw] w-[8vw] sm:w-[4.5vw] h-auto cursor-pointer"
        src={infoImg}
        alt="Info Button"
        onClick={toggleInfo}
      />
            {showInfo && (
              <div className="info-window fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
                   onClick={handleOutsideClick}>
                <div className="info-content whitespace-normal text-[0.6rem] sm:text-[1.5rem] bg-[#fffa90] p-4 shadow-lg rounded-lg w-[70%] h-[80%] transform transition-transform duration-300 hover:scale-105 overflow-auto" ref={infoContentRef} onClick={(e) => e.stopPropagation()}>
                  <p ><b>How to Play:</b></p>
                  <p >----------------------------</p>
                  <p >First of all, start by choosing one of the six unique eggs. Each egg will hatch into a different type of pet.</p>
                  <p ><b>How to Take Care of Your Pet:</b></p>
                  <p >----------------------------</p>
                  <p >Every minute, you earn 10 PetCoins. PetCoins are used to buy food, medicine, soap, and games for your pet.</p>
                  <p >If you do not take care of your pet, it becomes hungry, sick, dirty, and unhappy. If your pet's health reaches zero hearts, it will die!</p>
                  <p >At the age of 18, your egg will hatch, and you will receive your very own virtual Perfect Pet &lt;3.</p>
                  <p ><b>Credits:</b> Reemy Halabi, Alon Barak, Ronen Fridman, Shay Osmo</p>
                  <button className="close-btn bg-black text-white border-none py-2 px-4 mt-5 cursor-pointer rounded-md text-lg shadow-lg transition-transform duration-300 hover:translate-y-[-3px] hover:shadow-2xl" onClick={toggleInfo}>Close</button>
                </div>
              </div>
            )}
    </div>
  );
};

export default Footer;