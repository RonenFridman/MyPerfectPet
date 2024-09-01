import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
//import './mainMenu.css';
import MainMenu from './Pages/mainMenu';
import Footer from './footer';
import Header from './header';
import EggSelector from './Pages/EggSelector';
import NameSelector from './Pages/nameSelector';
import PetScreen from './Pages/petScreen';

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
    <div className="flex justify-center items-center flex-col min-h-screen bg-customLightBlue dark:bg-customDarkBlue">
      <Header setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);