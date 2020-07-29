
import React from 'react';

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import googleMapStyles from "../assets/GoogleMapStyles";
import getData from "./../mapData/get";

import offlinePin from "./../image-svg/offlinePin.svg";
const API = require('../../../API');

export class Maps extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            coords: []
        }
    }

    setCoords = async () => { 
        let arr = await getData();

        this.setState({
            coords: arr
        });
    }


    render() {
        return (
            <div>
                <div 
                    style = {{
                        //marginTop:".5em",
                        height: "30em",
                        marginLeft: "12em",
                        marginRight: "12em",
                        marginBottom: "1em",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <dev{this.initMap}
                </div>
                <button type = "submit" className = "btn" onClick={this.setCoords}>
                    User Map Refresh
                </button>
            </div>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: API
})(Maps);
/*  
Maps.defaultProps = googleMapStyles;

export default GoogleApiWrapper({
    apiKey: API
})(Maps);
*/

/*
<Map
                        google = {this.props.google} 
                        zoom = {4}
                        //styles = {this.props.Style}
                        initialCenter={{
                            lat: 39.2, 
                            lng: -95.712 
                        }}
                        mapTypeControl = {false}
                        disableDefaultUI = {true}
                    >
                        <Marker position = {{ lat: 39.2, lng: -95.712 }} />                
                    </Map>
                    */
/*

<div 
                    style = {{
                        //marginTop:".5em",
                        height: "30em",
                        marginLeft: "12em",
                        marginRight: "12em",
                        marginBottom: "1em",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <Map
                        google = {this.props.google} 
                        zoom = {4}
                        //styles = {this.props.Style}
                        initialCenter={{
                            lat: 39.2, 
                            lng: -95.712 
                        }}
                        mapTypeControl = {false}
                        disableDefaultUI = {true}
                    >
                        <Marker 
                            position = {{ lat: 39.2, lng: -95.712 }} 
                            //icon = {offlinePin}
                        />                
                    </Map>
                </div>
*/








        /*
        return (
            <div 
                style = {{
                    marginTop:"1em",
                    height: "30em",
                    marginLeft: "12em",
                    marginRight: "12em",
                    marginBottom: "5em",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Map
                    google = {this.props.google} 
                    zoom = {4}
                    styles = {this.props.Style}
                    initialCenter={{
                        lat: 39.2, 
                        lng: -95.712 
                    }}
                    mapTypeControl = {false}
                    disableDefaultUI = {true}
                >
                    <Marker 
                        position = {{ lat: 39.2, lng: -95.712 }} 
                        //icon = {offlinePin}
                    />                
                </Map>
            </div>
        );
    }
    }
}
export default Maps;
*/
/*

Maps.defaultProps = googleMapStyles;

export default GoogleApiWrapper({
    apiKey: API
})(Maps);*/