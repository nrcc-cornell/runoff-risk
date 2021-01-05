import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
//import '../styles/mapLegend.css';
import PropTypes from 'prop-types';
//import ls from 'local-storage';

import React, {Component} from 'react';
//import MapGL, {MapController, NavigationControl, Popup} from 'react-map-gl';
import MapGL, {NavigationControl, Popup} from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
//import Button from '@material-ui/core/Button';

import MapLegend from './MapLegend';

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
  left: 0,
  padding: '10px'
};

//class CustomMapController extends MapController {
//  _onClick(event) {
//    // ignore click on geocoder input
//    if (!this._isGeocoderInputNode(event.target)) {
//      return;
//    }
//
//    //super._onClick(event);
//  }
//
//  _isGeocoderInputNode(node) {
//    return node.classList.contains("mapboxgl-ctrl-geocoder--input");
//  }
//}
//
//const customMapController = new CustomMapController();

class MapDisplay extends Component {

  constructor(props) {
      super(props);
      this.state = {
        //coordinates: ls('RUNOFFRISK.lon') ? [ls('RUNOFFRISK.lon'),ls('RUNOFFRISK.lat')] : [-76.5,42.5],
        //popupIsVisible: ls('RUNOFFRISK.lon') ? true : false,
        imgsrc: null,
        imgcoords: [
          [-79.95970329697062, 46.54645497007963],
          [-69.66501014096089, 46.54645497007963],
          [-69.66501014096083, 39.33905737461734],
          [-79.95970329697053, 39.3390573746173]
        ]
      };
  }

  componentDidMount() {
    if (this.props.date && this.props.dateFcstInit && this.props.variable) {
      this.setState({
        //imgsrc: 'http://tools.climatesmartfarming.org/runoff-risk/static/NY_RRAF_'+this.props.variable+'_'+this.props.date.slice(4,8)+this.props.date.slice(0,4)+'.png'
        //add value at end of string to try and eliminate caching
        imgsrc: 'http://tools.climatesmartfarming.org/runoff-risk/static/NY_RRAF_'+this.props.variable+'_'+this.props.date.slice(4,8)+this.props.date.slice(0,4)+'.png?'+this.props.dateFcstInit
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.date!==this.props.date || prevProps.dateFcstInit!==this.props.dateFcstInit || prevProps.variable!==this.props.variable) {
      this.setState({
        //imgsrc: 'http://tools.climatesmartfarming.org/runoff-risk/static/NY_RRAF_'+this.props.variable+'_'+this.props.date.slice(4,8)+this.props.date.slice(0,4)+'.png'
        //add value at end of string to try and eliminate caching
        imgsrc: 'http://tools.climatesmartfarming.org/runoff-risk/static/NY_RRAF_'+this.props.variable+'_'+this.props.date.slice(4,8)+this.props.date.slice(0,4)+'.png?'+this.props.dateFcstInit
      })
    }
  }

  //mapRef = React.createRef()
  geocoderContainerRef = React.createRef()
  mapRef = React.createRef()

  // override geocoder defaults, if necessary
  handleGeocoderViewportChange = (viewport) => {
    let geocoderDefaultOverrides = { transitionDuration: 1000 }
    let viewport_updated = {
      ...viewport,
      ...geocoderDefaultOverrides
    }

    this.props.handlePointChange(viewport.latitude,viewport.longitude);
    this.props.handleViewportChange(viewport_updated)
  }

  handleMapClick = (e) => {
      //console.log('map click');
      //console.log(e.lngLat);
      this.props.handlePointChange(e.lngLat[1],e.lngLat[0]);
      let viewport_updated = {
        ...this.props.viewport,
        ...{latitude:e.lngLat[1],longitude:e.lngLat[0],zoom:14},
      }
      this.props.handleViewportChange(viewport_updated)
  }

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

  mapStyleSatellite = () => {
    return 'mapbox://styles/mapbox/satellite-streets-v11'
  };

  render() {
    const {imgsrc, imgcoords} = this.state;
    return (
      <div>
      <div
        ref={this.geocoderContainerRef}
        style={{ position: "absolute", top: 20, left: 60, zIndex: 1 }}
      />
      <MapGL
        ref={this.mapRef}
        {...this.props.viewport}
        width='100%'
        height='70vh'
        mapStyle={(this.props.viewport.zoom>=11) ? this.mapStyleSatellite() : this.mapStyle(imgsrc,imgcoords)}
        mapboxApiAccessToken={TOKEN}
        onViewportChange={this.props.handleViewportChange}
        onClick={(event) => {
          this.handleMapClick(event)
        }}
      >
        <div className="geo" style={geocoderStyle}>
          <Geocoder
            mapRef={this.mapRef}
            containerRef={this.geocoderContainerRef}
            placeholder='Find address or location'
            proximity={{'longitude':-76.5,'latitude':42.5}}
            clearOnBlur={true}
            countries='us'
            onViewportChange={this.handleGeocoderViewportChange}
            //onLoading={this.handleGeocoderLoading}
            //onResults={this.handleGeocoderResults}
            onResult={this.props.handleGeocoderLocationChange}
            mapboxApiAccessToken={TOKEN}
          />
        </div>
        <div className="nav" style={navStyle}>
          <NavigationControl showCompass={false} />
        </div>
        { this.props.viewport.zoom<11 && this.props.variable &&
          <MapLegend variable={this.props.variable} />
        }
        {this.props.lon && this.props.lat &&
        <Popup
          longitude={this.props.lon}
          latitude={this.props.lat}
          closeButton={false}
          closeOnClick={false}
          anchor='top'
        >
          <div>
            Selected:<br/>{this.props.lon.toFixed(3)},{this.props.lat.toFixed(3)}
          </div>
        </Popup>
        }
      </MapGL>
      </div>
    );
  }
}

MapDisplay.propTypes = {
  lon: PropTypes.number,
  lat: PropTypes.number,
  viewport: PropTypes.object.isRequired,
  variable: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  dateFcstInit: PropTypes.string.isRequired,
  handlePointChange: PropTypes.func.isRequired,
  handleViewportChange: PropTypes.func.isRequired,
  handleGeocoderLocationChange: PropTypes.func.isRequired,
};

export default MapDisplay;
