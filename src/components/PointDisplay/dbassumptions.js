import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class DashboardAssumptions extends Component {

  render() {

    const cat = this.props.cat;
    let today_date = moment().format('M/D')
    let initSWE = this.props.pointData["initSWE"][0].toFixed(2)
    let initPrev24hrsPrecip = this.props.pointData["initPrev24hrsPrecip"][0].toFixed(2);
    let next72hrsPrecip = this.props.pointData["precip"].slice(1,4).reduce((sum, precip) => sum += precip, 0).toFixed(2);
    let userSoilSaturated = this.props.pointData["soilSaturationSfc10"][3] >= 0.8;

    console.log(
      'Category: ', cat,
      'Usersnow: ', this.props.userSnow,
      'UserSoilFxn: ', this.props.userSoilFzn,
      'prev 24hrs precip: ', initPrev24hrsPrecip,
      'next 72hrs precip: ', next72hrsPrecip,
      'next 72hrs soil sat: ', this.props.pointData["soilSaturationSfc10"][3],
      'userSoilSaturated: ', userSoilSaturated
    );

    return (
      <div id="turf-dashboard-location">
        <span className="location-assumptions-text">As of {today_date}, estimates of winter/non-winter conditions at your location include:</span>
        <br/>
        <br/>
        {cat >= 3 && this.props.userSnow==='yes' &&
          <div className="location-assumptions-items">Snow depth &ge; 1". (SWE = {initSWE} inches)</div>
        }
        {cat <= 3 && this.props.userSnow==='no' &&
          <div className="location-assumptions-items">Very little or no snow cover (snow depth &lt; 1").</div>
        }
        {cat >= 3 && this.props.userSoilFzn==='yes' &&
          <div className="location-assumptions-items">Soil is frozen (top 4 inches).</div>
        }
        {cat <= 3 && this.props.userSoilFzn==='no' &&
          <div className="location-assumptions-items">Soil is NOT frozen (top 4 inches).</div>
        }
        {cat >= 3 && userSoilSaturated &&
          <div className="location-assumptions-items">Soil Saturation (next 72 hours, sfc-10") = ≥80%</div>
        }
        {cat <= 3 && !userSoilSaturated &&
          <div className="location-assumptions-items">Soil Saturation (next 72 hours, sfc-10") = &lt;80%</div>
        }
        <div className="location-assumptions-items">Precipitation (previous 24 hours) = {initPrev24hrsPrecip} inches</div>
        <div className="location-assumptions-items">Precipitation (next 72 hours) = {next72hrsPrecip} inches</div>
        <br/>
        <span className="location-assumptions-text">{'These estimates are determined from observations in your area. However, local conditions can vary at field level.'}</span>
        <span className="location-assumptions-warning">{'If you are currently observing different conditions than those listed above, these forecasts should have limited influence on your decision making today.'}</span>
        <br/>
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
