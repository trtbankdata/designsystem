import { Component, EventEmitter, Input, Output, TemplateRef, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-list-by-ionic',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit{
  @Input() items: any;
  @Input() propToGroupOn: string;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() headerTemplate: TemplateRef<any>;
  @Input() footerTemplate: TemplateRef<any>;
  @Input() sectionHeaderTemplate: TemplateRef<any>;

  @Output() itemSelect = new EventEmitter<any>();

  private _myGroupingFunc: (item: any) => any;
  constructor() {
    this.myGroupingFunc = (item: any) => {

      return item[this.propToGroupOn];
    };
  }

  ngOnInit() {
    // console.log('**********************************************');
    // console.log('PROP: ', this.propToGroupOn);
  }

  onItemSelect(selectedItem: any) {
    this.itemSelect.emit(selectedItem);
  }

  trackByFn(index) {
    return index;
  }

  // RadListView - Grouping
  set myGroupingFunc(value: (item: any) => any) {
    this._myGroupingFunc = value;
  }

  get myGroupingFunc(): (item: any) => any {
      return this._myGroupingFunc;
  }

}
