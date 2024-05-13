import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class DashboardAssumptions extends Component {

  render() {

    console.log(this.props);
    let today_date = moment().format('M/D')
    let initSWE = this.props.pointData["initSWE"][0].toFixed(2)
    let initPrev24hrsPrecip = this.props.pointData["initPrev24hrsPrecip"][0].toFixed(2);
    let next72hrsPrecip = this.props.pointData["precip"].slice(1,4).reduce((sum, precip) => sum += precip, 0).toFixed(2);
    let userSoilSaturated = this.props.pointData["soilSaturationSfc10"][3] >= 0.8;

    console.log(this.props.userSnow, this.props.userSoilFzn, initPrev24hrsPrecip, next72hrsPrecip, this.props.pointData["soilSaturationSfc10"][3]);

    return (
      <div id="turf-dashboard-location">
        <span className="location-assumptions-text">As of {today_date}, estimates of winter/non-winter conditions at your location include:</span>
	<br/><br/>
        {this.props.userSnow==='yes' &&
          <span className="location-assumptions-items">Snow depth &ge; 1". (SWE = {initSWE} inches)</span>
        }
        {this.props.userSnow==='no' &&
          <span className="location-assumptions-items">Very little or no snow cover (snow depth &lt; 1").</span>
        }
	<br/>
        {this.props.userSoilFzn==='yes' &&
          <span className="location-assumptions-items">Soil is frozen (top 4 inches).</span>
        }
        {this.props.userSoilFzn==='no' &&
          <span className="location-assumptions-items">Soil is NOT frozen (top 4 inches).</span>
        }
	<br/>
        <span className="location-assumptions-items">Precipitation (previous 24 hours) = {initPrev24hrsPrecip} inches</span>
	<br/>
        <span className="location-assumptions-items">Precipitation (next 72 hours) = {next72hrsPrecip} inches</span>
	<br/>
        <span className="location-assumptions-items">Soil Saturation (next 72 hours, sfc-10") = {userSoilSaturated ? '≥' : '<'}80%</span>
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
