///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 120,
  },
});

const getLabel = (v) => {
  let labels = {
    'dailyRiskPercWinter': 'Runoff Risk',
    'dailyPrecip': 'Precipitation (in)',
    'dailyAvgSoilSat_2in': 'Soil Saturation (2" depth, %)',
    'dailyAvgSoilSat_6in': 'Soil Saturation (6" depth, %)',
    'dailyAvgSoilSat_sfcTo10in': 'Soil Saturation (sfc-10", %)',
    'dailyAvgSoilTemp_2in': 'Soil Temperature (2" depth, °F)',
    'dailyAvgSoilTemp_6in': 'Soil Temperature (6" depth, °F)',
    'dailyAvgSoilTemp_sfcTo10in': 'Soil Temperature (sfc-10", °F)',
    'dailyAvgSnowDepth': 'Snow Depth (in)',
    'dailyAvgSWE': 'Snow Water Equivalent (in)'
  }
  return labels[v]
}

const VarSelect = (props) => {
        const { classes } = props;
        return (
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="var">Variable</InputLabel>
              <Select
                value={props.value}
                onChange={props.onchange}
                inputProps={{
                  name: 'var',
                  id: 'var',
                }}
              >
                {props.values &&
                  props.values.map((v,i) => (
                    <MenuItem key={i} value={v}>{getLabel(v)}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </form>
        );
}

VarSelect.propTypes = {
  value: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  onchange: PropTypes.func.isRequired,
};

export default withStyles(styles)(VarSelect);
