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
    fontWeight: 'bold',
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
            <Grid container className={classes.root} spacing={6}>
              <Grid item sm={12} md={6}>
                    <Typography component={'div'} align="left" paragraph variant="h2" className={classes.aboutHeaderText}>
                      Purpose of the Runoff Risk Forecast
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
The <b>New York State Runoff Risk Forecast</b> is a decision support tool designed to help farmers and commercial applicators determine the best time to spread manure. The model used by this tool uses National Weather Service forecasts for precipitation, temperature, soil moisture, snow cover and landscape characteristics to provide information about potential runoff risk in your area for the next 10 days. The forecasts are intended to be used <i>in addition to</i> other sources of information, and alongside the user's local knowledge and experience. Together, this information can be used to keep applications on target, increasing productivity and decreasing the risk of local water contamination.
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
Runoff risk is forecasted for the next 10 days, with forecasts summarized into 72-hour and 24-hour intervals. While regional forecasts maps are available for an overall assessment of state conditions, selecting and viewing forecasts for specific locations of interest will be most useful. Each point forecast is for a 4 km<sup>2</sup> area (~1000 acres) that includes a selected location. The risk is grouped into four categories:
<ul>
<li><b>No Runoff Expected (green, blue)</b> : Little or no runoff is forecasted for your local area.</li>
<li><b>Low (yellow)</b> : Minor risk of a runoff event is forecasted for your local area.</li>
<li><b>Moderate (orange)</b> : The risk of a runoff event is moderate. Use this information along with other factors to determine spreading.</li>
<li><b>High (red, purple)</b> : The risk of a runoff event is high. Use this information along with other factors to determine spreading.</li>
</ul>
As noted, these forecasts are intended to be used as one tool during decision making. When the risk is Moderate or High for the area, it is recommended that the applicator closely evaluate the situation at the field level to determine if there are other locations or later dates when the application could take place.
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
For more details about using these forecasts, please visit the How To section.
                    </Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                    <Typography component={'div'} align="left" paragraph variant="h2" className={classes.aboutHeaderText}>
                      About the models and data
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
Runoff risk forecasts are generated from a model that incorporates a modification of the  <a href="https://www.nws.noaa.gov/ohd/hrl/hsmb/docs/hydrology/PBE_SAC-SMA/NOAA_Technical_Report_NWS_53.pdf">Sacremento Soil Moisture Accounting Heat Transfer Component (SAC-HT) for Enhanced Evaporation</a>. The SAC-HT model incorporates weather observations from numerous sources, including data from weather stations and remote estimates from radar and satellite. These observations provide the model with "current conditions" of air temperature, soil temperature, soil moisture, snow cover, and recently received precipitation.
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
Once current conditions are established, the model runs into the future to create the 10-day forecasts. The model is driven by National Weather Service forecasts for precipitation, temperature, snowfall, etc, to generate forecasts of runoff.
                    </Typography>
                    <Typography component={'div'} align="left" paragraph variant="h2" className={classes.aboutHeaderText}>
                      Creation of runoff risk severity levels
                    </Typography>
                    <Typography component={'div'} align="justify" variant="body1">
In order to assess the severity of current runoff forecasts, the model is run using observations from each of the past 40 years. The historical runoff events are used for comparison with current runoff forecasts. This allows us to categorize a forecasted event based on runoff events that have happened in the past. Forecasted runoff risk severity levels have the following statistical definitions:
<ul>
<li><b>No Runoff Expected</b> : Forecasted runoff amount is lower than at least 75% of all historical runoff events during this month.</li>
<li><b>Low</b> : Forecasted runoff amount is lower than at least 50% of all historical runoff events during this month.</li>
<li><b>Moderate</b> : Forecasted runoff amount is higher than at least 50% of all historical runoff events during this month.</li>
<li><b>High</b> : Forecasted runoff amount is higher than at least 75% of all historical runoff events during this month.</li>
</ul>
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
The intention of this tool is not to estimate specifically how much runoff will occur, but rather the severity level based on these definitions.
                    </Typography>
              </Grid>
            </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AboutContents);
