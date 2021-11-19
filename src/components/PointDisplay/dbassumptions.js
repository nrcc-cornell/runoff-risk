import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class DashboardAssumptions extends Component {

  render() {

    let today_date = moment().format('M/D')

    return (
      <div id="turf-dashboard-location">
        <span className="location-assumptions-text">As of {today_date}, estimates of winter/non-winter conditions at your location include:</span>
	<br/><br/>
        {this.props.userSnow==='yes' &&
          <span className="location-assumptions-items">Snow depth &ge; 1".</span>
        }
        {this.props.userSnow==='no' &&
          <span className="location-assumptions-items">Very little or no snow cover (snow depth &lt; 1").</span>
        }
	<br/>
        {this.props.userSoilFzn==='yes' &&
          <span className="location-assumptions-items">Soil is frozen.</span>
        }
        {this.props.userSoilFzn==='no' &&
          <span className="location-assumptions-items">Soil is NOT frozen.</span>
        }
	<br/><br/>
        <span className="location-assumptions-text">{'These estimates are determined from observations in your area. However, local conditions can vary at field level.'}</span>
        <span className="location-assumptions-warning">{'If you are currently observing different conditions than those listed above, these forecasts should have limited influence on your decision making today.'}</span>
      </div>
    );
  }
}

DashboardAssumptions.propTypes = {
  pointData: PropTypes.object.isRequired,
  userSnow: PropTypes.string.isRequired,
  userSoilFzn: PropTypes.string.isRequired,
};

export default DashboardAssumptions;
