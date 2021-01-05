///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const styles = theme => ({
  root: {
    //width: 200,
    minWidth: 200,
    width: '26vw',
  },
});

function valuetext(value) {
  return `Map for ${value[0]}`;
}

const DateSelect = (props) => {
        const { classes } = props;
        const marks = props.values.map((x,i) => {return {value: i, label: x.slice(4,6)+'-'+x.slice(6,8)}})
	//console.log('marks')
	//console.log(marks)
        return (
          <div className={classes.root}>
              <Typography id="date-slider" gutterBottom>
                  Forecast Date
              </Typography>
              <Slider
                  value={props.values.indexOf(props.value)}
                  onChange={props.onchange}
                  valueLabelDisplay="off"
                  min={0}
                  max={props.values.length-1}
                  marks={marks}
                  aria-labelledby="date-slider"
                  getAriaValueText={valuetext}
              />
          </div>
        );
}

DateSelect.propTypes = {
  value: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  onchange: PropTypes.func.isRequired,
};

export default withStyles(styles)(DateSelect);
