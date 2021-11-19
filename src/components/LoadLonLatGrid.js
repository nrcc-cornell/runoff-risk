///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import PropTypes from 'prop-types';

let public_url = process.env.PUBLIC_URL

const LoadLonLatGrid = ({dateFcstInit}) => {
        return fetch(public_url + "/data/ll_jsons/ll_grid.json?"+dateFcstInit)
             .then(r => r.json())
             .then(data => {
               return (data) ? data : null;
             });
}

LoadLonLatGrid.propTypes = {
  dateFcstInit: PropTypes.string.isRequired,
};

export default LoadLonLatGrid;
