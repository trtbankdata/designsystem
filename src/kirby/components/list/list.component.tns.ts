import {
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListViewEventData } from 'nativescript-ui-listview';
import { View } from 'tns-core-modules/ui/page/page';
import { layout } from 'tns-core-modules/utils/utils';

import {
  ListHeaderDirective,
  ListItemDirective,
  ListSectionHeaderDirective,
  ListFlexItemDirective,
  ListFooterDirective,
} from './list.directive';
import { LoadOnDemandEvent, LoadOnDemandEventData } from './list.event';
import { ListHelper } from './helpers/list-helper';
import { GroupByPipe } from './pipes/group-by.pipe';
export type ListShape = 'square' | 'rounded';

@Component({
  selector: 'kirby-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListHelper, GroupByPipe],
})
export class ListComponent implements OnChanges {
  /**
   * Provide items for the list to render. Items must be provided in the order you expect them to be rendered.
   */
  @Input() items: any[];

  /**
   * Callback to determine name of section. Sections will be ordered alphabetically.
   */
  @Input() getSectionName?: (item: any) => string;

  /**
   * Text to display when no more items can be loaded (used for "on demand"-loading).
   */
  @Input() noMoreItemsText: string;

  /**
   * Determines if dividers should be shown or not.
   */
  @Input() showDivider = false;

  /**
   * Determine outline shape of:
   * - list, if {@link #isSectionsEnabled} is `false`
   * - section, if {@link #isSectionsEnabled} is `true`
   *
   * `square` means **without** rounded corners, `rounded` means **with** rounded corners.
   */
  @HostBinding('class.rounded')
  @Input()
  shape: ListShape = 'rounded';

  /**
   * Adds padding to the list.
   */
  @Input() padding: string = null;

  /**
   * Emitting event when more items are to be loaded.
   */
  @Output() loadOnDemand = new EventEmitter<LoadOnDemandEvent>();

  /**
   * Emitting event when an item is selected (tab'ed on mobile, clicked on web)
   */
  @Output() itemSelect = new EventEmitter<any>();

  // The first element that matches ListItemDirective. As a structural directive it unfolds into a template. This is a reference to that.
  @ContentChild(ListItemDirective, { read: TemplateRef }) listItemTemplate;
  @ContentChild(ListFlexItemDirective, { read: TemplateRef }) listFlexItemTemplate;
  @ContentChild(ListHeaderDirective, { read: TemplateRef }) listHeaderTemplate;
  @ContentChild(ListSectionHeaderDirective, { read: TemplateRef }) sectionHeaderTemplate;
  @ContentChild(ListFooterDirective, { read: TemplateRef }) listFooterTemplate;

  @HostBinding('class.has-sections') isSectionsEnabled: boolean;
  isSelectable: boolean;
  isLoading: boolean;
  isLoadOnDemandEnabled: boolean;
  groupedItems: any[];

  private orderMap: WeakMap<any, { isFirst: boolean; isLast: boolean }>;

  constructor(private listHelper: ListHelper, private groupBy: GroupByPipe) {}

  ngOnChanges(): void {
    this.isSectionsEnabled = !!this.getSectionName;
    if (this.isSectionsEnabled && this.items) {
      this.groupedItems = this.groupBy.transform(this.items, this.getSectionName);
      this.orderMap = this.createOrderMap(this.groupedItems);
    } else {
      this.groupedItems = null;
      this.orderMap = null;
    }
    this.isSelectable = this.itemSelect.observers.length > 0;
    this.isLoadOnDemandEnabled = this.loadOnDemand.observers.length > 0;
  }

  private getItemOrder(item: any): { isFirst: boolean; isLast: boolean } {
    const defaultOrder = { isFirst: false, isLast: false };
    if (!this.isSectionsEnabled) {
      return defaultOrder;
    }
    const order = this.orderMap.get(item);
    if (!order) {
      console.warn('Order of list item within section not found!');
      return defaultOrder;
    }
    return order;
  }

  isFirstInSection(item: any) {
    return this.getItemOrder(item).isFirst;
  }

  isLastInSection(item: any) {
    return this.getItemOrder(item).isLast;
  }

  onItemSelect(args: any) {
    this.itemSelect.emit(this.listHelper.getSelectedItem(this.items, args));
  }

  onLoadOnDemand(event?: LoadOnDemandEventData) {
    this.listHelper.onLoadOnDemand(this, event);
  }

  public onSwipeActionSelected(args: ListViewEventData) {
    console.log(`Tapped on a button...`);
  }

  private createOrderMap(
    groupedItems: { name: string; items: any[] }[]
  ): WeakMap<any, { isFirst: boolean; isLast: boolean }> {
    const orderMap = new WeakMap<any, { isFirst: boolean; isLast: boolean }>();
    groupedItems.forEach((group) => {
      const lastIndexInGroup = group.items.length - 1;
      group.items.forEach((item, index) => {
        const isFirst = index === 0;
        const isLast = index === lastIndexInGroup;
        orderMap.set(item, { isFirst, isLast });
      });
    });
    return orderMap;
  }

  firstSwipeThresholdPassed: boolean = false;
  fullSwipeThresholdPassed: boolean = false;
  swipeDirection: 'ltr' | 'rtl' | undefined = undefined;
  swipeLimits: any;

  private resetSwipeState() {
    this.firstSwipeThresholdPassed = false;
    this.fullSwipeThresholdPassed = false;
    this.swipeDirection = undefined;
  }

  private printSwipeState() {
    console.log(
      `1: ${this.firstSwipeThresholdPassed}; 2: ${this.fullSwipeThresholdPassed}; direction: ${
        this.swipeDirection
      }`
    );
  }

  public onSwipeCellStarted(args: ListViewEventData) {
    this.swipeLimits = args.data.swipeLimits;
    const swipeView = args['object'];
    const leftSide = swipeView.getViewById<View>('mark-view');
    const rightSide = swipeView.getViewById<View>('delete-view');

    this.swipeLimits.left = leftSide.getMeasuredWidth();
    this.swipeLimits.right = rightSide.getMeasuredWidth();
    this.swipeLimits.threshold = leftSide.getMeasuredWidth() / 3;

    if (this.firstSwipeThresholdPassed) {
      const x = swipeView.getMeasuredWidth();
      this.swipeLimits.left = x;
      this.swipeLimits.right = x;
      this.swipeLimits.threshold = swipeView.getMeasuredWidth() / 2;
      this.resetSwipeState();
    }
  }

  public onSwipeCellFinished(args: ListViewEventData) {
    // const swipeLimits = args.data.swipeLimits;
    const swipeView = args['object'];
    const mainView = args['mainView'];
    const leftSide = swipeView.getViewById<View>('mark-view');
    const rightSide = swipeView.getViewById<View>('delete-view');

    // this.printSwipeState();
    // if (this.swipeLeftFirstThresholdPassed) {
    //   swipeLimits.left = leftSide.getMeasuredWidth();
    //   console.log('should have set the swiper in position..');
    // } else if (this.swipeLeftSecondThresholdPassed) {
    //   console.log('Perform left action');
    // } else if (this.swipeRightThresholdPassed) {
    //   console.log('Perform right action');
    // }
    // this.swipeLeftFirstThresholdPassed = false;
    // this.swipeLeftSecondThresholdPassed = false;
    // this.swipeRightThresholdPassed = false;
  }

  public onCellSwiping(args: ListViewEventData) {
    console.log(`onSwipeCellStarted`);
    // const swipeLimits = args.data.swipeLimits;
    const swipeView = args['swipeView'];
    const leftSide = swipeView.getViewById('mark-view');
    const rightSide = swipeView.getViewById('delete-view');

    // const mainView = args['mainView'];

    const posX = args.data.x;
    this.swipeDirection = posX > 0 ? 'ltr' : 'rtl';
    // console.log(`posX: ${posX}; swipeDir: ${this.swipeDirection}`);
    const itemSideWidth = posX > 0 ? leftSide.getMeasuredWidth() : rightSide.getMeasuredWidth();
    const swipeWidth = Math.abs(posX);
    const fullWidth = swipeView.getMeasuredWidth();



    // TODO: must have the items move together with the swiping action...
    if (args.data.x > 0) {
      const leftDimensions = View.measureChild(
        leftSide.parent,
        leftSide,
        layout.makeMeasureSpec(Math.abs(args.data.x), layout.EXACTLY),
        layout.makeMeasureSpec(swipeView.getMeasuredHeight(), layout.EXACTLY)
      );
      View.layoutChild(
        leftSide.parent,
        leftSide,
        0,
        0,
        leftDimensions.measuredWidth,
        leftDimensions.measuredHeight
      );
    } else {
      const rightDimensions = View.measureChild(
        rightSide.parent,
        rightSide,
        layout.makeMeasureSpec(Math.abs(args.data.x), layout.EXACTLY),
        layout.makeMeasureSpec(swipeView.getMeasuredHeight(), layout.EXACTLY)
      );

      View.layoutChild(
        rightSide.parent,
        rightSide,
        swipeView.getMeasuredWidth() - rightDimensions.measuredWidth,
        0,
        swipeView.getMeasuredWidth(),
        rightDimensions.measuredHeight
      );
    }

    // swipeLimits.threshold = leftSide.getMeasuredWidth();
    if (swipeWidth >= itemSideWidth / 3 && swipeWidth < fullWidth / 2) {
      // reached first threshold, but not a full swipe
      this.firstSwipeThresholdPassed = true;
      this.fullSwipeThresholdPassed = false;
      this.swipeLimits.threshold = fullWidth / 2;
      this.swipeLimits.left = itemSideWidth;
      this.swipeLimits.right = itemSideWidth;
      return;
    } else if (swipeWidth >= fullWidth / 2) {
      // full swipe
      // console.log(`full threshold passed`);
      this.fullSwipeThresholdPassed = true;
      return;
    }

    // reset swipe state
    this.resetSwipeState();
  }
}
