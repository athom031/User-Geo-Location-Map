import React, { Component } from 'react';

import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import API from '../../../API';
import customMapStyle from './styles/MapStyles';
import './styles/Map.scss';

import getData from "./userData/get";

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coords:  []
        }
    }


    setCoords = async () => { 
        let arr = await getData();

        this.setState({
            coords: arr
        });
    }

    displayMarkers = () => {
        return this.state.coords.map((coord, index) => {
            return <Marker key={index} id={index} position={{
                lat: coord[1],
                lng: coord[2]
            }}
            
            onClick={() => {
                let str = coord[3] ? ' is online.' : ' is offline.'; 
                console.log(coord[0] + str)}
            }/>
        })
    }

    render() {
        return (
            <div className = "map-object">
                <div className = "map" style = {{
                        marginTop:".5em",
                        height: "30em",
                        marginLeft: "12em",
                        marginRight: "12em",
                        marginBottom: "1em",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <Map
                        google={this.props.google}
                        zoom={4.5}
                        styles={customMapStyle}
                        initialCenter={{
                            lat: 39.2,
                            lng: -95.712
                        }}
                        mapTypeControl = {false}
                        disableDefaultUI = {true}
                    >
                        {this.displayMarkers()}
                    </Map>
                </div>
                
                <div className = "buttonContainer">
                    <button type = "submit" className = "btn" onClick={this.setCoords}>
                            Map Refresh
                    </button>
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: API
})(MapContainer);


