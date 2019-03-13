import { Component, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'kirby-modal-page',
  template: '<p>Modal Content</p>'
})
export class IonicModalExampleComponent {

  // "value" passed in componentProps
  @Input() value: number;

  constructor(navParams: NavParams) {
    // componentProps can also be accessed at construction time using NavParams
  }

}
