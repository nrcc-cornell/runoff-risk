///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
//import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class UserSnowSwitch extends React.Component {

  render() {

    return (
            <Grid container spacing={2} justify='center' alignItems='center'>
              <Grid item>
                <Typography><i>{'Snow Depth > 1" '}</i></Typography>
              </Grid>
              <Grid item>
              <FormControl component="fieldset" margin="none">
                <RadioGroup
                  aria-label="select yes or no"
                  name="userSnow"
                  value={this.props.value}
                  onChange={this.props.onchange}
                  row
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio color="primary" />}
                    label={<Typography variant="h6">Yes</Typography>}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio color="primary" />}
                    label={<Typography variant="h6">No</Typography>}
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
              </Grid>
            </Grid>
    )
  }
}

UserSnowSwitch.propTypes = {
  value: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
};

export default UserSnowSwitch;
