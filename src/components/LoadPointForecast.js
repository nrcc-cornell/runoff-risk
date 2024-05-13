///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//import React from 'react';
//import axios from 'axios';
import PropTypes from 'prop-types';

let public_url = 'https://runoff-risk.nrcc.cornell.edu/ny'
// let public_url = process.env.PUBLIC_URL

const LoadPointForecast = ({idxLon,idxLat,dateFcstInit}) => {
        //let url_string = "http://tools.climatesmartfarming.org/runoff-risk/fcst-data/?lat="+lat+"&lon="+lon
        //return fetch(url_string)
        return fetch(public_url + "/data/pixel_data_jsons/"+idxLat+"_data.json?"+dateFcstInit)
             .then(r => r.json())
             .then(data => {
               return (data) ? data[idxLon] : null;
             });
}

LoadPointForecast.propTypes = {
  idxLon: PropTypes.string.isRequired,
  idxLat: PropTypes.string.isRequired,
  dateFcstInit: PropTypes.string.isRequired,
};

export default LoadPointForecast;
