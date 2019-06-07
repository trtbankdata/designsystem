import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'kirby-button-example',
  templateUrl: './button-example.component.html',
  styleUrls: ['./button-example.component.scss'],
})
export class ButtonExampleComponent {
  delayedObservable: Observable<any> = of(undefined).pipe(delay(3000));

  onSelect() {
    console.log(`button selected`);
  }
}
