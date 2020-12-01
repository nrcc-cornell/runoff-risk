import 'mapbox-gl/dist/mapbox-gl.css';
//import 'react-map-gl/node_modules/mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import MapGL, {NavigationControl, Popup} from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'

//import GridData from './assets/GridData.png'
import GridData from '../assets/ny_daily_runoff_risk_20200308.png'

const TOKEN = 'pk.eyJ1IjoiYm5iMiIsImEiOiJjazJtYTgwajQwZnFiM29waGo4NHI1MWpnIn0.Xmb6eYeJArqqBQtKkWorUQ'

const navStyle = {
  position: 'absolute',
  top: 10,
  left: 0,
  padding: '10px'
};

const geocoderStyle = {
  position: 'absolute',
  top: 10,
  left: 60,
  padding: '10px'
};

class MapDisplay extends Component {

  constructor(props) {
      super(props);
      this.state = {
        viewport: {
          longitude: -76.5,
          latitude: 42.5,
          zoom: 6.2
        },
        coordinates: [-76.5,42.5],
        popupIsVisible: false,
        imgsrc: GridData,
        imgcoords: [
          [-79.95970329697062, 46.54645497007963],
          [-69.66501014096089, 46.54645497007963],
          [-69.66501014096083, 39.33905737461734],
          [-79.95970329697053, 39.3390573746173]
        ]
      };
  }

  mapRef = React.createRef()
  //geocoderContainerRef = React.createRef()

  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  // override geocoder defaults, if necessary
  handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 }

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }

  handleMouseMove = (e) => {
      this.setState({
        coordinates: e.lngLat,
        popupIsVisible: true
      })
  }

  handleMouseOut = (e) => {
      this.setState({
        popupIsVisible: false
      })
  }

  handleMapClick = (e) => {
      //console.log('map click');
      //console.log(e.lngLat);
      this.props.handlePointChange(e.lngLat[1],e.lngLat[0]);
  }

  handleGeocoderLoading = (e) => {
      //console.log('geocoder loading');
      this.setState({
        popupIsVisible: false
      })
  }

  handleGeocoderResults = (e) => {
      //console.log('geocoder results');
      this.setState({
        popupIsVisible: true
      })
  }

  //handleGeocoderClick = (e) => {
  //    console.log('geocoder click');
  //    console.log(e.lngLat);
  //}

  mapStyle = (imgsrc,imgcoords) => {
    return ({
    'version': 8,
    'sources': {
      'mapbox': {
        'type': 'vector',
        'url': 'mapbox://mapbox.mapbox-streets-v8'
      },
      'overlay': {
        'type': 'image',
        'url': imgsrc,
        'coordinates': imgcoords,
      }
    },
    'layers': [
      {
        'id': 'water',
        'source': 'mapbox',
        'source-layer': 'water',
        'type': 'fill',
        'paint': { 'fill-color': '#2c2c2c' }
      },
      {
        'id': 'boundaries',
        'source': 'mapbox',
        'source-layer': 'admin',
        'type': 'line',
        //'paint': {
        //  'line-color': '#797979',
        //  'line-dasharray': [2, 2, 6, 2]
        //},
        //'filter': ['all', ['==', 'maritime', 0]]
      },
      {
        'id': 'overlay',
        'source': 'overlay',
        'type': 'raster',
        'paint': { 'raster-opacity': 0.85 }
      }
    ]
    })
  };

  render() {
    const {viewport, coordinates, popupIsVisible, imgsrc, imgcoords} = this.state;
    return (
      <div>
      <MapGL
        ref={this.mapRef}
        {...viewport}
        width='100%'
        height='70vh'
        mapStyle={this.mapStyle(imgsrc,imgcoords)}
        mapboxApiAccessToken={TOKEN}
        onViewportChange={this.handleViewportChange}
        onMouseMove={(event) => {
          this.handleMouseMove(event)
        }}
        onMouseOut={(event) => {
          this.handleMouseOut(event)
        }}
        onClick={(event) => {
          this.handleMapClick(event)
        }}
      >
        <div className="geo" style={geocoderStyle}>
          <Geocoder
            mapRef={this.mapRef}
            captureClick={true}
            position='top-right'
            placeholder='Find address or location'
            proximity={{'longitude':-76.5,'latitude':42.5}}
            onViewportChange={this.handleGeocoderViewportChange}
            //onLoading={this.handleGeocoderLoading}
            //onResults={this.handleGeocoderResults}
            mapboxApiAccessToken={TOKEN}
          />
        </div>
        <div className="nav" style={navStyle}>
          <NavigationControl showCompass={false} />
        </div>
        {popupIsVisible &&
        <Popup
          longitude={coordinates[0]}
          latitude={coordinates[1]}
          closeButton={false}
          closeOnClick={false}
          anchor='top'
        >
          <div>
            Lon:{coordinates[0].toFixed(3)}<br/>Lat:{coordinates[1].toFixed(3)}
          </div>
        </Popup>
        }
      </MapGL>
      </div>
    );
  }
}

MapDisplay.propTypes = {
  handlePointChange: PropTypes.func.isRequired,
};

export default MapDisplay;
