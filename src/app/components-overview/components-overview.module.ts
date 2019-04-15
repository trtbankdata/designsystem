import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { KirbyModule } from '../../kirby/kirby.module';
import { ComponentsOverviewComponent } from './components-overview.component';
import { ComponentCardComponent } from './component-card/component-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComponentsOverviewComponent,
      },
    ]),
    KirbyModule,
    IonicModule.forRoot(),
  ],
  declarations: [ComponentsOverviewComponent, ComponentCardComponent],
  entryComponents: [ComponentCardComponent],
})
export class ComponentsOverviewModule {}
