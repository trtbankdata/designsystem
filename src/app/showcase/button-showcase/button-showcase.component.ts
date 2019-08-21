import { Component } from '@angular/core';
declare var require: any;

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';

@Component({
  selector: 'kirby-button-showcase',
  templateUrl: './button-showcase.component.html',
  styleUrls: ['./button-showcase.component.scss'],
})
export class ButtonShowcaseComponent {
  themeColors = ['light', 'white', 'dark'];
  themeColor = '';
  exampleHtml: string = require('../../examples/button-example/button-example.component.html');
  properties: ShowcaseProperty[] = [
    {
      name: 'expand',
      description:
        '(Optional) If the button needs to expand to full width of its parent container, then use expand.',
      defaultValue: '',
      inputValues: ['block'],
    },
    {
      name: 'size',
      description: 'Sets the size of the button.',
      defaultValue: 'md',
      inputValues: ['sm', 'md', 'lg'],
    },
    {
      name: 'attentionLevel',
      description:
        'Sets the attention level for the button. Button color will be updated automatically depending on host color.',
      defaultValue: '1',
      inputValues: ['1', '2', '3', '4'],
    },
    {
      name: 'isDestructive',
      description:
        'If isDestructive is set, color of the button will be changed according to attention level.',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
    {
      name: 'disabled',
      description:
        '(Optional) Disables the button. It is possible to omit the inputs e.g. <kirby-button disabled></kirby-button>.',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
    {
      name: 'isOutlinedOnFocus',
      description: '(Optional) Toggle the button outline on focus (Web only).',
      defaultValue: 'true',
      inputValues: ['boolean'],
    },
    {
      name: 'isFloating',
      description:
        '(Optional) Determine if the button is going to be a floating action button. Notes: Floating action buttons have an elevation of z8 by default. Floating action buttons have only an icon and no text. Floating action buttons always have a size of 64x64.',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
    {
      name: 'isIconButton',
      description:
        "(Optional) Determine if the button is going to be an icon button. Notes: Icon buttons have only an icon and no text. Icon buttons always have a size of 48x48 corresponding to kirby size('xxl'). Icon buttons always have a light background color.",
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
    {
      name: 'hideShadow',
      description:
        '(Optional) Hides the shadow. Note: This input property is only used on floating action buttons.',
      defaultValue: 'false',
      inputValues: ['boolean'],
    },
    {
      name: 'iconName',
      description:
        '(Optional) Name of the kirby icon that will be shown inside the button. Note: This input property is required on floating action buttons and icon buttons and if unspecified, the default "cog" icon will be displayed.',
      defaultValue: '',
      inputValues: ['string'],
    },
  ];

  onChange(value) {
    this.themeColor = value;
  }
}
