///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//import React from 'react';
//import axios from 'axios';
import PropTypes from 'prop-types';

const LoadPointForecast = ({lon,lat}) => {
        let url_string = "http://tools.climatesmartfarming.org/runoff-risk/fcst-data/?lat="+lat+"&lon="+lon
        return fetch(url_string)
             .then(r => r.json())
             .then(data => {
               return (data) ? data : null;
             });
}

LoadPointForecast.propTypes = {
  lon: PropTypes.string.isRequired,
  lat: PropTypes.string.isRequired,
};

export default LoadPointForecast;
