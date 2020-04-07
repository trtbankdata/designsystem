import { forwardRef, Component, Input } from '@angular/core';

import { FullscreenLoadingOverlayComponent } from '@kirbydesign/angular';

// #region AUTO-GENERATED - PLEASE DON'T EDIT CONTENT WITHIN!
@Component({
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: FullscreenLoadingOverlayComponent,
      useExisting: forwardRef(() => MockFullscreenLoadingOverlayComponent),
    },
  ],
})
export class MockFullscreenLoadingOverlayComponent {
  @Input() showBackdrop: boolean;
}

// #endregion
