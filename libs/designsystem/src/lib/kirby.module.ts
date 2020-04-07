import { NgModule } from '@angular/core';

import { KirbyModule as KirbyAngularModule } from '@kirbydesign/angular';

@NgModule({
  imports: [KirbyAngularModule],
  exports: [KirbyAngularModule],
})
export class KirbyModule {}
