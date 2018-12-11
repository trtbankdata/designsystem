import { Component, OnInit, Input, Directive, ContentChild, TemplateRef } from '@angular/core';

@Directive({
  selector: '[kirbyListItem]'
})
export class ListItemDirective {}

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() items: any[];
  @ContentChild(ListItemDirective, {read: TemplateRef}) listItemTemplate;

  constructor() { }

  ngOnInit() {
  }

}
