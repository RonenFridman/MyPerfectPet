import React, { useState, useEffect } from 'react';
//import './style.css';
import musicImg from './assets/music.png';
import musicMuteImg from './assets/mute.png'; // Image for muted state
import infoImg from './assets/info.png';
import bgMusic from './assets/background_music.mp3'; // Path to your music file

const Footer = () => {
  const [isPlaying, setIsPlaying] = useState(false); // State to toggle music on/off
  const audio = new Audio(bgMusic); // Create Audio object

  useEffect(() => {
    // Play the music when the component mounts if isPlaying is true
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    // Clean up function to pause the music when the component unmounts
    return () => {
      audio.pause();
    };
  }, [isPlaying, audio]); // Run this effect when isPlaying changes

  const toggleMusic = () => {
    setIsPlaying(!isPlaying); // Toggle the state to play/pause the music
  };

  return (
    <div>
      <img
        className="fixed bottom-[2vh] left-[2vw] w-[4.5vw] h-auto cursor-pointer"
        src={isPlaying ? musicImg : musicMuteImg} // Switch between music and mute image
        alt="Music Button"
        onClick={toggleMusic}
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
