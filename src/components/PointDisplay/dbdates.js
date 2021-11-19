import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class DashboardDates extends React.Component {

  render() {
    let today_date = moment().format('MM-DD')
    let year = parseInt(this.props.pointData['dates'][0].slice(0,4),10)
    let month = parseInt(this.props.pointData['dates'][0].slice(4,6),10)
    let day = parseInt(this.props.pointData['dates'][0].slice(6,8),10)
    let first_valid = [year,month-1,day]

    let fcast_idx = this.props.pointData['fcstFlag'].indexOf('f')
    let indexes = []
    for (const [i, v] of this.props.pointData['fcstFlag'].entries()) {
      if (v==='f') { indexes.push(i) }
    }

    return (
      <tr id="dashboard-dates" className="dates">
        <th className="series-name dates">Dates</th>
        <td className="series-dates">
          { indexes.map(function(idx) {
            let key_str = 'date' + idx.toString();
            let the_date = moment(first_valid).add(idx,'d').format('MM-DD');
            if (idx < fcast_idx) {
              if (the_date===today_date) {
                return <span key={key_str} className={'date obs'}>{'Today'}</span>;
              } else {
                return <span key={key_str} className={'date obs'}>{the_date}</span>;
              }
            } else { 
              if (the_date===today_date) {
                return <span key={key_str} className={'date fcast'}>{'Today'}</span>;
              } else {
                return <span key={key_str} className={'date fcast'}>{the_date}</span>;
              }
            }
          }) }
        </td>
      </tr>
    )
  }
}

DashboardDates.propTypes = {
  pointData: PropTypes.object.isRequired,
};

export default DashboardDates;
