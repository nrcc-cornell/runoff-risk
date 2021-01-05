///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const LoadForecastDates = () => {
        let url_string = "http://tools.climatesmartfarming.org/runoff-risk/fcst-dates-only"
        //console.log('in LoadForecastDates')
        return fetch(url_string)
             .then(r => r.json())
             .then(data => {
               return (data) ? data : null;
             });
}

export default LoadForecastDates;
