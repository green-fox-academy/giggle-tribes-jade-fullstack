import React, { useState } from 'react';
import './App.css';
import Resource from './components/resource/Resource';

function App() {
  const [kingdomID, setKingdomID] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <Resource kingdomID={kingdomID} />
      </header>
    </div>
  );
}

export default App;
