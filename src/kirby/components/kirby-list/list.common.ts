import { CommonModule } from '@angular/common';
import { ListComponent } from '~/kirby/components/kirby-list/list.component';
import { KirbyListItemComponent } from '~/kirby/components/kirby-list/item/item.component';
import { KirbyLabelComponent } from '~/kirby/components/kirby-list/label/label.component';

export const commonImports = [CommonModule];
export const commentDeclarations = [ListComponent, KirbyListItemComponent, KirbyLabelComponent];
export const commonExports = [ListComponent, KirbyListItemComponent, KirbyLabelComponent];
