import { Component } from '@angular/core';
import { CmpFormModel, CmpModel } from './cmp.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

export type ThirdModel = string;
export type ThirdCmpModel = CmpModel<'third', ThirdModel>;
export type ThirdForm = CmpFormModel<ThirdCmpModel>;

@Component({
  selector: 'app-cmp-third',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <label>
      Third
      @if (fc) {
        <input type="text" [formControl]="fc" />
      }
    </label>
  `,
})
export class CmpThirdComponent extends CmpModel<'third', ThirdModel> {
  override readonly fieldName = 'third';

  override initFormControl(): FormControl<ThirdModel> {
    return new FormControl<ThirdModel>('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    });
  }
}
