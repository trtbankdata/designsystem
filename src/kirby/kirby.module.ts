import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { declarations, imports } from './kirby.common';
import { InfiniteScrollDirective } from './components/list/directives/infinite-scroll.directive';

console.log(imports);

@NgModule({
  imports: [CommonModule, RouterModule, IonicModule.forRoot(), imports],
  declarations: [InfiniteScrollDirective, ...declarations],
  exports: [InfiniteScrollDirective, ...declarations, imports],
})
export class KirbyModule {}
