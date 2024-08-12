import React, { useEffect } from 'react';
//import './nameSelector.css';
import eggImage from './assets/egg1.png';

const NameSelector = ({ setCurrentPage }) => {
  useEffect(() => {
    function createAlphabetGrid() {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-'.split('');
      const gridContainer = document.querySelector('.alphabet-grid');
      gridContainer.innerHTML = '';
      alphabet.forEach(letter => {
        const letterElement = document.createElement('div');
        letterElement.className = 'alphabet-letter text-2xl m-[0_5px] p-2 border-2 border-black bg-[#cb958e] hover:bg-[#e36588]';
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
  <h1 className="eggTitle text-4xl font-bold text-center mb-4">Take Good Care of Her/him</h1>
  <div
    className="petBackground bg-cover bg-no-repeat bg-center w-[70vw] h-[70vh] flex flex-col justify-center items-center text-center"
    style={{ backgroundImage: "url('./assets/bg.jpg')" }}
  >
    <div className="name-selector block w-[40vw] h-[30vw] p-[1vh_3vw]">
      <div className="name-display flex justify-center items-center mb-[6vh]">
        <span className="letter text-2xl m-[0_5px] p-2 border-2 border-black bg-[#cb958e]">_</span>
        <span className="letter text-2xl m-[0_5px] p-2 border-2 border-black bg-[#cb958e]">_</span>
        <span className="letter text-2xl m-[0_5px] p-2 border-2 border-black bg-[#cb958e]">_</span>
        <span className="letter text-2xl m-[0_5px] p-2 border-2 border-black bg-[#cb958e]">_</span>
        <span className="letter text-2xl m-[0_5px] p-2 border-2 border-black bg-[#cb958e]">_</span>
        <span className="letter text-2xl m-[0_5px] p-2 border-2 border-black bg-[#cb958e]">_</span>
      </div>
      <div className='flex justify-center items-center'>
        <img className="eggImg w-[9vw] mb-[4vh] animate-shake" src={eggImage} alt="Egg" />
      </div>
      <div className="alphabet-grid grid grid-cols-9 grid-rows-3 gap-1">
        {/* Alphabet grid content goes here */}
      </div>
      <div className="misc-grid flex flex-row mt-[3vh] justify-center items-center">
      <span className="letter hover:bg-[#e36588] text-xl p-2 border-2 border-black bg-[#cb958e] cursor-pointer user-select-none transition-colors duration-200 hover:bg-[#e36588] mr-4" id="deleteBtn">Delete</span>
      <span onClick={() => setCurrentPage('petScreen')} className="letter hover:bg-[#e36588] text-xl p-2 border-2 border-black bg-[#cb958e] cursor-pointer user-select-none transition-colors duration-200 hover:bg-[#e36588]" id="confirmBtn">Confirm</span>
    </div>
    </div>
  </div>
</div>


  );
};

export default NameSelector;