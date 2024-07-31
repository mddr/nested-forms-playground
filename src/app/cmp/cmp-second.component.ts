import {
  Component,
  effect,
  input,
  OnDestroy,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { CmpModel } from './cmp.model';
import {
  FormControl,
  FormControlStatus,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FirstModel } from './cmp-first.component';

export type SecondModel = number;

export type SecondForm = { second: SecondModel };

@Component({
  selector: 'app-cmp-second',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <label>
      Second
      @if (fc) {
        <input type="number" [formControl]="fc" />
      }
    </label>
  `,
})
export class CmpSecondComponent
  extends CmpModel<'second', SecondModel>
  implements OnDestroy
{
  override readonly fieldName = 'second';

  override initFormControl(): FormControl<SecondModel> {
    return new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    });
  }
}
