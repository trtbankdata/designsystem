import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';
import { FormFieldInputDefaultExampleComponent } from './examples/input/default';
import { FormFieldInputLabelExampleComponent } from './examples/input/label';
import { FormFieldInputLabelMessageExampleComponent } from './examples/input/label-message';
import { FormFieldInputCounterExampleComponent } from './examples/input/counter';
import { FormFieldInputNumericExampleComponent } from './examples/input/numeric';
import { FormFieldInputDisabledExampleComponent } from './examples/input/disabled';
import { FormFieldInputErrorExampleComponent } from './examples/input/error';
import { FormFieldInputBorderlessExampleComponent } from './examples/input/borderless';
import { FormFieldTextareaDefaultExampleComponent } from './examples/textarea/default';
import { FormFieldTextareaLabelExampleComponent } from './examples/textarea/label';
import { FormFieldTextareaCounterExampleComponent } from './examples/textarea/counter';
import { FormFieldInputNumericInputExampleComponent } from './examples/input/numeric-input';

const COMPONENT_DECLARATIONS = [
  FormFieldInputDefaultExampleComponent,
  FormFieldInputLabelExampleComponent,
  FormFieldInputLabelMessageExampleComponent,
  FormFieldInputCounterExampleComponent,
  FormFieldInputNumericExampleComponent,
  FormFieldInputNumericInputExampleComponent,
  FormFieldInputDisabledExampleComponent,
  FormFieldInputErrorExampleComponent,
  FormFieldInputBorderlessExampleComponent,
  FormFieldTextareaDefaultExampleComponent,
  FormFieldTextareaLabelExampleComponent,
  FormFieldTextareaCounterExampleComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class FormFieldExamplesModule {}
