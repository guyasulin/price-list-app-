import { Directive, ElementRef } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, ValidatorFn, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appInputValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: InputValidatorDirective, multi: true }]
})
export class InputValidatorDirective implements Validator {

  constructor() { }

  validate(c: AbstractControl): ValidationErrors {
    return inputValidator(c);
  }
}

export const inputValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const pattern = "[^A-Za-zא-ת' ' ]";
  var regex = new RegExp(pattern);

  return control.value && regex.test(control.value) ? { 'input': true } : null;
};