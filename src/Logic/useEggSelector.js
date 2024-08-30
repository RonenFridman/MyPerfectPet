// useEggSelector.js
import { useState } from 'react';

const useEggSelector = (setCurrentPage) => {
    const [selectedEgg, setSelectedEgg] = useState('');

    const handleCheckboxChange = (event) => {
        const { id } = event.target;
        setSelectedEgg(id);
    };

    const handleContinueClick = () => {
        if (selectedEgg) {
            localStorage.setItem('selectedEgg', selectedEgg);
            setCurrentPage('nameSelector');
        }
    };

    return {
        selectedEgg,
        handleCheckboxChange,
        handleContinueClick
    };
};

export default useEggSelector;
