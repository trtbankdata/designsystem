import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { KirbyModule } from '../../kirby/kirby.module';
import { ExamplesModule } from '../examples/examples.module';
import { ROUTES, COMPONENT_DECLARATIONS } from './app-shell.common';

@NgModule({
  imports: [
    CommonModule,
    KirbyModule,
    ExamplesModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [COMPONENT_DECLARATIONS]
})
export class AppShellModule { }
