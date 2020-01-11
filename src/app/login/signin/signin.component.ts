import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { CustomValidatorsService } from '../../custom-validators.service';
import { AmplifyService } from 'aws-amplify-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [CustomValidatorsService],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  emailRegExp = /^[a-z0-9!#\$%&'\*\+\-\/=\?\^_`{\|}~]+(\.[a-z0-9!#\$%&'\*\+\-\/=\?\^_`{\|}~]+)*@[a-z0-9]+(\.[a-z0-9]+)*$/i;
  passwordRegExp = /^\w+$/i;
  constructor(
    private formBuilder: FormBuilder,
    private customValidators: CustomValidatorsService,
    private amplifyService: AmplifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, this.customValidators.customRegExpBasedValidator(this.emailRegExp, {email: 'error'})]],
      password: ['', [Validators.required, Validators.minLength(8), this.customValidators.customRegExpBasedValidator(this.passwordRegExp, {password: 'error'})]],
    });
    this.amplifyService.auth().currentAuthenticatedUser().then(user => console.log(user.attributes.email));
  }

  get signinFormControls() {
    return this.signinForm.controls;
  }

  signIn() {
    const values = this.signinForm.value;
    this.amplifyService.auth().signIn({
      username: values.email,
      password: values.password
    }).then(res => {
      console.log(res);
      this.router.navigate(['./']);
    }).catch(err => {
      console.log(err);
    })
  }
}
