import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;

  constructor() { }

  ngOnInit() {
  }

  get showHeader() {
    return this.title || this.subtitle;
  }

}
