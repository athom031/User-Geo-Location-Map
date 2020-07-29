import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

import styles from '../assets/GoogleMapStyles';
//import getData from './get';

const API = require('./../../../API');

export class Test extends React.Component { 
    render() {
        return (
            <Map
            google = {this.props.google}
            zoom = {5}
            style = {this.props.styles}
            initialCenter = {{
                lat: 37.09,
                lng: -95.712
            }}
            mapTypeControl = {false}
            disableDefaultUI = {true}
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: API
})(Test);