import { Component } from '@angular/core';

import { ModalController } from '@kirbydesign/angular';

@Component({
  templateUrl: './second-embedded-modal-example.component.html',
})
export class SecondEmbeddedModalExampleComponent {
  constructor(private modalController: ModalController) {}

  onHideSecond() {
    this.modalController.hideTopmost();
  }
}
