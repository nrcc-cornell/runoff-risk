import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

import convertRiskPercToRiskCat from './convertRiskPercToRiskCat';

HighchartsMore(Highcharts)

class ThreatColumnChart extends Component {

  defaults = {
      dbchart: {
        colors: ['#00aa00','#d6eaf8','#ffd700','#ffaa1c','#ff0000','#ee82ee'],
        zones: [1.01,1.03,2.1,3.1,4.01,4.03],
      },
      dbtable: {
        columns: 10,
        classes: ['no_risk','no_risk_fzn','low','moderate','high','high_fzn'],
        labels: ['No Risk','No Risk (FZN)','Low','Moderate','High','High (FZN)'],
        risk: ['no_risk','no_risk_fzn','low','moderate','high','high_fzn'],
      },
      dbthumbs: { count: 7, start: 'doi',},
    }

  data_model ={
        dashboard: {
          chart: Object.assign({}, this.defaults.dbchart, { seriesName:'Runoff Risk', }),
          table: this.defaults.dbtable,
        },
        description: "Runoff Risk Estimates",
  }

  createRiskCategories = (perc_array) => {
    return perc_array.map(x => convertRiskPercToRiskCat(x))
  }

  genChartConfig(data_model, model_data, model_dates, season) {
    let start_date = season.startDate;
    if (model_dates.firstValid && (model_dates.firstValid > start_date)) {
        start_date = model_dates.firstValid;
    }

    const dbchart = data_model.dashboard.chart;

    const zones = dbchart.zones.map(function(zone,index) {
        return { value:zone, className:'zone-'+(index+1).toString() }
    });

    const updateExtremes = ({ min, max }) => {
      Highcharts.charts.forEach((chart) => {if (chart) {chart.xAxis[0].setExtremes(min, max)}})
    };

    return {
      chart: { borderColor: '#98AFC7', borderWidth: 2, alignTicks:false, height:225, renderTo:'#dashboard-chart-container' },
      legend: { enabled:false },
      navigator:{ enabled:false, height:40, margin:5, handles:{ borderColor:'#0000ff' }, series: { type:'column' }, yAxis:{ min:0.5, max:4 } },
      plotOptions: { series: { pointStart: start_date, pointInterval: 24*3600*1000, }, },
      rangeSelector: { selected: 0, height: 0,
        inputEnabled: false, buttonTheme: { visibility: 'hidden' }, labelStyle: { visibility: 'hidden' },
      },
      scrollbar:{ enabled:false },
      series: [
        { colorByPoint: true,
          colors: dbchart.colors,
          data: model_data,
          dataLabels: {
            enabled:true,
            inside:true,
            formatter: function(){
              if (this.y<=1.5) {return 'NRE'};
              if (this.y===2) {return 'Low'};
              if (this.y===3) {return 'Mod'};
              if (this.y>=3.5) {return 'High'};
            }
          },
          name: dbchart.seriesName,
          type: 'column',
          zoneAxis: 'y',
          zones: zones, 
        },
      ],
      title: { text: 'Runoff Risk Forecasts* (Daily)', style: {fontWeight: 'bold'} },
      subtitle: null,
      tooltip: { enabled:false },
      type: 'column',
      xAxis: {
        title: { text: '*NRE: Little/No Runoff Expected' },
        type: 'datetime',
        dateTimeLabelFormats:{ day:'%d %b', week:'%d %b', month:'%b<br/>%Y', year:'%Y' },
        events: {
          afterSetExtremes (e) {
            updateExtremes(e)
          }
        }
      },
      yAxis: { title:null, max:4, min:0, labels:{ enabled:false }, tickInterval: 1,
      },
      zoneAxis: 'y',
      zones: zones, 
    }
  }

  render() {
    let data_model = this.data_model;
    let datastore = this.createRiskCategories(this.props.pointData['riskWinter'])
    let year = parseInt(this.props.pointData['dates'][0].slice(0,4),10)
    let month = parseInt(this.props.pointData['dates'][0].slice(4,6),10)
    let day = parseInt(this.props.pointData['dates'][0].slice(6,8),10)
    let model_dates = { 'firstValid': moment([year, month-1, day]).startOf('day') }
    let season = { 'startDate': moment([year, month-1, day]).startOf('day') }

    let dataForZones = datastore.map(x => {
      if (x===0) {
        return x+1.02
      } else if (x===5) {
        return x-0.98
      } else {
        return x
      }
    })

    let dailyExtremeTemp = this.props.pointData['mint'].map((x,i) => {
      return [this.props.pointData['mint'][i],this.props.pointData['maxt'][i]]
    })

    return (
      <div id="dashboard-chart-container">
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={this.genChartConfig(data_model, dataForZones, model_dates, season)}
        />
        <div>&nbsp;</div>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={Object.assign(this.genChartConfig(data_model, dataForZones, model_dates, season), {
            chart: { borderColor: '#98AFC7', borderWidth: 2, height:250, spacingTop: 10, marginTop: 0 },
            title: null,
            subtitle: null,
            legend: {
              enabled:true, verticalAlign: 'top', y: -38,
              itemStyle: { 'fontSize': '14px' }
            },
            rangeSelector: { selected: 0, height: 0,
              inputEnabled: false, buttonTheme: { visibility: 'hidden' }, labelStyle: { visibility: 'hidden' },
            },
            series: [{
              type: 'columnrange',
              name: 'Air Temp Range Fcst (°F)',
              data: dailyExtremeTemp, showInNavigator: true,
              dataLabels: { enabled:true },
              color: '#000000'
            },{
              type: 'line',
              name: '2" Soil Temp Fcst (°F)',
              data: this.props.pointData['soilTemp2in'], showInNavigator: false,
              color: '#aaaaaa',
              lineWidth: 3
            }],
            xAxis: {
              title: null,
              dateTimeLabelFormats:{ day:'%d %b', week:'%d %b', month:'%b<br/>%Y', year:'%Y' },
            },
            yAxis: {
              labels:{ enabled:true },
              plotLines: [{
                value: 32,
                color: '#0000ff',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: '32°F'
                }
              }]
            },
          })}
        />
        <div>&nbsp;</div>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={Object.assign(this.genChartConfig(data_model, dataForZones, model_dates, season), {
            chart: { borderColor: '#98AFC7', borderWidth: 2, height:250, spacingTop: 10, marginTop: 0 },
            title: null,
            subtitle: null,
            legend: {
              enabled:true, verticalAlign: 'top', y: -38,
              itemStyle: { 'fontSize': '14px' }
            },
            rangeSelector: { selected: 0, height: 0,
              inputEnabled: false, buttonTheme: { visibility: 'hidden' }, labelStyle: { visibility: 'hidden' },
            },
            series: [{
              type: 'area',
              name: 'Snow Water Equiv Fcst (in)',
              data: this.props.pointData['SWE'], showInNavigator: false,
              color: '#aed6f1'
            },{
              type: 'column',
              name: 'Rain+Snowmelt Fcst (in)',
              data: this.props.pointData['RAIM'], showInNavigator: true,
              dataLabels: {
                enabled:true,
                formatter: function(){
                  return (this.y!==0) ? this.y.toFixed(2) : '';
                }
              },
              color: '#00aa00'
            }],
            xAxis: {
              title: null,
              dateTimeLabelFormats:{ day:'%d %b', week:'%d %b', month:'%b<br/>%Y', year:'%Y' },
            },
            yAxis: {labels:{ enabled:true }},
          })}
        />
      </div>
    );
  }
}

ThreatColumnChart.propTypes = {
  pointData: PropTypes.object.isRequired,
};

export default ThreatColumnChart;
