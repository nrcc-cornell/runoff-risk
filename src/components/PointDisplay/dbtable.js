import React from 'react';
import PropTypes from 'prop-types';
import DashboardDates from './dbdates.js';
import DashboardLegend from './dblegend.js';

import convertRiskPercToRiskCat from './convertRiskPercToRiskCat';

class DailyDataComponent extends React.Component {

  render() {
    let data = this.props.riskData
    let risk_categories = ['no_risk_fzn','no_risk','low','moderate','high','high_fzn'];

    let fcast_idx = this.props.pointData['fcstFlag'].indexOf('f')
    let indexes = []
    for (const [i, v] of this.props.pointData['fcstFlag'].entries()) {
      if (v==='f') { indexes.push(i) }
    }

    return (
      <tr id="daily-data" className="row_1">
        <th className="series-name data">{this.props.seriesName}</th>
        <td className="series-data">
          { indexes.map(function(idx) {
            let key_str = 'daily' + idx.toString();
            let class_str = 'data ' + risk_categories[data[idx]];
            if (idx < fcast_idx) { class_str = class_str + ' obs';
            } else { class_str = class_str + ' fcast'; }
            return <span key={key_str} className={class_str}>&nbsp;</span>;
          }) }
        </td>
      </tr>
    )
  }
}


class ThreatDashboardTable extends React.Component {
  createRiskCategories = (perc_array) => {
    return perc_array.map(x => convertRiskPercToRiskCat(x))
  }

  render () {

    return (
      <div className="turf-dashboard-element">
        <div className="dashboard-element-header">
          <DashboardLegend />
        </div>
        <table className="turf-dashboard-table" cellPadding="0" cellSpacing="0">
        <tbody>
          <DailyDataComponent
            pointData={this.props.pointData}
            riskData={this.createRiskCategories(this.props.pointData['riskWinter72hr'])}
            seriesName='72-hr Risk'
          />
          <DailyDataComponent
            pointData={this.props.pointData}
            riskData={this.createRiskCategories(this.props.pointData['riskWinter'])}
            seriesName='Daily Risk'
          />
          <DashboardDates pointData={this.props.pointData} />
        </tbody>
        </table>
      </div>
    )
  }
}

ThreatDashboardTable.propTypes = {
  pointData: PropTypes.object.isRequired,
};

export default ThreatDashboardTable;
