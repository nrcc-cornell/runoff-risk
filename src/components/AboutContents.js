import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

import '../styles/AboutContents.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    //padding: theme.spacing.unit * 2,
    padding: theme.spacing(2),
  },
  aboutHeaderText: {
    color: 'black',
    fontSize: '26px',
    fontWeight: 'normal',
  },
});

class AboutContents extends Component {

  constructor(props) {
      super(props);
      this.state = {
      };
  }

  render() {
    //const {viewport, coordinates, popupIsVisible, imgsrc, imgcoords} = this.state;
    const { classes } = this.props;

    return (
      <div>
            <Grid container className={classes.root} spacing={4}>
              <Grid item sm={12} md={12}>
                    <Typography align="left" paragraph variant="h2" className={classes.aboutHeaderText}>
                      Purpose of the Nutrient Applicator Forecast
                    </Typography>
              </Grid>
              <Grid item sm={12} md={12}>
                    <Typography align="left" paragraph variant="h2" className={classes.aboutHeaderText}>
                      Description of defined runoff risk levels
                    </Typography>
              </Grid>
              <Grid item sm={12} md={12}>
                    <Typography align="left" paragraph variant="h2" className={classes.aboutHeaderText}>
                      Regional forecast maps: How to use
                    </Typography>
              </Grid>
              <Grid item sm={12} md={12}>
                    <Typography align="left" paragraph variant="h2" className={classes.aboutHeaderText}>
                      Point forecasts for your location: How to use
                    </Typography>
              </Grid>
              <Grid item sm={12} md={12}>
                    <Typography align="left" paragraph variant="h2" className={classes.aboutHeaderText}>
                      Source of weather forecast data
                    </Typography>
              </Grid>
              <Grid item sm={12} md={12}>
                    <Typography align="left" paragraph variant="h2" className={classes.aboutHeaderText}>
                      Resources and educational materials
                    </Typography>
              </Grid>
            </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AboutContents);
