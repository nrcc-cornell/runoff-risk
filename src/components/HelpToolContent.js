///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

import React from 'react';
//import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const HelpToolLocation = () => {
        return (
            <Box maxWidth={600} padding={1} border={1} borderRadius={4} borderColor="primary.main" bgcolor="#f5f5dc">
              <p>
                This section of the <b>Runoff Risk Forecast</b> tool summarizes your selected location details.
              </p>
              <p>
                <b>Longitude and latitude</b> coordinates will always be provided. Additionally, if your location was selected by typing in an address, that <b>address</b> is also provided.
              </p>
              <p>
                The <b>CHANGE LOCATION</b> button clears the currently selected location, and presents you with a regional forecast map. Inside the map, you have the option of selecting a new location to see its specific extended point forecast.
              </p>
              <p>
                For more details, please click the <b>HOW TO</b> tab at the top of this page.
              </p>
            </Box>
        );
} 

const HelpToolFcst72hr = () => {
        return (
            <Box maxWidth={600} padding={1} border={1} borderRadius={4} borderColor="primary.main" bgcolor="#f5f5dc">
              <p>
                This section of the <b>Runoff Risk Forecast</b> tool summarizes the maximum runoff risk expected over the next 3 days. The dates included in this short-term forecast summary are listed in the header of this section.
              </p>
              <p>
                Forecast models run overnight. When finished, updated forecasts are posted at approximately 6:30am ET each morning.
              </p>
              <span>
                Forecasted <b>risk categories</b> issued under <b>non-frozen conditions</b> include:<br/>
                <ul>
                <li><b><span style={{color:'#52be80'}}>NO RUNOFF EXPECTED (NRE)</span></b> </li>
                <li><b><span style={{color:'#ffd700'}}>LOW RISK</span></b> </li>
                <li><b><span style={{color:'#ffaa1c'}}>MODERATE RISK</span></b> </li>
                <li><b><span style={{color:'#ff0000'}}>HIGH RISK</span></b> </li>
                </ul>
                Forecasted <b>risk categories</b> issued under <b>frozen conditions</b> include:<br/>
                <ul>
                <li><b><span style={{color:'#5dade2'}}>NO RUNOFF EXPECTED (NRE)</span></b> </li>
                <li><b><span style={{color:'#8e44ad'}}>HIGH RISK</span></b> </li>
                </ul>
              </span>
              <p>
                Clicking the <b>SHOW ASSUMPTIONS</b> button provides you with important details about current conditions used by the model for this location. You can use this information to verify that data used for model input is consistent with your local field conditions.
              </p>
              <p>
                For details about available risk categories, please click the <b>HOW TO</b> tab at the top of this page.
              </p>
            </Box>
        );
} 

const HelpToolFcstDetails = () => {
        return (
            <Box maxWidth={600} padding={1} border={1} borderRadius={4} borderColor="primary.main" bgcolor="#f5f5dc">
              <p>
                This section of the <b>Runoff Risk Forecast</b> tool provides daily details of the full 10-day runoff risk forecast.
              </p>
              <p>
                The <b>main color table</b> at the top of this section shows the upcoming 72-hr risk beginning on each date, along with the individual daily risks that comprise the 72-hr risk forecasts.
              </p>
              <p>
                Clicking on the <b>SHOW DETAILS</b> button provides some key components of the daily weather forecasts over the next 10 days.
              </p>
              <p>
                For more details, please click the <b>HOW TO</b> tab at the top of this page.
              </p>
            </Box>
        );
} 

const HelpToolMap = () => {
        return (
            <Box maxWidth={800} padding={1} border={1} borderRadius={4} borderColor="primary.main" bgcolor="#f5f5dc">
              <p>
                This section of the <b>Runoff Risk Forecast</b> tool provides regional forecast maps for New York State over the next 5 days. Available user selections include items below.
              </p>
              <span>
                <b>VARIABLE</b> is the type of forecast element available to view.<br/>
                <ul>
                <li><b>Runoff Risk (72-hour)</b>: The highest runoff risk category expected over the selected 3-day period.</li>
                <li><b>Runoff Risk (24-hour)</b>: The runoff risk category expected on the selected day.</li>
                <li><b>Precipitation (in)</b>: Liquid-equivalent of all rain/snow forecasted for selected day.</li>
                <li><b>Snow Water Equivalent (in)</b>: Amount of water in snowpack, if the snow were melted and measured.</li>
                <li><b>Soil Saturation (%)</b>: The percent of soil saturation, at specified depth.</li>
                <li><b>Soil Temperature (F)</b>: The temperature of the soil, at specified depth.</li>
                </ul>
              </span>
              <p>
                <b>FORECAST DATE</b> is the day, or range of days, a forecast is valid for.<br/>
              </p>
              <span>
                <b>LOCATION SELECTION</b> is performed within the regional forecast map.<br/>
                <ul>
                <li><b>If a location is not yet selected</b>: Enter an address or click on the map to select a location. You can fine-tune your selection under a satellite view before saving the location.</li>
                <li><b>If a location is selected</b>: You can change the location by clicking 'CLEAR SELECTION' before selecting a new location.</li>
                </ul>
              </span>
              <p>
                For more details, please click the <b>HOW TO</b> tab at the top of this page.
              </p>
            </Box>
        );
} 

const HelpToolMapFineTuneSelection = () => {
        return (
            <Box maxWidth={800} padding={1} border={1} borderRadius={4} borderColor="primary.main" bgcolor="#f5f5dc">
              <p>
                <b>FINE-TUNING AND SAVING LOCATION</b>
              </p>
              <p>
                After initial location selection, you have the option of fine-tuning the selection within a satellite view of the area.
              </p>
              <p>
                Pan the map, and click to modify your initial selection at a specific field or point of interest. Once your fine-tuning is complete, you can click 'SAVE THIS LOCATION" within the popup box. A regional forecast map of runoff risk will appear, with location details inside the popup box. Location-specific forecast information will appear next to the regional forecast map. Depending on your view, the location-specific forecasts will be to the left or above the map.
              </p>
              <p>
                For more details, please click the <b>HOW TO</b> tab at the top of this page.
              </p>
            </Box>
        );
} 

export {HelpToolLocation, HelpToolFcst72hr, HelpToolFcstDetails, HelpToolMap, HelpToolMapFineTuneSelection};

