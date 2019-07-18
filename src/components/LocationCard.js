import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const Location = ({locationName}) => (
    <div className="location-point">
        {locationName}
    </div>
)

class LocationCard extends Component {
    static defaultProps = {
        zoom: 11
    };

    render() {
        return (
            <div className="location-card">
            <div style={{height: '400px', width: '400px' }}>
            <GoogleMapReact 
            bootstrapURLKeys={{ key: 'AIzaSyAQLZhlaVrL_En-NEXZNeExLU38LyPU_4M' }}
            defaultCenter={{lat: this.props.location.lat, lng: this.props.location.lng}}
            defaultZoom={this.props.zoom}
            >
            <Location lat={this.props.location.lat} lng={this.props.location.lng} locationName={this.props.location.name} />
            </GoogleMapReact>
            </div>
            <div>
                {this.props.location.name}
            </div>
            </div>
        )
    }
}

export default LocationCard;