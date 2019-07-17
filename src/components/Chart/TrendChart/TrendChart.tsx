import React, { Component } from 'react';

import axios from 'axios';
import { connect } from "react-redux";
import { AppState } from "../../../store";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import { MapPoint, MapState } from '../../../store/map/maptypes';
import { selectMapId } from '../../../store/map/mapactions';

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dark);

interface AppProps {
    selectMapId: typeof selectMapId;
    map: MapState;
  }
  

export class TrendChart extends Component<AppProps> {

    c: any = null;

    componentWillUpdate() {
        console.log('**********TrendChart.componentWillUpdate');
    }

    componentDidUpdate() {
        console.log('**********TrendChart.componentDidUpdate');
    }

    componentDidMount() {

        console.log('**********TrendChart.componentDidMount');

        this.props.selectMapId({
            id: "MAP_ID_123"
          });

        /*
        let url = 'https://sthdata.tampere.fiware.cityvision.cloud/v2/entities/KV-0128-263';
        url += "?attrs=illuminanceLevel%2CactivePower&fromDate=1561986246958&toDate=156259104695";
        axios
            .get(url, { 'headers': { "FIWARE-Service": "tampere" } })
            .then(res => {
                    console.log(">>>>>>>>>data:",res.data);
                }
            );
        */

        let chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.paddingRight = 20;

        let data = [];
        let visits = 10;
        for (let i = 1; i < 366; i++) {
            visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
            data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
        }

        chart.data = data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        //valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.strokeWidth = 3;

        series.tooltipText = "{valueY.value}";
        chart.cursor = new am4charts.XYCursor();
        /*
            let scrollbarX = new am4charts.XYChartScrollbar();
            scrollbarX.series.push(series);
            chart.scrollbarX = scrollbarX;
        */
        //this.chart = chart;
        this.c = chart;
    }

    componentWillUnmount() {
        /*
      if (this.chart) {
        this.chart.dispose();
      }
      */

        if (this.c) {
            this.c.dispose();
        }
    }

    render() {

        console.log('**********TrendChart.render');

        return (
            <>
                <div style={{ height: '30%', width: '80%', backgroundColor: '#373635', position: 'absolute', bottom: 0, marginLeft: 284, border: '3px solid #ccc', borderRadius: 10 }}>
                    <div id="chartdiv" style={{ height: '100%', width: '100%' }}></div>
                </div>
                <div>
                    <br />
                    test: this.props.selectedMapPoint.id
                    <br />
                </div>
            </>
        )
    }

}

const mapStateToProps = (state: AppState) => ({
  map: state.map
});

export default connect(
  mapStateToProps,
  { selectMapId }
)(TrendChart);
