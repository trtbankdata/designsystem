import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'kirby-list-by-ionic',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements AfterContentInit {
  @Input() items: any[];
  @Input() itemTemplate: TemplateRef<any>;

  ngAfterContentInit() {}
}
