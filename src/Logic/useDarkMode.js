import { useCallback } from 'react';
import { logo , light , dark } from '../icons';

const useDarkMode = () => {
  const handleLightClick = useCallback(() => {
    if (document.documentElement.classList.contains('dark')) {
      console.log('Light mode enabled');
      document.documentElement.classList.remove('dark');
      const lightButtons = document.getElementsByClassName('lightButton');
      if (lightButtons.length > 0) {
        // Iterate over all elements with the class 'lightButton'
        for (let i = 0; i < lightButtons.length; i++) {
          lightButtons[i].src = light; // Assuming `light` is a valid image source
        }
      }
    } else {
      console.log('Dark mode enabled');
      document.documentElement.classList.add('dark');
      const lightButtons = document.getElementsByClassName('lightButton');
      if (lightButtons.length > 0) {
        // Iterate over all elements with the class 'lightButton'
        for (let i = 0; i < lightButtons.length; i++) {
          lightButtons[i].src = dark; // Assuming `dark` is a valid image source
        }
      }
    }
  }, []);

  return { handleLightClick };
};

export default useDarkMode;