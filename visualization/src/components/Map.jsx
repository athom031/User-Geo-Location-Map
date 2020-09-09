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
            coords:  [],
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},         //Shows the infoWindow to the selected place upon a marker
            field: null
        }

    }
    
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    setCoords = () => { 
        getData()
            .then((message) => {
                this.setState({
                    coords: message
                });
            })
            .catch((message) => {
                console.log(message);
                this.setState({
                    coords: []
                });
            });
    }

    displayMarkers = () => {
        return this.state.coords.map((coord, index) => {
            let info = `${coord.fullName} (${coord.userName}) is ${coord.online ? 'online' : 'offline'}.`
        
            return <Marker key={index} id={index} position={{
                    lat: coord.latCoord,
                    lng: coord.lngCoord
                }}
                icon = {{
                    url: (coord.online) ? 
                        "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" 
                        : 
                        "http://labs.google.com/ridefinder/images/mm_20_gray.png"
                }}
                onClick={this.onMarkerClick}
                name = {info}
            />
        })
    }

    render() {
        return (
            <div className = "map-object">
                <div className = "map" style = {{
                        marginTop:".5em",
                        height: "25em",
                        marginLeft: "8em",
                        marginRight: "8em",
                        position: "relative"
                    }}
                >
                    <Map
                        google={this.props.google}
                        zoom={4}
                        styles={customMapStyle}
                        initialCenter={{
                            lat: 39.2,
                            lng: -95.712
                        }}
                        mapTypeControl = {false}
                        disableDefaultUI = {true}
                    >
                        {this.displayMarkers()}
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}
                        >
                            <h4>
                                {this.state.selectedPlace.name}
                            </h4>
                        </InfoWindow>
                    </Map>
                </div>
                
                <div className = "buttonContainer">
                    <button type = "submit" className = "btn" onClick={this.setCoords}>
                            Map Refresh
                    </button>
                </div>

                <div className = "User Info"> 
                    {this.state.field}
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: API
})(MapContainer);


