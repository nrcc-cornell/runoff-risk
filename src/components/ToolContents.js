///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
//import { inject, observer} from 'mobx-react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//import 'leaflet/dist/leaflet.css';
import Grid from '@material-ui/core/Grid';

import LoadPointForecast from './LoadPointForecast';
import MapDisplay from './MapDisplay';

// Styles
import '../styles/ToolContents.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class ToolContents extends Component {
    //const { classes } = props;

    constructor(props) {
        super(props);
        this.state = {
          variable: 'runoffrisk',
          date: '20201130',
          lat: null,
          lon: null,
          pointData: null,
        }
    }

    componentDidMount() {
        this.initStateForLoading()
    }

    componentDidUpdate(prevProps,prevState) {
        if ((prevState.lat!==this.state.lat) && (prevState.lon!==this.state.lon)) {
          //this.initStateForLoading()
          LoadPointForecast({lon:this.state.lon.toString(), lat:this.state.lat.toString()})
            .then(response => {
              this.setState({
                pointData: response,
              })
            });
        }
    }

    initStateForLoading = () => {
      this.setState({
        //lon: null,
        //lat: null,
        pointData: null,
      })
    }

    handlePointChange = (lt,ln) => {
      this.setState({
        lat: lt,
        lon: ln,
      })
    }

    render() {

        return (
                  <Grid container justify="space-evenly" spacing={1}>
                      <Grid item xs={12} md={8}>
                        <MapDisplay handlePointChange={this.handlePointChange} />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        {this.state.pointData && this.state.pointData.lat},
                        {this.state.pointData && this.state.pointData.lon}
                      </Grid>
                  </Grid>
        );

    }
}

//StationExplorer.propTypes = {
//  classes: PropTypes.object.isRequired,
//};

export default withStyles(styles)(ToolContents);
