import { DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { appInitialize } from './app-initialize';
import { KirbyBadge } from './components/proxies';

const DECLARATIONS = [
  // proxies
  KirbyBadge,
];

const EXPORTS = [...DECLARATIONS];

@NgModule({
  declarations: DECLARATIONS,
  exports: EXPORTS,
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitialize,
      deps: [DOCUMENT],
      multi: true,
    },
  ],
})
export class KirbyModule {}
