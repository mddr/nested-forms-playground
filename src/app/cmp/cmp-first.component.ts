import { Component, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CmpModel } from './cmp.model';

export type FirstModel = string;

export type FirstForm = { first: FirstModel };

@Component({
  selector: 'app-cmp-first',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <label>
      First
      @if (fc) {
        <input type="date" [formControl]="fc" />
      }
    </label>
  `,
})
export class CmpFirstComponent
  extends CmpModel<'first', FirstModel>
  implements OnDestroy
{
  override readonly fieldName = 'first';

  override initFormControl(): FormControl<FirstModel> {
    return new FormControl<FirstModel>('', {
      nonNullable: true,
      validators: [Validators.required],
    });
  }
}
