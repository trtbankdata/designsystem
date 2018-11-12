import { UiComponentsModule } from './ui-components.module';

describe('UiComponentsModule', () => {
  let uiComponentsModule: UiComponentsModule;

  beforeEach(() => {
    uiComponentsModule = new UiComponentsModule();
  });

  it('should create an instance', () => {
    expect(uiComponentsModule).toBeTruthy();
  });
});
