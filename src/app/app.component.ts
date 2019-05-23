import { Component, ViewContainerRef } from '@angular/core';

import { ModalVcRef } from '@kirbydesign/designsystem/components/modal/services/modal-vc-ref';

@Component({
  selector: 'kirby-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Kirby design system';
  constructor(private vcRef: ViewContainerRef) {
    ModalVcRef.setVcRef(this.vcRef);
  }
}
