import React, { useEffect } from 'react';
import useNameSelector from '../Logic/useNameSelector';

const NameSelector = ({ setCurrentPage }) => {
  const { eggImageSrc, createAlphabetGrid ,handleContinueClick } = useNameSelector(setCurrentPage);

  useEffect(() => {
    createAlphabetGrid();
  }, [createAlphabetGrid]);

  return (
    <div>
      <h1 className="eggTitle text-[6vw] sm:text-4xl font-bold text-center mb-4">Take Good Care of Her/Him</h1>
      <div
        className="petBackground bg-cover bg-no-repeat bg-center w-[90vw] sm:w-[70vw] h-[50vh] sm:h-[70vh] flex flex-col justify-center items-center text-center"
        style={{ backgroundImage: "url('./assets/bg.jpg')" }}
      >
        <div className="name-selector block w-[80vw] sm:w-[40vw] h-[30vw] p-[1vh_3vw]">
          <div className="name-display flex justify-center items-center mb-[6vh]">
            {Array.from({ length: 6 }).map((_, index) => (
              <span
                key={index}
                className="letter text-[4vw] sm:text-2xl m-[0_5px] p-2 border-2 border-black bg-[#cb958e] dark:bg-[#BE234F]"
              >
                _
              </span>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <img className="eggImg w-[20vw] sm:w-[9vw] mb-[4vh] animate-shake" src={eggImageSrc} alt="Egg" />
          </div>
          <div className="alphabet-grid grid grid-cols-9 grid-rows-3 gap-1">
            {/* Alphabet grid content goes here */}
          </div>
          <div className="misc-grid flex flex-row mt-[3vh] justify-center items-center">
            <span
              className="letter text-[3vw] sm:text-xl p-2 border-2 border-black bg-[#e36588] hover:bg-[#cb958e] dark:bg-[#9e3553] dark:hover:bg-[#A8584D] cursor-pointer user-select-none transition-colors duration-200 hover:bg-[#e36588] mr-4"
              id="deleteBtn"
            >
              Delete
            </span>
            <span
              onClick={handleContinueClick}
              className="letter text-[3vw] sm:text-xl p-2 border-2 border-black cursor-pointer user-select-none transition-colors duration-200 bg-[#e36588] hover:bg-[#cb958e] dark:bg-[#BE234F] dark:hover:bg-[#A8584D]"
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