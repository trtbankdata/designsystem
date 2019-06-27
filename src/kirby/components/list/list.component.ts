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

  leftThresholdPassed: boolean = false;
  rightThresholdPassed: boolean = false;

  public onSwipeActionSelected(args: ListViewEventData) {
    console.log(`Tapped on a button...`);
  }

  public onSwipeCellStarted(args: ListViewEventData) {
    const swipeLimits = args.data.swipeLimits;
    const swipeView = args['object'];
    const leftItem = swipeView.getViewById<View>('mark-view');
    const rightItem = swipeView.getViewById<View>('delete-view');
    swipeLimits.left = leftItem.getMeasuredWidth();
    swipeLimits.right = rightItem.getMeasuredWidth();
    swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
  }

  public onSwipeCellFinished(args: ListViewEventData) {
    const swipeView = args['object'];
    const leftItem = swipeView.getViewById('mark-view');
    const rightItem = swipeView.getViewById('delete-view');
    if (this.leftThresholdPassed) {
      console.log('Perform left action');
    } else if (this.rightThresholdPassed) {
      console.log('Perform right action');
    }
    this.leftThresholdPassed = false;
    this.rightThresholdPassed = false;
  }

  public onCellSwiping(args: ListViewEventData) {
    const swipeLimits = args.data.swipeLimits;
    const swipeView = args['swipeView'];
    const mainView = args['mainView'];
    const leftItem = swipeView.getViewById('mark-view');
    const rightItem = swipeView.getViewById('delete-view');

    if (args.data.x > swipeView.getMeasuredWidth() / 4 && !this.leftThresholdPassed) {
      console.log('Notify perform left action');
      const markLabel = leftItem.getViewById('mark-text');
      this.leftThresholdPassed = true;
    } else if (args.data.x < -swipeView.getMeasuredWidth() / 4 && !this.rightThresholdPassed) {
      const deleteLabel = rightItem.getViewById('delete-text');
      console.log('Notify perform right action');
      this.rightThresholdPassed = true;
    }
    if (args.data.x > 0) {
      const leftDimensions = View.measureChild(
        leftItem.parent,
        leftItem,
        // layout.makeMeasureSpec(Math.abs(args.data.x), layout.EXACTLY),
        // layout.makeMeasureSpec(mainView.getMeasuredHeight(), layout.EXACTLY)
        0,
        0
      );
      View.layoutChild(
        leftItem.parent,
        leftItem,
        0,
        0,
        leftDimensions.measuredWidth,
        leftDimensions.measuredHeight
      );
    } else {
      const rightDimensions = View.measureChild(
        rightItem.parent,
        rightItem,
        // layout.makeMeasureSpec(Math.abs(args.data.x), layout.EXACTLY),
        // layout.makeMeasureSpec(mainView.getMeasuredHeight(), layout.EXACTLY)
        0,
        0
      );

      View.layoutChild(
        rightItem.parent,
        rightItem,
        mainView.getMeasuredWidth() - rightDimensions.measuredWidth,
        0,
        mainView.getMeasuredWidth(),
        rightDimensions.measuredHeight
      );
    }
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
}
