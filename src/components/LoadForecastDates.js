///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import PropTypes from 'prop-types';

let public_url = 'https://runoff-risk.nrcc.cornell.edu/ny'
// let public_url = process.env.PUBLIC_URL

const LoadForecastDates = ({dateFcstInit}) => {
        return fetch(public_url + "/data/fcst_dates.json?"+dateFcstInit)
             .then(r => r.json())
             .then(data => {
               return (data) ? data : null;
             });
}

LoadForecastDates.propTypes = {
  dateFcstInit: PropTypes.string.isRequired,
};

export default LoadForecastDates;
