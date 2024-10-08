import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import red from '@material-ui/core/colors/red';


const styles = theme => ({
  button: {
    color: red[500],
  },
});

class DashboardSummary extends React.Component {
  convertRiskCatToText(c,d) {
    let txtRisk = ''
    if (c===0) {txtRisk = 'LITTLE/NO RUNOFF RISK'}
    if (c===1) {txtRisk = 'LITTLE/NO RUNOFF RISK'}
    if (c===2) {txtRisk = 'LOW RISK'}
    if (c===3) {txtRisk = 'MODERATE RISK'}
    if (c===4) {txtRisk = 'HIGH RISK'}
    if (c===5) {txtRisk = 'HIGH RISK'}
    let date1 = parseInt(d[0].slice(4,6),10).toString()+'/'+parseInt(d[0].slice(6,8),10).toString()
    let date2 = parseInt(d[1].slice(4,6),10).toString()+'/'+parseInt(d[1].slice(6,8),10).toString()
    let date3 = parseInt(d[2].slice(4,6),10).toString()+'/'+parseInt(d[2].slice(6,8),10).toString()
    //let summaryTxt = '72-Hr Runoff Risk through '+d.slice(0,4)+'-'+d.slice(4,6)+'-'+d.slice(6,8)+' : '
    let summaryTxt = '72-Hr Runoff Risk ('+date1+', '+date2+', '+date3+') *'
    return {'summaryTxt':summaryTxt, 'riskTxt':txtRisk, 'categoryValue':c}
  }

  render() {
    let fcast_dates = [this.props.pointData['dates'][this.props.today_idx], this.props.pointData['dates'][this.props.today_idx+1], this.props.pointData['dates'][this.props.today_idx+2]]
    let summaryObj = {}
    summaryObj = this.convertRiskCatToText(this.props.cat,fcast_dates)

    return (
      <Grid container direction="column" justify="center" alignItems="center">
          <div id="turf-dashboard-summary">
            <span className="summary-text">{summaryObj['summaryTxt']}</span>
            <br/>
            { summaryObj['categoryValue']===0 && <span className="summary-risk-text no-risk-fzn">{summaryObj['riskTxt']}</span> }
            { summaryObj['categoryValue']===1 && <span className="summary-risk-text no-risk">{summaryObj['riskTxt']}</span> }
            { summaryObj['categoryValue']===2 && <span className="summary-risk-text low-risk">{summaryObj['riskTxt']}</span> }
            { summaryObj['categoryValue']===3 && <span className="summary-risk-text moderate-risk">{summaryObj['riskTxt']}</span> }
            { summaryObj['categoryValue']===4 && <span className="summary-risk-text high-risk">{summaryObj['riskTxt']}</span> }
            { summaryObj['categoryValue']===5 && <span className="summary-risk-text high-risk-fzn">{summaryObj['riskTxt']}</span> }
            <br/>
            <span className="summary-fcst-time-note">{'* NOTE : Forecasts are updated ~ 6:30am ET daily'}</span>
          </div>
      </Grid>
    )
  }
}

DashboardSummary.propTypes = {
  pointData: PropTypes.object.isRequired,
};

//export default DashboardLocation;
export default withStyles(styles)(DashboardSummary);
