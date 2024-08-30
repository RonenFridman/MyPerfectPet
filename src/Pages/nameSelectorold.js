import React, { useEffect, useState } from 'react';
import egg1 from '../assets/egg1.png';
import egg2 from '../assets/egg2.png';
import egg3 from '../assets/egg3.png';
import egg4 from '../assets/egg4.png';
import egg5 from '../assets/egg5.png';
import egg6 from '../assets/egg6.png';

const NameSelector = ({ setCurrentPage }) => {
  const [eggImageSrc, setEggImageSrc] = useState(egg1);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current index

  useEffect(() => {
    // Retrieve the selected egg ID from localStorage
    const savedEggId = localStorage.getItem('selectedEgg');

    switch (savedEggId) {
      case 'egg1':
        setEggImageSrc(egg1);
        break;
      case 'egg2':
        setEggImageSrc(egg2);
        break;
      case 'egg3':
        setEggImageSrc(egg3);
        break;
      case 'egg4':
        setEggImageSrc(egg4);
        break;
      case 'egg5':
        setEggImageSrc(egg5);
        break;
      case 'egg6':
        setEggImageSrc(egg6);
        break;
      default:
        console.error('Invalid egg ID');
        break;
    }

    createAlphabetGrid();

    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
      const nameDisplay = document.querySelectorAll('.name-display .letter');

      if (key === 'BACKSPACE') {
        if (currentIndex > 0) {
          const newIndex = currentIndex - 1;
          nameDisplay[newIndex].textContent = '_';
          setCurrentIndex(newIndex);
        }
      } else if (/^[A-Z-]$/.test(key)) {
        if (currentIndex < nameDisplay.length) {
          nameDisplay[currentIndex].textContent = key;
          setCurrentIndex(currentIndex + 1);
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
  }, [currentIndex]); // Add currentIndex as a dependency

  const createAlphabetGrid = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-'.split('');
    const gridContainer = document.querySelector('.alphabet-grid');
    if (gridContainer) {
      gridContainer.innerHTML = '';
      alphabet.forEach((letter) => {
        const letterElement = document.createElement('div');
        letterElement.className =
          'alphabet-letter text-2xl m-[0_5px] p-2 border-2 border-black bg-[#e36588] hover:bg-[#cb958e] dark:bg-[#BE234F] dark:hover:bg-[#A8584D]';
        letterElement.textContent = letter;
        gridContainer.appendChild(letterElement);

        letterElement.addEventListener('click', () => {
          const nameDisplay = document.querySelectorAll('.name-display .letter');
          if (currentIndex < nameDisplay.length) {
            nameDisplay[currentIndex].textContent = letter;
            setCurrentIndex(currentIndex + 1);
          }
        });
      });
    }
  };

  return (
    <div>
      <h1 className="eggTitle text-4xl font-bold text-center mb-4">Take Good Care of Her/Him</h1>
      <div
        className="petBackground bg-cover bg-no-repeat bg-center w-[70vw] h-[70vh] flex flex-col justify-center items-center text-center"
        style={{ backgroundImage: "url('./assets/bg.jpg')" }}
      >
        <div className="name-selector block w-[40vw] h-[30vw] p-[1vh_3vw]">
          <div className="name-display flex justify-center items-center mb-[6vh]">
            {Array.from({ length: 6 }).map((_, index) => (
              <span
                key={index}
                className="letter text-2xl m-[0_5px] p-2 border-2 border-black bg-[#cb958e] dark:bg-[#BE234F]"
              >
                _
              </span>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <img className="eggImg w-[9vw] mb-[4vh] animate-shake" src={eggImageSrc} alt="Egg" />
          </div>
          <div className="alphabet-grid grid grid-cols-9 grid-rows-3 gap-1">
            {/* Alphabet grid content goes here */}
          </div>
          <div className="misc-grid flex flex-row mt-[3vh] justify-center items-center">
            <span
              className="letter text-xl p-2 border-2 border-black bg-[#e36588] hover:bg-[#cb958e] dark:bg-[#9e3553] dark:hover:bg-[#A8584D] cursor-pointer user-select-none transition-colors duration-200 hover:bg-[#e36588] mr-4"
              id="deleteBtn"
            >
              Delete
            </span>
            <span
              onClick={() => setCurrentPage('petScreen')}
              className="letter text-xl p-2 border-2 border-black cursor-pointer user-select-none transition-colors duration-200 bg-[#e36588] hover:bg-[#cb958e] dark:bg-[#BE234F] dark:hover:bg-[#A8584D]"
              id="confirmBtn"
            >
              Confirm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameSelector;
