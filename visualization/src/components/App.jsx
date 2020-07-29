import React from 'react';
import MapContainer from './Map';

import './styles/App.scss';

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
                <MapContainer/>
            </div>
        </div>
        
    );
}


export default App;