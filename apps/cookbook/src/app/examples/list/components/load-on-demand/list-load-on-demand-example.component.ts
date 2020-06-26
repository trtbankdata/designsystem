import { Component } from '@angular/core';

import { BaseListComponent } from '../base-list.component';
import { LoadOnDemandEvent } from '@kirbydesign/designsystem';

export const config = {
  selector: 'cookbook-list-load-on-demand-example',
  template: `<kirby-list [items]="items" (loadOnDemand)="onLoadDemand($event)" noMoreItemsText="No more items">
  <kirby-item *kirbyListItemTemplate="let item">
    <kirby-label>
      <h3>{{ item.title }}</h3>
      <p subtitle>{{ item.subTitle }}</p>
    </kirby-label>
    <kirby-label slot="end">
      <data [value]="item.amount">{{ item.amount }}</data>
      <data [value]="item.detail" detail>{{ item.detail }}</data>
    </kirby-label>
  </kirby-item>
</kirby-list>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ListLoadOnDemandExampleComponent extends BaseListComponent {
  template = config.template;
  private itemCount: number = 0;

  constructor() {
    super();
    this.items.push(...this.generateItems());
  }

  onLoadDemand(loadOnDemandEvent: LoadOnDemandEvent): void {
    // We end the load more event after 20 items, by sending null to the kirby list.
    if (this.itemCount <= 20) {
      // lets make a delay to simulate a HTTP call.
      setTimeout(() => {
        // make sure to update items reference to update list correctly
        this.items = [...this.items, ...this.generateItems()];
        loadOnDemandEvent.complete();
      }, 2000);
    } else {
      loadOnDemandEvent.complete(true);
    }
  }

  private generateItems(): any[] {
    const items = [];
    const numberOfItems = 10;
    for (let index = 0; index < numberOfItems; index++) {
      this.itemCount++;
      const transaction = {
        title: `Item ${this.itemCount}`,
        subTitle: `${Math.round(Math.random() * 100)} pcs`,
        amount: `${Math.round(Math.random() * 1000)} DKK`,
        detail: Math.round(Math.random() * 100),
      };
      items.push(transaction);
    }
    return items;
  }
}
