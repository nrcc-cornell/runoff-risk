import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import '../styles/HowtoContents.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    //padding: theme.spacing.unit * 2,
    padding: theme.spacing(2),
  },
  howtoHeaderText: {
    color: 'black',
    fontSize: '26px',
    fontWeight: 'bold',
  },
  howtoHeaderTextSub: {
    color: 'black',
    fontSize: '24px',
    fontWeight: 'normal',
    fontStyle: 'italic',
  },
});

class HowtoContents extends Component {

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
                    <Typography component={'div'} align="left" paragraph variant="h2" className={classes.howtoHeaderText}>
                      Definition and interpretation of runoff risk severity levels
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
Forecasted runoff is categorized into multiple risk levels under either winter conditions (snow cover and/or frozen soil) or non-winter conditions (no snow or frozen soil). These risk levels are presented as color-coded categories on all maps, tables and charts. For each category, we provide interpretation guidance below.
                    </Typography>
                    <Typography component={'div'} align="justify" variant="body1">
                      Forecasted <b>risk categories</b> issued under <b>non-winter conditions</b> include:<br/>
                      <ul>
                      <li><b><span style={{color:'#52be80'}}>NO RUNOFF EXPECTED (NRE)</span></b>: Little or no runoff is forecasted for your local area.</li>
                      <li><b><span style={{color:'#ffd700'}}>LOW RISK</span></b>: Minor risk of a runoff event is forecasted for your local area. This minor event is expected to be less intense than at least half of the runoff events typically experienced during this time of year.</li>
                      <li><b><span style={{color:'#ffaa1c'}}>MODERATE RISK</span></b>: The risk of a runoff event is moderate, and expected to be more intense than at least half of the runoff events typically experienced during this time of year. Use this information along with other factors to determine spreading. </li>
                      <li><b><span style={{color:'#ff0000'}}>HIGH RISK</span></b>: The risk of a runoff event is high, and expected to be more intense than at least 75% of the runoff events typically experienced during this time of year. Use this information along with other factors to determine spreading.</li>
                      </ul>
                    </Typography>
                    <Typography component={'div'} align="justify" variant="body1">
                      Forecasted <b>risk categories</b> issued under <b>winter conditions</b> include:<br/>
                      <ul>
                      <li><b><span style={{color:'#5dade2'}}>NO RUNOFF EXPECTED (NRE)</span></b>: There is no immediate risk of runoff expected, but winter conditions are present. Snow cover and/or frozen soil increases the likelihood of a runoff event in the future.</li>
                      <li><b><span style={{color:'#8e44ad'}}>HIGH RISK</span></b>: The risk of a runoff event is high, with winter conditions present. Either rainfall or snowmelt is expected in combination with these winter conditions. With snow cover or frozen soil present, even small amounts of rainfall or snowmelt produces a high risk for runoff.</li>
                      </ul>
                    </Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                    <Typography component={'div'} align="left" paragraph variant="h2" className={classes.howtoHeaderText}>
                      Regional forecast maps: How to use
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
Regional forecast maps provide an overall view of runoff risk conditions across New York State for the next five days. By default, the runoff risk expected over the next 72 hours is shown on the map. Multiple variables and forecast dates are available for the user to select from.
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
                    <Divider variant="middle"/>
                    </Typography>
                    <Typography component={'div'} align="left" paragraph variant="h4" className={classes.howtoHeaderTextSub}>
                      User selections
                    </Typography>
                    <Typography component={'div'} align="justify" variant="body1">
                <b>VARIABLE</b> is the type of forecast element available to view.<br/>
                <ul>
                <li><b>Runoff Risk (72-hour)</b>: The highest runoff risk category expected over the selected 3-day period.</li>
                <li><b>Runoff Risk (24-hour)</b>: The runoff risk category expected on the selected day.</li>
                <li><b>Precipitation (in)</b>: Liquid-equivalent of all rain/snow forecasted for selected day.</li>
                <li><b>Snow Water Equivalent (in)</b>: Amount of water in snowpack, if the snow were melted and measured.</li>
                <li><b>Soil Saturation (%)</b>: The percent of soil saturation, at specified depth.</li>
                <li><b>Soil Temperature (F)</b>: The temperature of the soil, at specified depth.</li>
                </ul>
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
                      <b>FORECAST DATE</b> is the day, or range of days, a forecast is valid for.<br/>
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
                    <Divider variant="middle"/>
                    </Typography>
                    <Typography component={'div'} align="left" paragraph variant="h4" className={classes.howtoHeaderTextSub}>
                      Selecting a location
                    </Typography>
                    <Typography component={'div'} align="justify" variant="body1">
                Location selection is performed within the regional forecast map. Once a location is selected, a detailed forecast will become available for the local area containing your location. This forecast area is 4 km<sup>2</sup> (~1000 acres), and represents the resolution of the model.<br/>
                <ul>
                <li><b>If a location is not yet selected</b>: Enter an address or click on the map to select a location. You can fine-tune your selection under a satellite view before saving the location.</li>
                <li><b>If a location is selected</b>: You can change the location by clicking 'CLEAR SELECTION' before selecting a new location.</li>
                </ul>
                    </Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                    <Typography component={'div'} align="left" paragraph variant="h2" className={classes.howtoHeaderText}>
                      Point forecasts for your location: How to use
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
For many users, a view of expected runoff risk for a specific location will be most useful. Once a location is selected through the regional map interface, forecasts for the local area containing the selected point (4 km<sup>2</sup>, ~1000 acres) is visible. Please keep in mind that these forecasts are intended to be used <i>in addition to</i> other sources of information, and alongside the user's local knowledge and experience. Sections included in this view are described below.
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
                    <Divider variant="middle"/>
                    </Typography>
                    <Typography component={'div'} align="left" paragraph variant="h4" className={classes.howtoHeaderTextSub}>
                      Selected location details
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
Details about your selected location are provided here. <b>Longitude and latitude</b> coordinates will always be provided. Additionally, if your location was selected by typing in an address, that <b>address</b> is also provided.
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
A <b>CHANGE LOCATION</b> button is also available in this section. Clicking this button clears the currently selected location, and presents you with a regional forecast map. Inside the map, you have the option of selecting a new location.
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
                    <Divider variant="middle"/>
                    </Typography>
                    <Typography component={'div'} align="left" paragraph variant="h4" className={classes.howtoHeaderTextSub}>
                      72-hr Runoff Risk Summary
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
A quick summary of the maximum runoff risk over the next 3 days is provided. The dates included in this short-term forecast summary are listed in the header of the section. Note that the forecast model run overnight. When finished, the updated forecasts are posted at approximately 6:30am ET each morning.
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
A <b>SHOW ASSUMPTIONS</b> button provides you with important details about current conditions used by the model for this location. You can use this information to verify that data used for model input is consistent with your local field conditions. If you are currently observing different conditions than those listed here, these forecasts should have limited influence on your decision making today.
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
                    <Divider variant="middle"/>
                    </Typography>
                    <Typography component={'div'} align="left" paragraph variant="h4" className={classes.howtoHeaderTextSub}>
                      Nutrient Runoff Risk Forecast (full 10 days)
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
Below the 72-hr summary forecast is a more comprehensive view of the full 10-day forecast issued today. Always visible is the main color table at the top of the section. This table shows the upcoming 72-hr risk beginning on each date, along with the individual daily risks that comprise the 72-hr risk forecasts.
                    </Typography>
                    <Typography component={'div'} align="justify" variant="body1">
Below the main table, you can view more details of this forecast. Clicking on the <b>SHOW DETAILS</b> button provides some key components of the daily weather forecasts over the next 10 days, including:
                <ul>
                <li>Air temperature range</li>
                <li>Soil Temperature</li>
                <li>Precipitation</li>
                <li>Snow Water Equivalent</li>
                </ul>
                    </Typography>
                    <Typography component={'div'} align="justify" paragraph variant="body1">
Viewing these forecast components can help show why certain runoff risk forecasts were issued. For instance, it can help to show whether rainfall or snowmelt was the primary factor in a particular risk forecast.
                    </Typography>
              </Grid>
            </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(HowtoContents);
