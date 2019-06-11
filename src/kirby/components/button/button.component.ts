import { Observable } from 'rxjs';
import { Component, Input, HostListener, Renderer2 } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[kirby-button],Button[kirby-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() expand?: 'full' | 'block';
  @Input() disableOnSelectUntil?: Observable<any>;
  @Input() isFloating?: boolean = false;
  @Input() isIconBtn?: boolean = false;
  @Input() showShadow?: boolean = false;

  constructor(private renderer: Renderer2) {}

  @HostListener('click', ['$event']) onClick(e: any) {
    if (this.disableOnSelectUntil) {
      this.renderer.addClass(e.target, 'disabled-on-select');
      this.disableOnSelectUntil.subscribe((_) => {
        this.renderer.removeClass(e.target, 'disabled-on-select');
      });
    }
  }
}
