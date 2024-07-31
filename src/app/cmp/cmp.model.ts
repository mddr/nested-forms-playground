import {
  Component,
  effect,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { FormControl, FormControlStatus, FormGroup } from '@angular/forms';

export type CmpFormModel<T> =
  T extends CmpModel<infer K, infer V> ? { [P in K]: V } : never;

@Component({ template: `` })
export abstract class CmpModel<Field extends string, T> implements OnDestroy {
  parentForm = input.required<FormGroup>();

  statusChange = output<FormControlStatus>();
  valueChange = output<T>();

  fc?: FormControl<T>;

  abstract readonly fieldName: Field;
  abstract initFormControl(): FormControl<T>;

  constructor() {
    effect(() => {
      this.fc = this.initFormControl();
      this.parentForm().setControl(this.fieldName, this.fc);
    });
  }

  ngOnDestroy() {
    this.parentForm().removeControl(this.fieldName);
  }
}
