/// <reference path="../../testing/element-css-custom-matchers.d.ts"/>

import { MockComponent } from 'ng-mocks';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { ElementCssCustomMatchers } from '../../testing/element-css-custom-matchers';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let spectator: SpectatorHost<ButtonComponent>;
  let component: ButtonComponent;
  let element: HTMLButtonElement;

  const createHost = createHostFactory({
    component: ButtonComponent,
    declarations: [ButtonComponent, MockComponent(IconComponent)],
  });

  beforeEach(() => {
    jasmine.addMatchers(ElementCssCustomMatchers);
    spectator = createHost('<button kirby-button>Test</button>');
    component = spectator.component;
    element = spectator.element as HTMLButtonElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with correct background-color', () => {
    expect(element).toHaveThemeBackgroundColor('primary');
  });

  it('should render with correct border-color', () => {
    expect(element).toHaveThemeBorderColor('primary');
  });

  it('should render with correct color', () => {
    expect(element).toHaveThemeColor('primary', 'contrast');
  });

  describe('when disabled', () => {
    beforeEach(() => {
      element.disabled = true;
    });

    it('should render with correct background-color', () => {
      expect(element).toHaveThemeBackgroundColor('light', 'tint');
    });

    it('should render with correct border-color', () => {
      expect(element).toHaveThemeBorderColor('light', 'tint');
    });

    it('should render with correct color', () => {
      expect(element).toHaveThemeColor('semi-dark', 'shade');
    });
  });

  describe('when configured with attentionlevel 1', () => {
    beforeEach(() => {
      spectator.component.attentionLevel = '1';
      spectator.detectChanges();
    });

    it('should render with correct background-color', () => {
      expect(element).toHaveThemeBackgroundColor('primary');
    });

    it('should render with correct border-color', () => {
      expect(element).toHaveThemeBorderColor('primary');
    });

    it('should render with correct color', () => {
      expect(element).toHaveThemeColor('white', 'contrast');
    });
  });

  describe('when configured with attentionlevel 2', () => {
    beforeEach(() => {
      spectator.component.attentionLevel = '2';
      spectator.detectChanges();
    });

    it('should render with correct background-color', () => {
      expect(element).toHaveThemeBackgroundColor('white');
    });

    it('should render with correct border-color', () => {
      expect(element).toHaveThemeBorderColor('white');
    });

    it('should render with correct color', () => {
      expect(element).toHaveThemeColor('white', 'contrast');
    });
  });

  describe('when configured with attentionlevel 3', () => {
    beforeEach(() => {
      spectator.component.attentionLevel = '3';
      spectator.detectChanges();
    });

    it('should render with no background-color', () => {
      expect(element).toHaveBackgroundColor('transparent');
    });

    it('should render with correct border-color', () => {
      expect(element).toHaveThemeBorderColor('medium');
    });

    it('should render with correct color', () => {
      expect(element).toHaveThemeColor('medium', 'contrast');
    });
  });

  describe('when configured with attentionlevel 4', () => {
    beforeEach(() => {
      spectator.component.attentionLevel = '4';
      spectator.detectChanges();
    });

    it('should render with no background-color', () => {
      expect(element).toHaveBackgroundColor('transparent');
    });

    it('should render with no border-color', () => {
      expect(element).toHaveBorderColor('transparent');
    });

    it('should render with correct color', () => {
      expect(element).toHaveThemeColor('primary', 'contrast');
    });
  });
});
