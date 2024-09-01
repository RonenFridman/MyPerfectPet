import React from 'react';
import useEggSelector from '../Logic/useEggSelector';

const EggSelector = ({ setCurrentPage }) => {
    const { selectedEgg, handleCheckboxChange, handleContinueClick } = useEggSelector(setCurrentPage);

    return (
        <div className="flex flex-col items-center justify-center mt-[2vh]">
            <h1 className="text-[5vw] sm:text-[2vw] mt-[2vh] mb-[5vh] sm:mb-[10vh] bg-[#cb958e] p-2 rounded">
                Choose your egg...
            </h1>
            <div className="grid grid-cols-3 grid-rows-2 justify-items-center items-center mt-[4vh] gap-x-[5vw] sm:gap-x-[25vh] gap-y-[8vw]">
                {['egg1', 'egg2', 'egg3', 'egg4', 'egg5', 'egg6'].map(egg => (
                    <div key={egg}>
                        <input
                            type="radio"
                            id={egg}
                            name="egg"
                            value={egg}
                            onChange={handleCheckboxChange}
                            checked={selectedEgg === egg}
                            className="hidden"
                        />
                        <label htmlFor={egg} className="cursor-pointer">
                            <img
                                src={require(`../assets/${egg}.png`)}
                                alt={egg}
                                className={`w-[20vw] sm:w-[108px] h-auto ${selectedEgg === egg ? 'animate-shake' : ''}`}
                            />
                        </label>
                    </div>
                ))}
            </div>
            <button
                onClick={handleContinueClick}
                className={`fixed bg-[#cb958e] text-[4vw] sm:text-[2vw] bottom-[6vh] right-[8vw] sm:right-[10vw] border-2 border-black cursor-pointer w-[40vw] sm:w-[20vw] h-[8vh] font-inherit ${
                    selectedEgg ? 'block' : 'hidden'
                }`}
            >
                Continue
            </button>
        </div>
    );
};

export default EggSelector;