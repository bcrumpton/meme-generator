import React from 'react';
import Header from './Header';
import './App.css';
import MemeGenerator from './MemeGenerator';
import Counter from './Counter'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        {/* <MemeGenerator /> */}
        <Counter />
      </div>
    </div>
  );
}

export default App;
