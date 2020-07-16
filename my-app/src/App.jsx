import React from 'react';
import './App.scss';
import { Form } from './components/Form';

function App() {
  return (
    <div className="App">
      <div className = "login">
        <div className="container">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
