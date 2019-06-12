import { Observable } from 'rxjs';
import { Component, Input, HostListener, Renderer2, NgZone } from '@angular/core';
import { EventData, View } from 'tns-core-modules/ui/core/view/view';
import { Color } from 'tns-core-modules/color';

declare const CGSizeMake: any;
declare const android: any;
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
  view: View;

  constructor(private renderer: Renderer2, private zone: NgZone) {}

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

  onViewLoaded(args: EventData) {
    this.view = <View>args.object;
    console.log('add shadow ...');
    this.addShadow();
  }

  // TODO: extract a shared function; logic of adding shadow is the same as in many other components;
  addShadow(): void {
    if (!this.showShadow || !this.isFloating) {
      return;
    }

    const shadowColor = this.getThemeColor('primary-shade');

    if (this.view.android) {
      let nativeView = this.view.android;
      var shape = new android.graphics.drawable.GradientDrawable();
      shape.setShape(android.graphics.drawable.GradientDrawable.OVAL);
      shape.setColor(android.graphics.Color.parseColor(shadowColor));
      nativeView.setBackgroundDrawable(shape);
      nativeView.setElevation(15);
    } else if (this.view.ios) {
      let nativeView = this.view.ios;
      nativeView.layer.shadowColor = new Color(shadowColor).ios.CGColor;
      nativeView.layer.shadowOffset = CGSizeMake(0, 2.0);
      nativeView.layer.shadowOpacity = 0.3;
      nativeView.layer.shadowRadius = 5.0;
    }
  }

  getThemeColor(name: string) {
    return style.global['$kirby-colors'].value[name].value;
  }
}
