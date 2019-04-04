import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { commonImports, commentDeclarations, commonExports } from './list.common';

@NgModule({
  imports: [...commonImports, IonicModule],
  declarations: [...commentDeclarations],
  exports: [...commonExports],
})
export class ListModule {}
