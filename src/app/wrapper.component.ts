import {
  Component,
  computed,
  effect,
  input,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormModel, SomeValue } from './model';
import { CmpFirstComponent } from './cmp/cmp-first.component';
import { CmpSecondComponent } from './cmp/cmp-second.component';
import { CmpThirdComponent } from './cmp/cmp-third.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [CmpFirstComponent],
  template: ` <ng-container #container></ng-container> `,
})
export class WrapperComponent {
  parentForm = input.required<FormModel>();

  someValue = input.required<SomeValue>();

  container = viewChild.required('container', { read: ViewContainerRef });

  constructor() {
    effect(() => {
      const value = this.someValue();
      const container = this.container();

      container.clear();

      let ref = null;
      switch (value) {
        case 'first':
          ref = container.createComponent(CmpFirstComponent);
          break;
        case 'second':
          ref = container.createComponent(CmpSecondComponent);
          break;
        case 'third':
          ref = container.createComponent(CmpThirdComponent);
          break;
      }
      if (!ref) {
        return;
      }

      ref.setInput('parentForm', this.parentForm());
    });
  }
}
