import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
//import './mainMenu.css';
import MainMenu from './mainMenu';
import Footer from './footer';
import EggSelector from './EggSelector';
import NameSelector from './nameSelector';
import PetScreen from './petScreen';
import reportWebVitals from './reportWebVitals';

const Main = () => {
  const [currentPage, setCurrentPage] = useState('mainMenu');

  const renderPage = () => {
    switch (currentPage) {
      case 'mainMenu':
        return <MainMenu setCurrentPage={setCurrentPage} />;
      case 'eggSelector':
        return <EggSelector setCurrentPage={setCurrentPage} />;
      case 'nameSelector':
        return <NameSelector setCurrentPage={setCurrentPage} />;
      case 'petScreen':
        return <PetScreen setCurrentPage={setCurrentPage} />;
      default:
        return <MainMenu setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div class="flex justify-center items-center flex-col min-h-screen">
      {renderPage()}
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);

reportWebVitals();
