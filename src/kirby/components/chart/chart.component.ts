import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild, Inject } from '@angular/core';
import { Options } from 'highcharts';

import { ChartHelper } from './chart-helper';
import { DonutOptions, DONUT_OPTIONS } from './options/donut';
import { AreaSplineOptions, AREASPLINE_OPTIONS } from './options/areaspline';
import { ACTIVITYGAUGE_OPTIONS, ActivityGaugeOptions } from './options/activitygauge';
import { ChartType } from './chart-type';
import { PROGRESSBAR_OPTIONS, ProgressbarOptions } from './options/progressbar';

@Component({
  selector: 'kirby-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [
    ChartHelper,
    { provide: DONUT_OPTIONS, useValue: DonutOptions },
    { provide: AREASPLINE_OPTIONS, useValue: AreaSplineOptions },
    { provide: ACTIVITYGAUGE_OPTIONS, useValue: ActivityGaugeOptions },
    { provide: PROGRESSBAR_OPTIONS, useValue: ProgressbarOptions },
  ],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() data = [];
  @Input() height = 300;
  @Input() type: ChartType = ChartType.PIE;
  @Input() description = '';
  @Input() showDataLabels = true;
  @ViewChild('chartContainer') chartContainer: ElementRef;
  options: Options = {};

  constructor(
    private chartHelper: ChartHelper,
    @Inject(DONUT_OPTIONS) public donutOptions: Options,
    @Inject(AREASPLINE_OPTIONS) public areasplineOptions: Options,
    @Inject(ACTIVITYGAUGE_OPTIONS) public activitygaugeOptions: Options,
    @Inject(PROGRESSBAR_OPTIONS) public progressbarOptions: Options
  ) {}

  ngOnInit() {
    this.setupChartType();
    this.updateProperties();
    this.chartHelper.init(this.options, this.chartContainer);
  }

  ngOnChanges() {
    this.updateProperties();
    this.chartHelper.updateChart(this.options);
  }

  setupChartType() {
    switch (this.type) {
      case ChartType.DONUT: {
        this.options = this.donutOptions;
        this.options.chart.type = ChartType.PIE;
        this.options.plotOptions.pie.innerSize = '50%';
        break;
      }
      case ChartType.PIE: {
        this.options = this.donutOptions;
        this.options.chart.type = this.type;
        this.options.plotOptions.pie.innerSize = '0%';
        break;
      }
      case ChartType.AREASPLINE: {
        this.options = this.areasplineOptions;
        this.options.chart.type = this.type;
        break;
      }
      case ChartType.ACTIVITYGAUGE: {
        this.options = this.activitygaugeOptions;
        this.options.chart.type = this.type;
        break;
      }
      case ChartType.PROGRESSBAR: {
        this.options = this.progressbarOptions;
      }
    }
  }

  updateProperties() {
    if (this.options.chart) {
      this.options.chart.height = this.height;
      this.options.chart.description = this.description;
      switch (this.options.chart.type) {
        case ChartType.PIE:
          this.options.plotOptions.pie.dataLabels.enabled = this.showDataLabels;
        /* falls through */
        case ChartType.DONUT: {
          this.options.series = [
            {
              type: 'pie',
              data: this.data as Array<Highcharts.SeriesPieDataOptions>,
            },
          ];
          break;
        }
        case ChartType.AREASPLINE: {
          this.options.series = [
            {
              type: 'areaspline',
              data: this.data as Array<Highcharts.SeriesAreasplineDataOptions>,
            },
          ];
          break;
        }
        case ChartType.ACTIVITYGAUGE: {
          const data = this.data[0];

          this.options.title.text = data.title;
          this.options.subtitle.text = data.subtitle;

          if (data.paneBackgroundColor) {
            this.options.pane.background = [
              {
                ...this.options.pane.background[0],
                backgroundColor: data.paneBackgroundColor,
              },
            ];
          }
          if (data.color) {
            this.options.title.style.color = data.color;
            this.options.subtitle.style.color = data.color;
          }
          this.options.series = [
            {
              type: 'solidgauge',
              data: data.series as Array<Highcharts.SeriesGaugeDataOptions>,
            },
          ];

          break;
        }
        case ChartType.PROGRESSBAR: {
          console.log('Updating progress bar!');
          const nonProgress = [this.data[0]];
          const progress = [this.data[1]];

          this.options.series = [
            {
              type: 'bar',
              data: nonProgress,
              grouping: false,
              animation: { duration: 0 },
              enableMouseTracking: false,
              showInLegend: false,
              color: '#bfd6ce',
              pointWidth: 16,
              borderWidth: 0,
              borderRadius: 15,
            },
            {
              type: 'bar',
              data: progress,
              borderRadius: 15,
              color: '#005C3C',
              borderWidth: 0,
              pointWidth: 16,
              animation: {
                duration: 1000,
              },
              enableMouseTracking: false,
            },
          ];
        }
      }
    }
  }
}
