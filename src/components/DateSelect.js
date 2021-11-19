///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import ReactHtmlParser from 'react-html-parser';

const styles = theme => ({
  root: {
    //width: 200,
    minWidth: 200,
    width: '24vw',
  },
});

function valuetext(value) {
  return `Map for ${value[0]}`;
}

const DateSelect = (props) => {
        const { classes } = props;
        let marks=null
        // Display range of values in marks, if 'valuesEndRange' is not empty.
        // Otherwise, display a single value for marks, as defined in 'valuesStartRange'.
        if (props.valuesEndRange.length) {
          marks = props.valuesStartRange.map((x,i) => {return {value: i, label: ReactHtmlParser(x.slice(4,6)+'/'+x.slice(6,8)+'-<br/>'+props.valuesEndRange[i].slice(4,6)+'/'+props.valuesEndRange[i].slice(6,8))}})
        } else {
          marks = props.valuesStartRange.map((x,i) => {return {value: i, label: x.slice(4,6)+'/'+x.slice(6,8)}})
        }
        return (
          <div className={classes.root}>
              <Typography id="date-slider" gutterBottom>
                  Forecast Date
              </Typography>
              <Slider
                  track={false}
                  value={props.valuesStartRange.indexOf(props.value)}
                  onChange={props.onchange}
                  valueLabelDisplay="off"
                  min={0}
                  max={props.valuesStartRange.length-1}
                  marks={marks}
                  aria-labelledby="date-slider"
                  getAriaValueText={valuetext}
              />
          </div>
        );
}

DateSelect.propTypes = {
  value: PropTypes.string.isRequired,
  valuesStartRange: PropTypes.array.isRequired,
  valuesEndRange: PropTypes.array.isRequired,
  onchange: PropTypes.func.isRequired,
};

export default withStyles(styles)(DateSelect);
