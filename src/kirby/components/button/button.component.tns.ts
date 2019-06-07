import { Observable } from 'rxjs';
import { Component, Input, HostListener, Renderer2 } from '@angular/core';
import { EventData } from 'tns-core-modules/ui/core/view/view';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[kirby-button],Button[kirby-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() expand?: 'full' | 'block';
  @Input() disableOnSelectUntil?: Observable<any>;

  constructor(private renderer: Renderer2) {}

  @HostListener('tap', ['$event']) onTap(e: EventData) {
    if (this.disableOnSelectUntil) {
      this.renderer.addClass(e.object, 'disabled-on-select');
      this.renderer.setAttribute(e.object, 'isEnabled', 'false');
      this.disableOnSelectUntil.subscribe((_) => {
        this.renderer.setAttribute(e.object, 'isEnabled', 'true');
        this.renderer.removeClass(e.object, 'disabled-on-select');
      });
    }
  }
}
