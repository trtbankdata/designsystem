import { AppGridModule } from './app-grid.module';

describe('AppShellModule', () => {
  let appGridModule: AppGridModule;

  beforeEach(() => {
    appGridModule = new AppGridModule();
  });

  it('should create an instance', () => {
    expect(appGridModule).toBeTruthy();
  });
});
