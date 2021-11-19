import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//import Hidden from '@material-ui/core/Hidden';
//import red from '@material-ui/core/colors/red';
//import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
//import moment from 'moment';

//import HelpToolContent from "../HelpToolContent";
import {HelpToolLocation} from "../HelpToolContent";
import HelpToolPopover from "../HelpToolPopover";

//import UserSnowSwitch from '../UserSnowSwitch';
//import UserSoilFznSwitch from '../UserSoilFznSwitch';

const styles = theme => ({
//  button: {
//    color: blue[500],
//  },
});

class DashboardLocation extends React.Component {

  onChangeClick = () => {
    this.props.initLocation()
  }

  render() {
    const { classes } = this.props;

    const idxTitleEnd = (this.props.locationText) ? this.props.locationText.indexOf(', New York') : null
    const titleText = (idxTitleEnd) ? this.props.locationText.slice(0,idxTitleEnd) : null

    return (
      <Grid container direction="column" justify="center" alignItems="center">
          <div id="turf-dashboard-location">
            <span className="location-title">{'Selected location details:'}</span>
            <br/>
            {titleText &&
              <div>
              <span className="location-address">{titleText}</span>
              </div>
            }
            <span className="location-address">Lon: {parseFloat(this.props.lon).toFixed(4)}, Lat: {parseFloat(this.props.lat).toFixed(4)}</span>
            <Grid container item spacing={1} direction="row" justify="center" alignItems="center">
              <Grid item>
                <Button className={classes.button} variant="contained" color="primary" size="small" onClick={this.onChangeClick}>
                  Change Location
                </Button>
              </Grid>
              <Grid item>
                <HelpToolPopover content={<HelpToolLocation/>} />
              </Grid>
            </Grid>
            <br/>
          </div>
      </Grid>
    )
  }
}

DashboardLocation.propTypes = {
  lon: PropTypes.string.isRequired,
  lat: PropTypes.string.isRequired,
  initLocation: PropTypes.func.isRequired,
  pointData: PropTypes.object.isRequired,
  locationText: PropTypes.string,
  userSnow: PropTypes.string.isRequired,
  userSnowChange: PropTypes.func.isRequired,
  userSoilFzn: PropTypes.string.isRequired,
  userSoilFznChange: PropTypes.func.isRequired,
};

//export default DashboardLocation;
export default withStyles(styles)(DashboardLocation);
