import React from 'react';
import PropTypes from 'prop-types';

import "../../styles/dashboard.css";
import ThreatColumnChart from './dbchart.js';
import ThreatDashboardTable from './dbtable.js';
import DashboardLocation from './dblocation.js';
import DashboardTitle from './dbtitle.js';

class PointDisplay extends React.Component {

  shouldComponentUpdate(nextProps) {
    return (this.props.pointData !== nextProps.pointData);
  }

  render() {
    return (
      <div id="turf-dashboard">
        <div id="turf-dashboard-elements">
          {this.props.pointData &&
            <DashboardLocation locationText={this.props.locationText} pointData={this.props.pointData} initLocation={this.props.initLocation} /> }
          {this.props.pointData &&
            <DashboardTitle pointData={this.props.pointData} /> }
          <ThreatDashboardTable pointData={this.props.pointData} />
          <div>&nbsp;</div>
          <ThreatColumnChart pointData={this.props.pointData} />
          <div>&nbsp;</div>
        </div>
      </div>
    )
  }
}

PointDisplay.propTypes = {
  initLocation: PropTypes.func.isRequired,
  pointData: PropTypes.object.isRequired,
  locationText: PropTypes.string,
};

export default PointDisplay;

