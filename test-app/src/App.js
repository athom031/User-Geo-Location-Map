import React from 'react';
import logo from './logo.svg';
import './App.css';
<div className="App">
      <header className="App-header">
    

import getJSON from './test';

var data = getJSON('http://localhost:3000/api/data');


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <header>
          {data}
        </header>
        <p>
          Data Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
