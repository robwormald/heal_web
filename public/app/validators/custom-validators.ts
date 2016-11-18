import { ValidatorFn, AbstractControl } from '@angular/forms';

const MEGA_BYTE = 1024 * 1024;

export class CustomValidators {
  static fileType(type: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let file = control.value;
      if(!file) return null;
      return file.type.includes(type) ? null : { 'fileType': true };
    };
  }

  static fileSize(size: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let file = control.value;
      if(!file) return null;
      return file.size < size * MEGA_BYTE ? null : { 'fileSize': true };
    };
  }
}
