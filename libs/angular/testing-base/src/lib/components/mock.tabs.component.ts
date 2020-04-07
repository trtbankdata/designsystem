import { forwardRef, Component } from '@angular/core';

import { TabsComponent } from '@kirbydesign/angular';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  selector: 'kirby-tab-bar',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: TabsComponent,
      useExisting: forwardRef(() => MockTabsComponent),
    },
  ],
})
export class MockTabsComponent {}

// #endregion
