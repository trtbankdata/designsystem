import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { ListComponent } from '~/kirby/components/kirby-list/list.component';
import { KirbyListItemComponent } from '~/kirby/components/kirby-list/item/item.component';
import { KirbyLabelComponent } from '~/kirby/components/kirby-list/label/label.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ListComponent, KirbyListItemComponent, KirbyLabelComponent],
  exports: [ListComponent, KirbyListItemComponent, KirbyLabelComponent],
})
export class ListModule {}
