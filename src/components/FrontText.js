///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const FrontText = (props) => {
        //const { classes } = props;
        return (
          <Grid item container direction="column" justify="flex-start" xs={12} md={4} lg={4}>
            <Grid item>
              <Typography gutterBottom variant="body2">
                The <b>New York State Nutrient Applicator Forecast</b> provides information about potential runoff risk for the next 10 days. This tool uses National Weather Service forecasts for precipitation, temperature, soil moisture, snow cover and landscape characteristics to drive these products.
              </Typography>
              <Hidden smDown><br/></Hidden>
              <hr />
              <Hidden smDown><br/></Hidden>
              <Typography gutterBottom variant="body2">
                <b>Regional Forecasts</b> are presented as maps. Runoff risk and associated weather components can be selected and viewed on the map for specific forecast dates (above map).
              </Typography>
              <Hidden smDown><br/></Hidden>
              <hr />
              <Hidden smDown><br/></Hidden>
              <Typography gutterBottom variant="body2">
                <b>Point Forecasts</b> provide site-specific runoff risk information in chart and table form. These forecasts can be accessed for your location by either clicking on the map, or typing your address/location where indicated in the corner of the map.
              </Typography>
              <Hidden smDown><br/></Hidden>
              <hr />
              <Hidden smDown><br/></Hidden>
              <Typography gutterBottom variant="body2">
                For details about these forecasts and more instructions on how to use this tool, please click on the <b>How To</b> and <b>About</b> links at the top of the page.
              </Typography>
            </Grid>
          </Grid>
        );
}

export default withStyles(styles)(FrontText);
