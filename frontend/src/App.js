import React, { useState } from 'react';
import './App.css';
import Resource from './components/resource/Resource';

function App() {
  const [foodAmount, setFoodAmount] = useState(0);
  const [goldAmount, setGoldAmount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <Resource setFoodAmount={setFoodAmount} setGoldAmount={setGoldAmount} />
      </header>
    </div>
  );
}

export default App;
