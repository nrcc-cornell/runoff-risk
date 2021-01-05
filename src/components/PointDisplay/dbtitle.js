import React from 'react';
import PropTypes from 'prop-types';

class DashboardTitle extends React.Component {

  render() {
    let fcast_idx = this.props.pointData['fcstFlag'].indexOf('f')
    let year = this.props.pointData['dates'][fcast_idx].slice(0,4)
    let month = this.props.pointData['dates'][fcast_idx].slice(4,6)
    let day = this.props.pointData['dates'][fcast_idx].slice(6,8)

    return (
      <div className="dashboard-title">Nutrient Runoff Risk Forecast issued {month}-{day}-{year}</div>
    )
  }
}

DashboardTitle.propTypes = {
  pointData: PropTypes.object.isRequired,
};

export default DashboardTitle;
