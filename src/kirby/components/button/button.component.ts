import { Observable } from 'rxjs';
import { Component, Input, HostListener, HostBinding, Renderer2 } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[kirby-button],Button[kirby-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @HostBinding('class.attention-level1')
  isAttentionLevel1: boolean = true; // Default
  @HostBinding('class.attention-level2')
  isAttentionLevel2: boolean;
  @HostBinding('class.attention-level3')
  isAttentionLevel3: boolean;
  @HostBinding('class.attention-level4')
  isAttentionLevel4: boolean;
  @HostBinding('class.destructive')
  destructive: boolean = false; // Default
  @Input() set attentionLevel(level: '1' | '2' | '3' | '4') {
    this.isAttentionLevel1 = level === '1';
    this.isAttentionLevel2 = level === '2';
    this.isAttentionLevel3 = level === '3';
    this.isAttentionLevel4 = level === '4';
  }
  @Input() set isDestructive(state: boolean) {
    this.destructive = state;
  }
  @Input() expand?: 'full' | 'block';
  @Input() disableOnSelectUntil?: Observable<any>;
  @Input() isFloating?: boolean = false;
  @Input() isIconBtn?: boolean = false;
  @Input() showShadow?: boolean = false;

  constructor(private renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  onClick(e: any) {
    if (this.disableOnSelectUntil) {
      this.renderer.addClass(e.target, 'disabled-on-select');
      this.disableOnSelectUntil.subscribe((_) => {
        this.renderer.removeClass(e.target, 'disabled-on-select');
      });
    }
  }

  @HostListener('tap', ['$event']) onTap(e: any) {
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
