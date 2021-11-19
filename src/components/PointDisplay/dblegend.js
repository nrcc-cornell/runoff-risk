import React from 'react';

class DashboardLegend extends React.Component {

  render() {
    let legend = {
      'classes': ['no_risk','low','moderate','high',' ','no_risk_fzn','high_fzn'],
      'labels': ['NRE*','Low','Moderate','High',' ','NRE* (FZN)','High (FZN)'],
    }

    return (
      <div className="dashboard-element-legend">
        { legend.classes.map(function(value,i) {
          let class_str = 'legend-circle ' + value;
          let label = legend.labels[i];
          let key_str = 'legend' + i.toString();
          return <span key={key_str}><span className={class_str}></span>{label}</span>;
        }) }
      </div> 
    )
  }
}

export default DashboardLegend;
