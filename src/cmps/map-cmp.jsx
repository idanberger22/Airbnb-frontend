import React, { Component } from 'react'

import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>

export class MapCmp extends Component {
    state = {
        center: {
            lat: this.props.stay.address.location.lan,
            lng: this.props.stay.address.location.lat
        },
        zoom: 15
    };

    render() {
        return (
            <div className='map-container'>
                <div className='map' style={{ height: '40vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyCefItHyzOVLUAS0G1QzyoRhd0uEHy-TIA' }}
                        defaultCenter={this.state.center}
                        defaultZoom={this.state.zoom}
                        center={this.state.center}
                        zoom={this.state.zoom}
                    >
                        <AnyReactComponent
                            lat={this.props.stay.address.location.lan}
                            lng={this.props.stay.address.location.lat}
                            text={<span style={{ color: '#DD2162' }} className="material-icons">home</span>}

                        />
                    </GoogleMapReact>
                </div>

            </div>
        )
    }
}

