import { forwardRef, Component } from '@angular/core';

import { AppComponent } from '@kirbydesign/angular';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-app',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: AppComponent,
      useExisting: forwardRef(() => MockAppComponent),
    },
  ],
})
export class MockAppComponent {}

// #endregion
