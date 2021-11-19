import React from 'react';
import PropTypes from 'prop-types';

import '../styles/mapLegend.css';

const mapLegendStyle = {
  position: 'absolute',
  bottom: 20,
  left: 10,
  padding: '10px'
};

const getLabel = (v) => {
  let labels = {
    'dailyRiskPerc': 'Runoff Risk (24-hour)',
    'dailyRiskPerc72Hour': 'Runoff Risk (72-hour)',
    'dailyRiskPercWinter': 'Runoff Risk (24-hour)',
    'dailyRiskPercWinter72Hour': 'Runoff Risk (72-hour)',
    'dailyRiskPercWinterTotal': 'Runoff Risk (10-day)',
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

class MapLegend extends React.Component {

  render() {
    if (this.props.variable.includes('Risk')) {
      return (
        <div className="map-legend" style={mapLegendStyle}>
          <div className="map-legend-title">{getLabel(this.props.variable)}</div>
          <div className={"color-box rr-color-1"}></div><span className="map-legend-label">No Runoff Expected</span><br/>
          <div className={"color-box rr-color-2"}></div><span className="map-legend-label">Low</span><br/>
          <div className={"color-box rr-color-3"}></div><span className="map-legend-label">Moderate</span><br/>
          <div className={"color-box rr-color-4"}></div><span className="map-legend-label">High</span><br/>
          <div className="map-legend-title">Frozen Soil / Snow</div>
          <div className={"color-box rr-color-5"}></div><span className="map-legend-label">No Runoff Expected</span><br/>
          <div className={"color-box rr-color-6"}></div><span className="map-legend-label">High</span><br/>
        </div>
      )
    } else if (this.props.variable==='dailyPrecip' || this.props.variable==='dailyAvgSWE') {
      return (
        <div className="map-legend" style={mapLegendStyle}>
          <div className="map-legend-title">{getLabel(this.props.variable)}</div>
          <div className={"color-box precip-color-1"}></div><span className="map-legend-label">Zero</span><br/>
          <div className={"color-box precip-color-2"}></div><span className="map-legend-label">Trace-0.10</span><br/>
          <div className={"color-box precip-color-3"}></div><span className="map-legend-label">0.10-0.25</span><br/>
          <div className={"color-box precip-color-4"}></div><span className="map-legend-label">0.25-0.50</span><br/>
          <div className={"color-box precip-color-5"}></div><span className="map-legend-label">0.50-0.75</span><br/>
          <div className={"color-box precip-color-6"}></div><span className="map-legend-label">0.75-1.00</span><br/>
          <div className={"color-box precip-color-7"}></div><span className="map-legend-label">1.00-1.50</span><br/>
          <div className={"color-box precip-color-8"}></div><span className="map-legend-label">1.50-3.00</span><br/>
          <div className={"color-box precip-color-9"}></div><span className="map-legend-label">{'> 3.00'}</span><br/>
        </div>
      )
    } else if (this.props.variable.includes('SoilTemp')) {
      return (
        <div className="map-legend" style={mapLegendStyle}>
          <div className="map-legend-title">{getLabel(this.props.variable)}</div>
          <div className={"color-box temp-color-1"}></div><span className="map-legend-label">{'< 32'}</span><br/>
          <div className={"color-box temp-color-2"}></div><span className="map-legend-label">32-34</span><br/>
          <div className={"color-box temp-color-3"}></div><span className="map-legend-label">34-40</span><br/>
          <div className={"color-box temp-color-4"}></div><span className="map-legend-label">40-45</span><br/>
          <div className={"color-box temp-color-5"}></div><span className="map-legend-label">45-50</span><br/>
          <div className={"color-box temp-color-6"}></div><span className="map-legend-label">{'> 50'}</span><br/>
        </div>
      )
    } else if (this.props.variable.includes('SoilSat')) {
      return (
        <div className="map-legend" style={mapLegendStyle}>
          <div className="map-legend-title">{getLabel(this.props.variable)}</div>
          <div className={"color-box sat-color-1"}></div><span className="map-legend-label">0-20</span><br/>
          <div className={"color-box sat-color-2"}></div><span className="map-legend-label">20-40</span><br/>
          <div className={"color-box sat-color-3"}></div><span className="map-legend-label">40-60</span><br/>
          <div className={"color-box sat-color-4"}></div><span className="map-legend-label">60-80</span><br/>
          <div className={"color-box sat-color-5"}></div><span className="map-legend-label">80-100</span><br/>
        </div>
      )
    } else {
      return (
        <div className="map-legend" style={mapLegendStyle}>
        </div>
      )
    }
  }

}

MapLegend.propTypes = {
  variable: PropTypes.string.isRequired,
};

export default MapLegend;
