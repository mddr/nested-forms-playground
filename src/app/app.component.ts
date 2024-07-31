import { afterNextRender, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { WrapperComponent } from './wrapper.component';
import { FormModel, SomeValue } from './model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-wrapper [someValue]="someValue()" [parentForm]="formGroup" />

    <hr />
    <div>
      <div>someValue: {{ someValue() }}</div>
      <button (click)="changeTo('first')">First</button>
      <button (click)="changeTo('second')">Second</button>
      <button (click)="changeTo('third')">Third</button>
      <button (click)="changeTo('none')">None</button>

      <button (click)="accept()">Accept</button>
    </div>

    <hr />

    <h2>value</h2>
    <pre>{{ formGroup.getRawValue() | json }}</pre>

    <h2>errors</h2>
    <pre>{{ formGroup.errors | json }}</pre>

    <h2>valid</h2>
    <pre>{{ formGroup.valid | json }}</pre>
  `,
  imports: [WrapperComponent, JsonPipe],
})
export class AppComponent {
  private fb = inject(FormBuilder);

  formGroup: FormModel = this.fb.group({});

  someValue = signal<SomeValue>('second');

  constructor() {
    this.formGroup.valueChanges.subscribe((value) => {
      console.log('parent', { value, fg: this.formGroup });
    });
  }

  changeTo(value: SomeValue) {
    this.someValue.set(value);
  }

  accept(): void {
    if (!this.formGroup.valid) {
      this.formGroup.updateValueAndValidity();
      console.log('invalid');
      // todo: touch

      const controls = this.formGroup.controls;
      if (!Object.keys(controls).length) {
        return;
      }

      for (const controlsKey in controls) {
        // @ts-ignore
        const control = controls[controlsKey];
        control.markAsTouched();
      }

      return;
    }

    console.log('valid');
  }
}
