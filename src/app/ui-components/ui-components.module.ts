import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {MatButtonModule,
        MatCheckboxModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatInputModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatFormFieldModule} from '@angular/material';


import { COMPONENT_DECLARATIONS, ROUTES } from './ui-components.common';
import { IonicDatepickerComponent } from './components/ionic/ionic-datepicker/ionic-datepicker.component';
import { IonicButtonComponent } from './components/ionic/ionic-button/ionic-button.component';
import { IonicToggleComponent } from './components/ionic/ionic-toggle/ionic-toggle.component';
import { IonicCalendarComponent } from './components/ionic/ionic-calendar/ionic-calendar.component';
import { IonicSliderComponent } from './components/ionic/ionic-slider/ionic-slider.component';
import { IonicModalComponent } from './components/ionic/ionic-modal/ionic-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    IonicModule.forRoot(),
    MatButtonModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule
  ],
  declarations: [
    COMPONENT_DECLARATIONS,
    IonicCalendarComponent,
    IonicSliderComponent,
    IonicModalComponent

  ]
})
export class UiComponentsModule { }
