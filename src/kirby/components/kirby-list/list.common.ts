import { CommonModule } from '@angular/common';
import { ListComponent } from '~/kirby/components/kirby-list/list.component';
import { KirbyLabelComponent } from '~/kirby/components/kirby-list/label/label.component';

export const commonImports = [CommonModule];
export const commentDeclarations = [ListComponent, KirbyLabelComponent];
export const commonExports = [ListComponent, KirbyLabelComponent];
