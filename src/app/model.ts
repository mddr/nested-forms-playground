import { FormControl, FormGroup } from '@angular/forms';
import { FirstForm } from './cmp/cmp-first.component';
import { SecondForm } from './cmp/cmp-second.component';
import { ThirdForm } from './cmp/cmp-third.component';

export type SomeValue = 'first' | 'second' | 'third' | 'none';

type ControlsOf<T> = {
  [K in keyof T]: FormControl<T[K]>;
};

export type FormModel = FormGroup<
  ControlsOf<FirstForm> | ControlsOf<SecondForm> | ControlsOf<ThirdForm> | {}
>;
