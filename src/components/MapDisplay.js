import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
//import '../styles/mapLegend.css';
import PropTypes from 'prop-types';
//import ls from 'local-storage';
import Grid from '@material-ui/core/Grid';
//import ReactHtmlParser from 'react-html-parser';

import React, {Component} from 'react';
//import MapGL, {NavigationControl, Popup} from 'react-map-gl';
import MapGL, {NavigationControl, Popup} from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import mapboxgl from 'mapbox-gl';

import Button from '@material-ui/core/Button';

import MapLegend from './MapLegend';

// fix based on https://github.com/mapbox/mapbox-gl-js/issues/10173
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

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
        //selectionConfirmed: ls('RUNOFFRISK.lon') ? true : false,
        //selectionConfirmed: false,
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
      let public_url = process.env.PUBLIC_URL
      this.setState({
        //add value at end of string to try and eliminate caching
        imgsrc: public_url+'/fcst_map_images/NY_RRAF_'+this.props.variable+'_'+this.props.date.slice(4,8)+this.props.date.slice(0,4)+'.png?'+this.props.dateFcstInit
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.date!==this.props.date || prevProps.dateFcstInit!==this.props.dateFcstInit || prevProps.variable!==this.props.variable) {
      let public_url = process.env.PUBLIC_URL
      this.setState({
        //add value at end of string to try and eliminate caching
        imgsrc: public_url+'/fcst_map_images/NY_RRAF_'+this.props.variable+'_'+this.props.date.slice(4,8)+this.props.date.slice(0,4)+'.png?'+this.props.dateFcstInit
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

    //this.handleSelectionConfirmed(false);
    this.props.handlePointChange(viewport.latitude,viewport.longitude);
    this.props.handleViewportChange(viewport_updated)
  }

  handleMapClick = (e) => {
      //console.log('map click');
      //console.log(e.lngLat);
      this.props.handleSelectionConfirmed(false);
      this.props.handlePointChange(e.lngLat[1],e.lngLat[0]);
      let viewport_updated = {
        ...this.props.viewport,
        ...{latitude:e.lngLat[1],longitude:e.lngLat[0],zoom:14},
      }
      this.props.handleViewportChange(viewport_updated)
  }

  //handleSelectionConfirmed = (b) => {
  //    this.setState({
  //      selectionConfirmed: b
  //    })
  //}

  handleSaveLocation = () => {
      this.props.handleSelectionConfirmed(true);
      this.props.handleViewportChange({'zoom':6});
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

  onChangeClick = () => {
    this.props.initLocation()
  }

  render() {
    //const { classes } = this.props;
    const {imgsrc, imgcoords} = this.state;
    const idxLocationTextEnd = (this.props.locationText) ? this.props.locationText.indexOf(', New York') : null
    const locationText = (idxLocationTextEnd) ? this.props.locationText.slice(0,idxLocationTextEnd) : null
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
        onClick={(event) => { !this.props.selectionConfirmed &&
            this.handleMapClick(event)
        }}
      >
        { !this.props.selectionConfirmed &&
        <div className="geo" style={geocoderStyle}>
          <Geocoder
            mapRef={this.mapRef}
            containerRef={this.geocoderContainerRef}
            placeholder='Type address / click map'
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
        }
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
          closeOnClick={true}
          captureClick={true}
          anchor='top'
        >
          { !this.props.selectionConfirmed &&
          <div>
            <b>Options:</b><br/>1. Continue Fine-tuning selection<br/>-OR-<br/>2.&nbsp;
                  <Button
                    variant="contained" color="primary" size="small"
                    onClick={() => this.handleSaveLocation()}
                  >
                    Save This Location
                  </Button>
          </div>
          }
          { this.props.selectionConfirmed &&
          <Grid container direction="column" justify="center" alignItems="center">
            <b>Selected location details:</b>
            {locationText}<br/>
            Lon: {this.props.lon.toFixed(4)}, Lat: {this.props.lat.toFixed(4)}
            <br/><br/>
            <Button variant="contained" color="primary" size="small" onClick={this.onChangeClick}>
              Clear Selection
            </Button>
          </Grid>
          }
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
  locationText: PropTypes.string,
  selectionConfirmed: PropTypes.bool.isRequired,
  viewport: PropTypes.object.isRequired,
  variable: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  dateFcstInit: PropTypes.string.isRequired,
  initLocation: PropTypes.func.isRequired,
  handlePointChange: PropTypes.func.isRequired,
  handleSelectionConfirmed: PropTypes.func.isRequired,
  handleViewportChange: PropTypes.func.isRequired,
  handleGeocoderLocationChange: PropTypes.func.isRequired,
};

export default MapDisplay;
