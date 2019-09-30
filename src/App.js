import React from 'react';
import Header from './Header';
import './App.css';
import MemeGenerator from './MemeGenerator';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <MemeGenerator />
      </div>
    </div>
  );
}

export default App;
