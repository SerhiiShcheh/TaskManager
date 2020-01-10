import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { CustomValidatorsService } from '../../custom-validators.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  emailRegExp = /^[a-z0-9!#\$%&'\*\+\-\/=\?\^_`{\|}~]+(\.[a-z0-9!#\$%&'\*\+\-\/=\?\^_`{\|}~]+)*@[a-z0-9]+(\.[a-z0-9]+)*$/i;
  nameRegExp = /^[^\d\s]+$/i;
  passwordRegExp = /^\w+$/i;
  constructor(private formBuilder: FormBuilder, private customValidators: CustomValidatorsService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, this.customValidators.customRegExpBasedValidator(this.emailRegExp, {email: 'error'})]],
      firstName: ['', [Validators.required, this.customValidators.customRegExpBasedValidator(this.nameRegExp, {name: 'error'})]],
      lastName: ['', [Validators.required, this.customValidators.customRegExpBasedValidator(this.nameRegExp, {name: 'error'})]],
      password: ['', [Validators.required, Validators.minLength(8), this.customValidators.customRegExpBasedValidator(this.passwordRegExp, {password: 'error'})]],
      confirmPassword: [''],
    });
  }

  get signupFormControls() {
    return this.signupForm.controls;
  }
}
