import React from 'react';
import './App.css';
import Resource from './components/resource/Resource';

function App() {
  const kingdomID = 1;

  return (
    <div className="App">
      <header className="App-header">
        <Resource kingdomID={kingdomID} />
      </header>
    </div>
  );
}

export default App;
