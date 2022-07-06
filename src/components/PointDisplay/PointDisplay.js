import React from 'react';
import PropTypes from 'prop-types';

import "../../styles/dashboard.css";
import ThreatColumnChart from './dbchart.js';
import ThreatDashboardTable from './dbtable.js';
import DashboardLocation from './dblocation.js';
import DashboardSummary from './dbsummary.js';
import DashboardAssumptions from './dbassumptions.js';
import DashboardTitle from './dbtitle.js';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from "@material-ui/core/Grid";

import {HelpToolFcst72hr, HelpToolFcstDetails} from "../HelpToolContent";
import HelpToolPopover from "../HelpToolPopover";

class PointDisplay extends React.Component {

  getDetailsButtonText() {
    let text = ''
    if (this.props.detailView) { text = '- Hide Details' }
    if (!this.props.detailView) { text = '+ Show Details' }
    return text
  }

  getAssumptionsButtonText() {
    let text = ''
    if (this.props.assumptionsView) { text = '- Hide Assumptions' }
    if (!this.props.assumptionsView) { text = '+ Show Assumptions' }
    return text
  }

  shouldComponentUpdate(nextProps) {
    return (this.props.pointData !== nextProps.pointData) || (this.props.detailView !== nextProps.detailView) || (this.props.assumptionsView !== nextProps.assumptionsView) || (this.props.userSnow !== nextProps.userSnow) || (this.props.userSoilFzn !== nextProps.userSoilFzn);
  }

  render() {
    return (
      <div id="turf-dashboard">
        <div id="turf-dashboard-elements">
          {this.props.lon && this.props.lat && this.props.pointData && this.props.userSnow &&
            <div>
            { window.innerWidth > 500 &&
            <DashboardLocation lon={this.props.lon} lat={this.props.lat} locationText={this.props.locationText} pointData={this.props.pointData} initLocation={this.props.initLocation} userSnow={this.props.userSnow} userSnowChange={this.props.userSnowChange} userSoilFzn={this.props.userSoilFzn} userSoilFznChange={this.props.userSoilFznChange}/>
            }
            { window.innerWidth > 500 &&
            <Divider variant="middle" />
            }
            <DashboardSummary pointData={this.props.pointData} />
            <Grid container item spacing={1} direction="row" justify="center" alignItems="center">
              <Grid item>
                <Button variant="contained" color="primary" size="small" onClick={this.props.updateAssumptionsView}>
                  {this.getAssumptionsButtonText()}
                </Button>
              </Grid>
              <Grid item>
                <HelpToolPopover content={<HelpToolFcst72hr/>} />
              </Grid>
            </Grid>
            {this.props.assumptionsView &&
              <DashboardAssumptions pointData={this.props.pointData} userSnow={this.props.userSnow} userSoilFzn={this.props.userSoilFzn} />
            }
            <br/>&nbsp;
            <Divider variant="middle" />
            <br/>
            <DashboardTitle pointData={this.props.pointData} />
            <ThreatDashboardTable pointData={this.props.pointData} />
            <div><span className='nre-note'>*NRE: Little/No Runoff Expected &nbsp;</span></div>
            <Grid container item spacing={1} direction="row" justify="center" alignItems="center">
              <Grid item>
                <Button variant="contained" color="primary" size="small" onClick={this.props.updateDetailView}>
                  {this.getDetailsButtonText()}
                </Button>
              </Grid>
              <Grid item>
                <HelpToolPopover content={<HelpToolFcstDetails/>} />
              </Grid>
            </Grid>
            </div>
          }
          {this.props.detailView &&
            <ThreatColumnChart pointData={this.props.pointData} />
          }
          <div>&nbsp;</div>
        </div>
      </div>
    )
  }
}

PointDisplay.propTypes = {
  lon: PropTypes.string.isRequired,
  lat: PropTypes.string.isRequired,
  initLocation: PropTypes.func.isRequired,
  pointData: PropTypes.object.isRequired,
  locationText: PropTypes.string,
  assumptionsView: PropTypes.bool.isRequired,
  updateAssumptionsView: PropTypes.func.isRequired,
  detailView: PropTypes.bool.isRequired,
  updateDetailView: PropTypes.func.isRequired,
  userSnow: PropTypes.string.isRequired,
  userSnowChange: PropTypes.func.isRequired,
  userSoilFzn: PropTypes.string.isRequired,
  userSoilFznChange: PropTypes.func.isRequired,
};

export default PointDisplay;

