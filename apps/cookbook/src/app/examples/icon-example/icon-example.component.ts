import { Component } from '@angular/core';

import { defaultIcons } from '@kirbydesign/angular';
import { Sizes } from '@kirbydesign/angular';
import { Color, ColorHelper } from '@kirbydesign/angular';

@Component({
  selector: 'cookbook-icon-example',
  templateUrl: './icon-example.component.html',
  styleUrls: ['./icon-example.component.scss'],
})
export class IconExampleComponent {
  icons = defaultIcons;
  sizes = Sizes;
  color: Color;
  colors: Color[] = ColorHelper.mainColors;

  changeColor(color: Color) {
    this.color = color;
  }
}
