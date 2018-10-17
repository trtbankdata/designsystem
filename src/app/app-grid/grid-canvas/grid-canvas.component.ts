import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kirby-grid-canvas',
  templateUrl: './grid-canvas.component.html',
  styleUrls: ['./grid-canvas.component.scss']
})
export class GridCanvasComponent implements OnInit, OnDestroy {
  private breakpointSubscription: Subscription;
  private cardSizes = {
    sm: 400,
    md: 830,
    lg: 1280
  };
  private breakpoints = {
    Small: '(max-width: 599px)',
    Medium: '(min-width: 600px) and (max-width: 1024px)',
    Large: '(min-width: 1025px)',
  };
  public maxCardSize = 'lg';

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointSubscription = breakpointObserver.observe([
      this.breakpoints.Small,
      this.breakpoints.Medium
    ]).subscribe(result => {
      if (result.breakpoints[this.breakpoints.Small]) {
        this.maxCardSize = 'sm';
      } else if (result.breakpoints[this.breakpoints.Medium]) {
        this.maxCardSize = 'md';
      } else {
        this.maxCardSize = 'lg';
      }
    });
  }

  cardSize(preferredSize: string) {
    return this.cardSizes[preferredSize] <= this.cardSizes[this.maxCardSize]
           ? preferredSize
           : this.maxCardSize;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }
}
