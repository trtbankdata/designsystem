import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'kirby-list-by-ionic',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() items: any;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() headerTemplate: TemplateRef<any>;

  @Output() itemSelect = new EventEmitter<any>();

  onItemSelect(selectedItem: any) {
    this.itemSelect.emit(selectedItem);
  }
}
