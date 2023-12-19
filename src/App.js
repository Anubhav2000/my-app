import React from 'react';
import './App.css';
import Ledger from './ledger';
import data from './data/complicated_ledger.json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bank Statement</h1>
      </header>
      <Ledger ledgerData={data}/>
    </div>
  );
}

export default App;