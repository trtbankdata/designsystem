import { Options } from "highcharts";
import { InjectionToken } from "@angular/core";

export const PROGRESSBAR_OPTIONS = new InjectionToken<Options>('ProgressbarOptions');
export const ProgressbarOptions: Options = {
  title: {
    text: '',
  },
  chart: {
    renderTo: 'container',
    height: 20,
    type: 'bar'
  },
  credits: { enabled: false },
  tooltip: { enabled: false },
  legend: {
    layout: 'vertical',
    symbolRadius: 0,
    itemStyle: {
      fontSize: '.875rem',
    },
  },
  navigation: {
    buttonOptions: {
      enabled: false
    }
  },
  xAxis: {
    visible: false,
  },
  yAxis: {
    visible: false,
    min: 0,
    max: 100,
  },
  series: [{
    type: 'bar',
    data: [100],
    grouping: false,
    animation: { duration: 100 },
    enableMouseTracking: false,
    showInLegend: false,
    color: 'lightskyblue',
    pointWidth: 50,
    borderWidth: 0,
    borderRadius: 20,
    // dataLabels: {
    //   className: 'highlight',
    //   format: '150 / 600',
    //   enabled: true,
    //   align: 'right',
    //   style: {
    //     color: 'white',
    //     textOutline: false,
    //   }
    // }
  }, {

    type: 'bar',
    enableMouseTracking: false,
    data: [25],
    borderRadius: 20,
    color: 'navy',
    borderWidth: 0,
    pointWidth: 25,
    animation: {
      duration: 250,
    },
    // dataLabels: {
    //   enabled: true,
    //   inside: true,
    //   align: 'left',
    //   format: '{point.y}%',
    //   style: {
    //     color: 'white',
    //     textOutline: false,
    //   }
    // }
  }]
}