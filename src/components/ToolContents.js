///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
//import { withRouter } from "react-router-dom";
//import { inject, observer} from 'mobx-react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import ls from 'local-storage';
import moment from 'moment';

//import 'leaflet/dist/leaflet.css';
import Grid from '@material-ui/core/Grid';
//import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import {HelpToolMap, HelpToolMapFineTuneSelection} from "./HelpToolContent";
import HelpToolPopover from "./HelpToolPopover";
import FrontText from './FrontText';
import VarSelect from './VarSelect';
import DateSelect from './DateSelect';
//import MapLegend from './MapLegend';
import LoadForecastDates from './LoadForecastDates';
import LoadLonLatGrid from './LoadLonLatGrid';
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
  locationInstrText: {
    color: 'black',
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
});

class ToolContents extends Component {
    //const { classes } = props;

    constructor(props) {
        super(props);
        this.state = {
          //variable: 'dailyRiskPercWinter72Hour',
          //variables: ['dailyRiskPercWinter72Hour','dailyRiskPercWinter','dailyPrecip','dailyAvgSWE','dailyAvgSoilSat_2in','dailyAvgSoilSat_6in','dailyAvgSoilSat_sfcTo10in','dailyAvgSoilTemp_2in','dailyAvgSoilTemp_6in','dailyAvgSoilTemp_sfcTo10in'],
          variable: 'RRAF_dailyRiskPercWinter72Hour',
          variables: ['RRAF_dailyRiskPercWinter72Hour','RRAF_dailyRiskPercWinter','dailyPrecip_vol_INCHES','dailyRAIM_vol_INCHES','dailyAvgSWE_INCHES','dailyAvgSoilSat_2in','dailyAvgSoilSat_6in','dailyAvgSoilSat_sfc10','dailyAvgSoilTemp_2in_F','dailyAvgSoilTemp_6in_F','dailyAvgSoilTemp_sfc10_F'],
          date: null,
          dates: null,
          datesEnd72hrRange: null,
          gridLats: [],
          gridLons: [],
          lat: ls('RUNOFFRISK.lat') || null,
          lon: ls('RUNOFFRISK.lon') || null,
          idxLon: null,
          idxLat: null,
          selectionConfirmed: ls('RUNOFFRISK.lon') ? true : false,
          pointData: null,
          userSnow: null,
          userSoilFzn: null,
          locationText: ls('RUNOFFRISK.locationText') || null,
          viewport: {
            longitude: -75.77,
            latitude: 42.51,
            zoom: 6
          },
          //coordinates: ls('RUNOFFRISK.lon') ? [ls('RUNOFFRISK.lon'),ls('RUNOFFRISK.lat')] : [-76.5,42.5],
          detailView: false,
          assumptionsView: false,
          dataIsLoading: false
        }
    }

    componentDidMount() {
        let today_date = moment().format('YYYYMMDD')
        // Find current forecast dates
        LoadForecastDates({dateFcstInit:today_date})
          .then(response => {
            this.setState({
              date: (response['fcstDates'].slice(0,5).includes(today_date)) ? today_date : response['fcstDates'][0],
              dates: response['fcstDates'].slice(0,5),
              datesEnd72hrRange: response['fcstDates'].slice(2,7),
            })
          });

	// Load lon and lat arrays. We use these to calculate current grid indices
        this.setState({
          dataIsLoading: true
        })
        LoadLonLatGrid({dateFcstInit:today_date})
          .then(response => {
            this.setState({
              gridLons: response['lons'],
              gridLats: response['lats'],
            })

	    // Find indices of current grid
            if ((this.state.lat && this.state.lon && response['lons'].length && response['lats'].length)) {

              // find grid index in lon direction
              let gridLonsLength = response['lons'].length;
              let idxLon = null;
              for (var idx = 0; idx < gridLonsLength-1; idx++) {
                if (this.state.lon >= response['lons'][idx] && this.state.lon < response['lons'][idx+1]) {
                  idxLon = idx
                  break;
                }
              }

              // find grid index in lat direction
              let gridLatsLength = response['lats'].length
              let idxLat = null;
              for (var idx2 = 0; idx2 < gridLatsLength-1; idx2++) {
                if (this.state.lat <= response['lats'][idx2] && this.state.lat > response['lats'][idx2+1]) {
                  idxLat = idx2
                  break;
                }
              }

              // get point forecast for this grid point
              if (idxLon && idxLat && today_date) {
	        // Find all forecast data for a given location
                LoadPointForecast({idxLon:idxLon.toString(), idxLat:idxLat.toString(), dateFcstInit:today_date})
                  .then(fcst_data => {
                    //console.log(fcst_data)
                    //let today_idx = fcst_data['dates'].indexOf(today_date)
                    //let today_snow_ge_1 = fcst_data['winterCond'][today_idx]
                    //let today_soil_frozen = fcst_data['winterCond'][today_idx]
                    let today_snow_depth = fcst_data['initSnowDepth'][0]
                    let today_soil_temp = fcst_data['initSoilTemp'][0]
                    this.setState({
                      idxLon: idxLon,
                      idxLat: idxLat,
                      //gridLons: response['lons'],
                      //gridLats: response['lats'],
                      pointData: fcst_data,
                      userSnow: (today_snow_depth>=1) ? 'yes' : 'no',
                      userSoilFzn: (today_soil_temp<=32) ? 'yes' : 'no',
                      dataIsLoading: false
                    })
                  });
              }

            }

          });

    }

    componentDidUpdate(prevProps,prevState) {
        if (this.state.dates && this.state.gridLons.length && this.state.gridLats.length && this.state.lat && this.state.lon && (prevState.lat!==this.state.lat) && (prevState.lon!==this.state.lon)) {
          // This is a location change by the user - find new grid indices and load data for this new lon/lat
          this.setState({
            dataIsLoading: true
          })
          setTimeout(() => {
                  // find grid index in lon direction
                  let gridLonsLength = this.state.gridLons.length;
                  let idxLon = null;
                  for (var idx = 0; idx < gridLonsLength-1; idx++) {
                    if (this.state.lon >= this.state.gridLons[idx] && this.state.lon < this.state.gridLons[idx+1]) {
                      idxLon = idx
                      break;
                    }
                  }

                  // find grid index in lat direction
                  let gridLatsLength = this.state.gridLats.length
                  let idxLat = null;
                  for (var idx2 = 0; idx2 < gridLatsLength-1; idx2++) {
                    if (this.state.lat <= this.state.gridLats[idx2] && this.state.lat > this.state.gridLats[idx2+1]) {
                      idxLat = idx2
                      break;
                    }
                  }

                  // get point forecast for this grid point
                  if (idxLon && idxLat && this.state.dates) {
	            // Find all forecast data for a given location
                    LoadPointForecast({idxLon:idxLon.toString(), idxLat:idxLat.toString(), dateFcstInit:this.state.dates[0]})
                      .then(fcst_data => {
                        //let today_date = moment().format('YYYYMMDD')
                        //let today_idx = fcst_data['dates'].indexOf(today_date)
                        //let today_snow_ge_1 = fcst_data['winterCond'][today_idx]
                        //let today_soil_frozen = fcst_data['winterCond'][today_idx]
                        let today_snow_depth = fcst_data['initSnowDepth'][0]
                        let today_soil_temp = fcst_data['initSoilTemp'][0]
                        this.setState({
                          idxLon: idxLon,
                          idxLat: idxLat,
                          pointData: fcst_data,
                          //userSnow: (today_snow_ge_1===2 || today_snow_ge_1===3) ? 'yes' : 'no',
                          //userSoilFzn: (today_soil_frozen===1 || today_soil_frozen===3) ? 'yes' : 'no',
                          userSnow: (today_snow_depth>=1) ? 'yes' : 'no',
                          userSoilFzn: (today_soil_temp<=32) ? 'yes' : 'no',
                          dataIsLoading: false
                        })
                      });
                  }

            //LoadPointForecast({lon:this.state.lon.toString(), lat:this.state.lat.toString()})
            //  .then(response => {
            //    let today_date = moment().format('YYYYMMDD')
            //    let today_idx = response['dates'].indexOf(today_date)
            //    //let today_swe = response['SWE'][today_idx]
            //    //let today_soilt = response['soilTemp2in'][today_idx]
            //    let today_snow_ge_1 = response['winterCond'][today_idx]
            //    let today_soil_frozen = response['winterCond'][today_idx]
            //    this.setState({
            //      pointData: response,
            //      //userSnow: (today_swe>=0.01) ? 'yes' : 'no',
            //      //userSoilFzn: (today_soilt<=32) ? 'yes' : 'no',
            //      //userSnow: (today_snow_ge_1===0) ? 'no' : 'yes',
            //      //userSoilFzn: (today_soil_frozen===0) ? 'no' : 'yes',
            //      userSnow: (today_snow_ge_1===2 || today_snow_ge_1===3) ? 'yes' : 'no',
            //      userSoilFzn: (today_soil_frozen===1 || today_soil_frozen===3) ? 'yes' : 'no',
            //      dataIsLoading: false
            //    })
            //  })
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
        idxLon: null,
        idxLat: null,
        pointData: null,
        locationText: null,
        userSnow: null,
        userSoilFzn: null,
        selectionConfirmed: false,
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
        detailView: false,
        assumptionsView: false,
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

    handleChangeUserSnow = (e) => {
        this.setState({
          userSnow: e.target.value,
        })
    }

    handleChangeUserSoilFzn = (e) => {
        this.setState({
          userSoilFzn: e.target.value,
        })
    }

    handleDetailViewChange = () => {
      this.setState((prevState) => ({
        detailView: !prevState.detailView,
      }) )
    }

    handleAssumptionsViewChange = () => {
      this.setState((prevState) => ({
        assumptionsView: !prevState.assumptionsView,
      }) )
    }

    handleGeocoderLocationChange = (e) => {
      //console.log(e.result)
      this.setState({
        locationText: e.result.place_name,
        selectionConfirmed: false,
      })
      ls.set('RUNOFFRISK.locationText',e.result.place_name)
    }

    handleSelectionConfirmed = (b) => {
        this.setState({
          selectionConfirmed: b
        })
    }

    handleChangePage = (p) => {
      this.props.history.push(p);
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                  <Grid container justify="space-evenly" spacing={6}>

                      {this.state.lat &&
                      <Grid item xs={12} lg={6}>
                        <div className={classes.wrapper}>
                          { this.state.lon && this.state.lat && this.state.pointData && this.state.userSnow && this.state.userSoilFzn &&
                            <PointDisplay
                              lon={this.state.lon.toString()}
                              lat={this.state.lat.toString()}
                              pointData={this.state.pointData}
                              initLocation={this.initLocation}
                              locationText={this.state.locationText}
                              assumptionsView={this.state.assumptionsView}
                              updateAssumptionsView={this.handleAssumptionsViewChange}
                              detailView={this.state.detailView}
                              updateDetailView={this.handleDetailViewChange}
                              userSnow={this.state.userSnow}
                              userSnowChange={this.handleChangeUserSnow}
                              userSoilFzn={this.state.userSoilFzn}
                              userSoilFznChange={this.handleChangeUserSoilFzn}
                              changePage={this.handleChangePage}
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

                      <Grid item container direction="column" justify="flex-start" xs={12} md={8} lg={(this.state.lat) ? 6 : 8} spacing={3} >
                        {!this.state.lon && !this.state.lat &&
                        <Grid item>
                          <Typography align="center" paragraph variant="body2" className={classes.locationInstrText}>
                            TO ACCESS POINT FORECASTS : Click on map or type in address/location below.
                          </Typography>
                        </Grid>
                        }
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
                                valuesStartRange={this.state.dates}
                                valuesEndRange={(this.state.variable==='RRAF_dailyRiskPercWinter72Hour') ? this.state.datesEnd72hrRange : []}
                                onchange={this.handleDateChange}
                              />
                            }
                          </Grid>
                          <Grid item>
                            <HelpToolPopover content={<HelpToolMap/>} />
                          </Grid>
                        </Grid>
                        }
                        {this.state.viewport.zoom >= 11 && this.state.lon && this.state.lat && !this.state.selectionConfirmed &&
                        <Grid item container direction="row" justify="space-evenly" alignItems="flex-end">
                          <Grid item xs={10}>
                            <Typography align="center" paragraph variant="body2" className={classes.locationInstrText}>
                              Fine-tune your selection and click 'SAVE THIS LOCATION'.
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <HelpToolPopover content={<HelpToolMapFineTuneSelection/>} />
                          </Grid>
                        </Grid>
                        }
                        {this.state.viewport.zoom >= 11 && ((!this.state.lon || !this.state.lat) || this.state.selectionConfirmed) &&
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
                                locationText={this.state.locationText}
                                selectionConfirmed={this.state.selectionConfirmed}
                                viewport={this.state.viewport}
                                variable={this.state.variable}
                                date={this.state.date}
                                dateFcstInit={this.state.dates[0]}
                                initLocation={this.initLocation}
                                handlePointChange={this.handlePointChange}
                                handleSelectionConfirmed={this.handleSelectionConfirmed}
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
