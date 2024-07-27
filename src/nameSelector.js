import React, { useEffect } from 'react';
import './style.css';
import './nameSelector.css';
import eggImage from './assets/egg1.png';

const NameSelector = ({ setCurrentPage }) => {
  useEffect(() => {
    function createAlphabetGrid() {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-'.split('');
      const gridContainer = document.querySelector('.alphabet-grid');
      gridContainer.innerHTML = '';
      alphabet.forEach(letter => {
        const letterElement = document.createElement('div');
        letterElement.className = 'alphabet-letter';
        letterElement.textContent = letter;
        gridContainer.appendChild(letterElement);
      });
    }

    createAlphabetGrid();
    const letters = document.querySelectorAll('.alphabet-letter');
    const nameDisplay = document.querySelectorAll('.name-display .letter');
    let currentIndex = 0;

    letters.forEach(letter => {
      letter.addEventListener('click', () => {
        if (currentIndex < nameDisplay.length) {
          nameDisplay[currentIndex].textContent = letter.textContent;
          currentIndex++;
        }
      });
    });

    document.getElementById('deleteBtn').addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        nameDisplay[currentIndex].textContent = '_';
      }
    });

    // Add event listener for keyboard input after the component has rendered
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
      console.log(`Key pressed: ${key}`); // Debugging log
      if (key === 'BACKSPACE') {
        if (currentIndex > 0) {
          currentIndex--;
          nameDisplay[currentIndex].textContent = '_';
        }
      } else if (/^[A-Z-]$/.test(key)) {
        if (currentIndex < nameDisplay.length) {
          nameDisplay[currentIndex].textContent = key;
          currentIndex++;
        }
      } else if (key === 'ENTER') {
        const confirmBtn = document.getElementById('confirmBtn');
        if (confirmBtn) {
          confirmBtn.click();
        } else {
          console.error('Confirm button not found');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <h1 className="eggTitle">Take Good Care of Her/him</h1>
      <div className="petBackground">
        <div className="name-selector">
          <div className="name-display">
            <span className="letter">_</span>
            <span className="letter">_</span>
            <span className="letter">_</span>
            <span className="letter">_</span>
            <span className="letter">_</span>
            <span className="letter">_</span>
          </div>
          <div>
            <img className="eggImg" src={eggImage} alt="Egg" />
          </div>
          <div className="alphabet-grid">
            {/* Alphabet grid content goes here */}
          </div>
          <div className="misc-grid">
            <span className="letter" id="deleteBtn">Delete</span>
            <span onClick={() => setCurrentPage('petScreen')} className="letter" id="confirmBtn">Confirm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameSelector;