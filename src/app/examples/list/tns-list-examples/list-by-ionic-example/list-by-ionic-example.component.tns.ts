import { Component, OnInit } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';

@Component({
  templateUrl: './list-by-ionic-example.component.tsn.html',
  styleUrls: ['./list-by-ionic-example.component.tns.scss'],
})
export class KirbyListByIonicExampleComponent implements OnInit {
  private _items: ObservableArray<any>;
  constructor() {}

  ngOnInit() {
    this._items = new ObservableArray(this.getItems());
  }

  public get dataItems(): ObservableArray<any> {
    return this._items;
  }

  private getItems() {
    return [
      {
        id: 0,
        name: 'Per Høyer',
      },
      {
        id: 1,
        name: 'Signe Moustgaard',
      },
      {
        id: 2,
        name: 'Lars Larsen',
      },
      {
        id: 3,
        name: 'Alexander',
      },
    ];
  }

  imageSrc =
    'https://www.jyskebank.dk/portletcontext-employeesuggest/EmployeePictureServlet' +
    '?large=true&employeeId=40501db73fd6677b9671ebb934f3f2e0';
}
