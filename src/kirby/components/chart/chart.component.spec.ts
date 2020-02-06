import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { Options } from 'highcharts';

import { ChartComponent } from './chart.component';
import { ChartType } from './chart-type';
import { ChartHelper } from '@kirbydesign/designsystem/components/chart/chart-helper';
import { DONUT_OPTIONS } from '@kirbydesign/designsystem/components/chart/options/donut';
import { AREASPLINE_OPTIONS } from '@kirbydesign/designsystem/components/chart/options/areaspline';
import { TIMESERIES_OPTIONS } from '@kirbydesign/designsystem/components/chart/options/timeseries';
import { ACTIVITYGAUGE_OPTIONS } from '@kirbydesign/designsystem/components/chart/options/activitygauge';

describe('ChartComponent', () => {
  const createComponent = createComponentFactory({
    component: ChartComponent,
    mocks: [ChartHelper],
    providers: [
      {
        provide: DONUT_OPTIONS,
        useValue: {},
      },
      {
        provide: AREASPLINE_OPTIONS,
        useValue: {},
      },
      {
        provide: TIMESERIES_OPTIONS,
        useValue: {},
      },
      {
        provide: ACTIVITYGAUGE_OPTIONS,
        useValue: {},
      },
    ],
  });

  let spectator: Spectator<ChartComponent>;
  let component: ChartComponent;

  const expectedDefaultHeight = 300;

  beforeEach(() => {
    spectator = createComponent({
      props: {
        data: [],
      },
    });
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct default height input', () => {
    expect(component.height).toBe(expectedDefaultHeight);
  });

  it('should set correct default chart height', () => {
    expect(component.options.chart.height).toBe(expectedDefaultHeight);
  });

  it('should set correct non-default chart height', () => {
    const expectedHeight = 400;
    spectator.setInput({ height: expectedHeight });
    spectator.detectComponentChanges();
    expect(component.options.chart.height).toBe(expectedHeight);
  });

  it('should have correct default chart type', () => {
    expect((component.type = ChartType.PIE));
    expect(component.options.chart.type).toBe(ChartType.PIE);
    expect(component.options.plotOptions.pie.innerSize).toBe('0%');
  });

  it('should convert donut chart type to highcharts pie with 50% innerSize', () => {
    spectator.setInput({ type: ChartType.DONUT });
    spectator.detectComponentChanges();
    expect((component.type = ChartType.DONUT));
    expect(component.options.chart.type).toBe(ChartType.PIE);
    expect(component.options.plotOptions.pie.innerSize).toBe('50%');
  });

  it('should set areaspline chart type', () => {
    spectator.setInput({ type: ChartType.AREASPLINE });
    spectator.detectComponentChanges();
    expect((component.type = ChartType.AREASPLINE));
    expect(component.options.chart.type).toBe(ChartType.AREASPLINE);
  });

  it('should have dataLabels enabled as default', () => {
    expect(component.options.plotOptions.pie.dataLabels.enabled).toBe(true);
  });

  it('should disable dataLabels when false', () => {
    spectator.setInput({ showDataLabels: false });
    spectator.detectComponentChanges();
    expect(component.options.plotOptions.pie.dataLabels.enabled).toBe(false);
  });

  it('should set correct input data in chart series', () => {
    spectator.setInput({
      data: [
        {
          name: 'Boomerangs 20%',
          y: 20,
          label: '20%',
        },
        {
          name: 'Bubbles 41%',
          y: 41,
          label: '41%',
        },
      ],
    });
    spectator.detectComponentChanges();
    const data = (component.options.series[0] as Highcharts.SeriesAreasplineOptions).data;
    expect(data.length).toBe(2);
    expect(data[0]['name']).toBe('Boomerangs 20%');
  });

  describe('ActivityGauge', () => {
    it('should set correct title and subtitle', () => {
      spectator.setInput({
        type: ChartType.ACTIVITYGAUGE,
        data: [
          {
            title: '1.234.567',
            subtitle: 'Afdraget',
          },
        ],
      });
      spectator.detectComponentChanges();

      expect(component.options.title.text).toBe('1.234.567');
      expect(component.options.subtitle.text).toBe('Afdraget');
    });

    it('should add backgroundColor to optionsarray', () => {
      const activityGaugeOptions: Options = {
        pane: {
          background: [
            {
              backgroundColor: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [[1, 'rgba(255, 255, 255, 0.3)'], [0, 'rgba(255, 255, 255, 0.3)']],
              },
              outerRadius: '112%',
              innerRadius: '88%',
              borderWidth: 0,
            },
          ],
        },
      };

      spectator.setInput({
        type: ChartType.ACTIVITYGAUGE,
        options: activityGaugeOptions,
        data: [
          {
            paneBackgroundColor: 'red',
          },
        ],
      });
      spectator.detectComponentChanges();

      expect(component.options.pane.background[0].backgroundColor).toEqual(
        component.data[0].paneBackgroundColor
      );
    });

    it('should change title and subtitle color when color-attribute is set', () => {
      spectator.setInput({
        type: ChartType.ACTIVITYGAUGE,
        data: [
          {
            color: 'red',
          },
        ],
      });
      spectator.detectComponentChanges();

      const expected = component.data[0].color;
      expect(component.options.title.style.color).toEqual(expected);
      expect(component.options.subtitle.style.color).toEqual(expected);
    });

    it('should set type to solidgauge when ACTIVITYGAUGE is chosen', () => {
      spectator.setInput({
        type: ChartType.ACTIVITYGAUGE,
        data: [
          {
            title: '',
            subtitle: '',
          },
        ],
      });
      spectator.detectComponentChanges();

      expect(component.options.series[0].type).toEqual('solidgauge');
    });

    it('should set activitygauge chart type', () => {
      spectator.setInput({
        type: ChartType.ACTIVITYGAUGE,
        data: [
          {
            title: 'test',
            subtitle: 'test',
          },
        ],
      });
      spectator.detectComponentChanges();
      expect(component.options.chart.type).toBe(ChartType.ACTIVITYGAUGE);
    });
  });
});
