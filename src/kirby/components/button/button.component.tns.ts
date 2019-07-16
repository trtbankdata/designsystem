import { Observable } from 'rxjs';
import { Component, Input, HostListener, Renderer2, NgZone } from '@angular/core';
import { EventData, View } from 'tns-core-modules/ui/core/view/view';

declare var require: any;
const style: any = require('sass-extract-loader!./button.component.scss');

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

  getThemeColor(name: string) {
    return style.global['$kirby-colors'].value[name].value;
  }
}
