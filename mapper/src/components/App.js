import React from 'react';
import Maps from './Maps';

import './App.scss';

import logo from './../image-svg/logo.svg';


function App() {
    return(
        <div className="App">
            <div className="Title">
                <div className="Logo">
                    <img src={logo}/>
                </div>
                <div className="Name-Container">
                    <div className="Name">
                        User Visualization
                    </div>
                </div>
               
            </div>
            <div className="Map-Container">
                <Maps />
            </div>
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        </div>
        
    );
}


export default App;
