import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Positions from './components/Positions';
import Position from './components/Position';
import './App.css';

const App: React.FC = () => {
  console.log('App rendering'); // Debug log
  
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Positions />} />
          <Route path="/positions/:id" element={<Position />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
