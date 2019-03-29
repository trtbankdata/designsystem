import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class KirbyLabelComponent {
  @Input() position: string;
}
