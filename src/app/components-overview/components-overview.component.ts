import { Component, OnInit } from '@angular/core';

import { GridCardConfiguration } from '~/kirby/components/grid/grid-card-configuration';
import { ComponentCardComponent } from './component-card/component-card.component';

@Component({
  selector: 'kirby-components-overview',
  templateUrl: './components-overview.component.html',
  styleUrls: ['./components-overview.component.scss'],
})
export class ComponentsOverviewComponent implements OnInit {
  components = [
    {
      name: 'Badge',
      description:
        'Badges are a small component that typically communicate a numerical value to the user.',
      icon: 'assets/icons/components/Badge.svg',
    },
    {
      name: 'Button',
      description:
        "Buttons let your users take action. They're an essential way to interact with and navigate through an app.",
      icon: 'assets/icons/components/CTA.svg',
    },
    {
      name: 'Card',
      description:
        'Cards are a great way to display an important piece of content, and can contain images, buttons, text, and more.',
      icon: 'assets/icons/components/Cards.svg',
    },
    {
      name: 'Floating Action Button',
      description:
        'Floating action buttons are circular buttons that perform a primary action on a screen.',
      icon: 'assets/icons/components/FAB.svg',
    },
    {
      name: 'List',
      description:
        'Lists can display rows of information, such as a contact list, playlist, or menu.',
      icon: 'assets/icons/components/List.svg',
    },
  ];
  cardConfigurations: GridCardConfiguration[] = [];

  constructor() {}

  ngOnInit() {
    this.cardConfigurations = this.components.map((c) => {
      return new GridCardConfiguration(
        ComponentCardComponent,
        {
          name: c.name,
          description: c.description,
          icon: c.icon,
        },
        1
      );
    });
  }
}
