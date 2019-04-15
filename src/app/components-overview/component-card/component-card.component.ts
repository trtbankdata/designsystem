import { Component, OnInit } from '@angular/core';

import { DynamicComponent } from '~/kirby/components/shared/dynamic-component';

@Component({
  selector: 'kirby-component-card',
  templateUrl: './component-card.component.html',
  styleUrls: ['./component-card.component.scss'],
})
export class ComponentCardComponent implements OnInit, DynamicComponent {
  data: {
    name: string;
    description: string;
    icon: string;
  };

  constructor() {}

  ngOnInit() {}
}
