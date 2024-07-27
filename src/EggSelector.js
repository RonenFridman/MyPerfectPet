import React, { useState } from 'react';
import './style.css';
import './eggSelectorStyle.css';


const EggSelector = ({ setCurrentPage })=> {
    const [selectedEgg, setSelectedEgg] = useState('');

    const handleCheckboxChange = (event) => {
        const { id } = event.target;
        setSelectedEgg(id);
    };

    return (
        <div className="eggMenu">
            <h1 className="eggTitle">Choose your egg...</h1>
            <div className="eggSelector">
                {['egg1', 'egg2', 'egg3', 'egg4', 'egg5', 'egg6'].map(egg => (
                    <div key={egg}>
                        <input
                            type="radio"
                            id={egg}
                            name="egg"
                            value={egg}
                            onChange={handleCheckboxChange}
                            checked={selectedEgg === egg}
                        />
                        <label htmlFor={egg}>
                            <img src={require(`./assets/${egg}.png`)} alt={egg} />
                        </label>
                    </div>
                ))}
            </div>
            <button onClick={() => setCurrentPage('nameSelector')} id="continueBtn" style={{ display: selectedEgg ? 'block' : 'none' }}>
                Continue
            </button>
        </div>
    );
};

export default EggSelector;
