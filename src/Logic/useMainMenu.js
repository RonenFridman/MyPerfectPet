// useMainMenu.js
import { useState } from 'react';

const useMainMenu = (setCurrentPage) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleContinueGame = () => {
        const savedGameState = localStorage.getItem('petGameState');
        if (savedGameState) {
            setCurrentPage('petScreen');
        } else {
            setShowPopup(true);
        }
    };

    const handleNewGame = () => {
        localStorage.removeItem('petGameState');
        setCurrentPage('eggSelector');
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return { showPopup, handleContinueGame, handleNewGame, closePopup };
};

export default useMainMenu;
