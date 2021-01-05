import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//import Hidden from '@material-ui/core/Hidden';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    color: red[500],
  },
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
            {titleText &&
              <div>
              <span className="location-address">{titleText}</span>
              </div>
            }
            <span className="location-address">Lon: {parseFloat(this.props.pointData.lon).toFixed(4)}, Lat:{parseFloat(this.props.pointData.lat).toFixed(4)}</span>
            &nbsp;
            <Button className={classes.button} variant="outlined" color="secondary" size="small" onClick={this.onChangeClick}>
              Change Location
            </Button>
          </div>
      </Grid>
    )
  }
}

DashboardLocation.propTypes = {
  initLocation: PropTypes.func.isRequired,
  pointData: PropTypes.object.isRequired,
  locationText: PropTypes.string,
};

//export default DashboardLocation;
export default withStyles(styles)(DashboardLocation);
