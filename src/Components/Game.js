import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import TeamSelection from './TeamSelection';
import Combat from './Combat';
import './Game.css';


const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<TeamSelection />} />
        <Route path="/combat/:teamNumber" element={<Combat />} />
      </Routes>
      <Footer />
    </div>


  );
};

export default App;