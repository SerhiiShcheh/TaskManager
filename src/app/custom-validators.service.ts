import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  customRegExpBasedValidator(regexp: RegExp, errorObject: Object): ValidatorFn {
    return (control: AbstractControl) => {
      return regexp.test(control.value) ? null : errorObject;
    }
  }

}
