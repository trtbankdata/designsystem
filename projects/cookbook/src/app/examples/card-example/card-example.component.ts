import { Component } from '@angular/core';

import { DynamicComponent } from '@kirbydesign/designsystem/components/shared/dynamic-component';

@Component({
  selector: 'kirby-card-example',
  templateUrl: './card-example.component.html',
  styleUrls: ['./card-example.component.scss'],
})
export class CardExampleComponent implements DynamicComponent {
  data: any;
}
