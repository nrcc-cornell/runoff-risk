import React from 'react';
import PropTypes from 'prop-types';
import DashboardDates from './dbdates.js';
import DashboardLegend from './dblegend.js';

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

  convertRiskPercToRiskCat(p) {
      let cat=null
      if (p>100 && p<=112) {cat = 0};
      if (p>=0 && p<25) {cat = 1};
      if (p>=25 && p<50) {cat = 2};
      if (p>=50 && p<75) {cat = 3};
      if (p>=75 && p<101) {cat = 4};
      if (p>=112 && p<=125) {cat = 5};
      return cat
  }

  createRiskCategories = (perc_array) => {
    return perc_array.map(x => this.convertRiskPercToRiskCat(x))
  }

  //convertRiskPercToRiskCat(perc_array) {
  //  let riskCat = perc_array
  //    .filter(x => x>=0 && x<=120)
  //    .map(x => {
  //      if (x>100 && x<=110) {return 0};
  //      if (x>=0 && x<25) {return 1};
  //      if (x>=25 && x<50) {return 2};
  //      if (x>=50 && x<75) {return 3};
  //      if (x>=75 && x<=100) {return 4};
  //      if (x>=110 && x<=120) {return 5};
  //    })
  //  return riskCat;
  //}

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
