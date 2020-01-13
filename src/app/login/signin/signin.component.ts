import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { CustomValidatorsService } from '../../custom-validators.service';
import { AmplifyService } from 'aws-amplify-angular';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  emailRegExp = /^[a-z0-9!#\$%&'\*\+\-\/=\?\^_`{\|}~]+(\.[a-z0-9!#\$%&'\*\+\-\/=\?\^_`{\|}~]+)*@[a-z0-9]+(\.[a-z0-9]+)*$/i;
  passwordRegExp = /^\w+$/i;
  constructor(
    private formBuilder: FormBuilder,
    private customValidators: CustomValidatorsService,
    private amplifyService: AmplifyService,
    private router: Router,
    private dataService: DataService,
  ) {}

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, this.customValidators.customRegExpBasedValidator(this.emailRegExp, {email: 'error'})]],
      password: ['', [Validators.required, Validators.minLength(8), this.customValidators.customRegExpBasedValidator(this.passwordRegExp, {password: 'error'})]],
    });
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
      let user = this.amplifyService.auth().user;
      this.dataService.updateUsersInDB(user);
      this.router.navigate(['./']);
    }).catch(err => {
      console.log(err);
    })
  }
}
