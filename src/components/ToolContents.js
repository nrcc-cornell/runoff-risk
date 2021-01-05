///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
//import { inject, observer} from 'mobx-react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import ls from 'local-storage';

//import 'leaflet/dist/leaflet.css';
import Grid from '@material-ui/core/Grid';
//import Hidden from '@material-ui/core/Hidden';

import FrontText from './FrontText';
import VarSelect from './VarSelect';
import DateSelect from './DateSelect';
//import MapLegend from './MapLegend';
import LoadForecastDates from './LoadForecastDates';
import LoadPointForecast from './LoadPointForecast';
import MapDisplay from './MapDisplay';
import PointDisplay from './PointDisplay/PointDisplay';

// Styles
import '../styles/ToolContents.css';

const styles = theme => ({
//  root: {
//    flexGrow: 1,
//  },
  button: {
    color: blue[500],
  },
  wrapper: {
    position: 'relative',
  },
  mainSelect: {
    marginLeft: '0px'
  },
  chartProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -60,
    marginLeft: -40,
  },
});

class ToolContents extends Component {
    //const { classes } = props;

    constructor(props) {
        super(props);
        this.state = {
          variable: 'dailyRiskPercWinter',
          variables: ['dailyRiskPercWinter','dailyPrecip','dailyAvgSWE','dailyAvgSoilSat_2in','dailyAvgSoilSat_6in','dailyAvgSoilSat_sfcTo10in','dailyAvgSoilTemp_2in','dailyAvgSoilTemp_6in','dailyAvgSoilTemp_sfcTo10in'],
          //date: '20201209',
          //dates: ['20201209','20201210','20201211','20201212','20201213'],
          date: null,
          dates: null,
          lat: ls('RUNOFFRISK.lat') || null,
          lon: ls('RUNOFFRISK.lon') || null,
          pointData: null,
          locationText: ls('RUNOFFRISK.locationText') || null,
          viewport: {
            longitude: -75.77,
            latitude: 42.51,
            zoom: 6
          },
          //coordinates: ls('RUNOFFRISK.lon') ? [ls('RUNOFFRISK.lon'),ls('RUNOFFRISK.lat')] : [-76.5,42.5],
          dataIsLoading: false
        }
    }

    componentDidMount() {
        // Find current forecast dates
        LoadForecastDates()
          .then(response => {
            this.setState({
              date: response['fcstDates'][0],
              dates: response['fcstDates'].slice(0,5),
            })
          });

	// Find all forecast data for a given location
        if ((this.state.lat && this.state.lon)) {
          this.setState({
            dataIsLoading: true
          })
          LoadPointForecast({lon:this.state.lon.toString(), lat:this.state.lat.toString()})
            .then(response => {
              this.setState({
                pointData: response,
                dataIsLoading: false
              })
            });
        }
    }

    componentDidUpdate(prevProps,prevState) {
        if (this.state.lat && this.state.lon && (prevState.lat!==this.state.lat) && (prevState.lon!==this.state.lon)) {
          // This is a location change by the user - load data for this new lon/lat
          this.setState({
            dataIsLoading: true
          })
          setTimeout(() => {
            LoadPointForecast({lon:this.state.lon.toString(), lat:this.state.lat.toString()})
              .then(response => {
                this.setState({
                  pointData: response,
                  dataIsLoading: false
                })
              })
            },
            1000
          );
        }
        if (!this.state.lat && !this.state.lon && (prevState.lat!==this.state.lat) && (prevState.lon!==this.state.lon)) {
          // This represents a location that has been removed by the user ('Change Location' button).
          // Therefore, we will reinitialize the viewport for the mapbox map.
          this.initViewport()
        }
    }

    initLocation = () => {
      this.setState({
        lon: null,
        lat: null,
        pointData: null,
        locationText: null,
      })
      ls.remove('RUNOFFRISK.lat')
      ls.remove('RUNOFFRISK.lon')
      ls.remove('RUNOFFRISK.locationText')
    }

    initViewport = () => {
      this.setState({
        viewport: {
          longitude: -75.77,
          latitude: 42.51,
          zoom: 6
        },
      })
    }

    handlePointChange = (lt,ln) => {
      this.setState({
        lat: lt,
        lon: ln,
        locationText: null,
      })
      ls.set('RUNOFFRISK.lon',ln)
      ls.set('RUNOFFRISK.lat',lt)
      if (ls('RUNOFFRISK.locationText')) {ls.remove('RUNOFFRISK.locationText')}
    }

    handleViewportChange = (viewport) => {
      this.setState({
        viewport: { ...this.state.viewport, ...viewport },
      })
    }

    handleDateChange = (e,newValue) => {
      this.setState({
        //date: newValue.toString(),
        date: this.state.dates[newValue],
      })
    }

    handleVarChange = (e) => {
      this.setState({
        variable: e.target.value,
      })
    }

    handleGeocoderLocationChange = (e) => {
      //console.log(e.result)
      this.setState({
        locationText: e.result.place_name
      })
      ls.set('RUNOFFRISK.locationText',e.result.place_name)
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                  <Grid container justify="space-evenly" spacing={6}>

                      {this.state.lat &&
                      <Grid item xs={12} lg={6}>
                        <div className={classes.wrapper}>
                          { this.state.pointData &&
                            <PointDisplay
                              pointData={this.state.pointData}
                              initLocation={this.initLocation}
                              locationText={this.state.locationText}
                            />
                          }
                          { !this.state.pointData &&
                            <div style={{height:'400px'}}>&nbsp;</div>
                          }
                          { this.state.dataIsLoading && <CircularProgress size={140} className={classes.chartProgress} /> }
                        </div>
                      </Grid>
                      }

                      {!this.state.lat &&
                      <FrontText />
                      }

                      <Grid item container direction="column" justify="flex-start" xs={12} md={8} lg={(this.state.lat) ? 6 : 8} spacing={4} >
                        {this.state.viewport.zoom < 11 &&
                        <Grid item container direction="row" justify="space-evenly" alignItems="flex-start">
                          <Grid item>
                            <VarSelect
                              value={this.state.variable}
                              values={this.state.variables}
                              onchange={this.handleVarChange}
                            />
                          </Grid>
                          <Grid item>
                            { this.state.date && this.state.dates &&
                              <DateSelect
                                value={this.state.date}
                                values={this.state.dates}
                                onchange={this.handleDateChange}
                              />
                            }
                          </Grid>
                        </Grid>
                        }
                        {this.state.viewport.zoom >= 11 && this.state.lon && this.state.lat &&
                        <Grid item container direction="row" justify="space-evenly" alignItems="flex-start">
                          <Button
                            variant="contained" color="primary" size="large"
                            onClick={() => this.handleViewportChange({'longitude':this.state.lon,'latitude':this.state.lat,'zoom':10})}
                          >
                            View Regional Forecast For Selected Location
                          </Button>
                        </Grid>
                        }
                        {this.state.viewport.zoom >= 11 && (!this.state.lon || !this.state.lat) &&
                        <Grid item container direction="row" justify="space-evenly" alignItems="flex-start">
                          <Button
                            variant="contained" color="primary" size="large"
                            onClick={() => this.handleViewportChange({'zoom':10})}
                          >
                            View Regional Forecast
                          </Button>
                        </Grid>
                        }
                        <Grid item>
                          <div className={classes.wrapper}>
                            { this.state.variable && this.state.date &&
                              <MapDisplay
                                lon={this.state.lon}
                                lat={this.state.lat}
                                viewport={this.state.viewport}
                                variable={this.state.variable}
                                date={this.state.date}
                                dateFcstInit={this.state.dates[0]}
                                handlePointChange={this.handlePointChange}
                                handleViewportChange={this.handleViewportChange}
                                handleGeocoderLocationChange={this.handleGeocoderLocationChange}
                              />
                            }
                          </div>
                        </Grid>
                      </Grid>

                  </Grid>
            </div>
        );

    }
}

//StationExplorer.propTypes = {
//  classes: PropTypes.object.isRequired,
//};

export default withStyles(styles)(ToolContents);
