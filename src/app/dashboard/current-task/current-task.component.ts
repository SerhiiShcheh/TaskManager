import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { CustomValidatorsService } from '../../custom-validators.service';
import { DataService } from '../../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-current-task',
  templateUrl: './current-task.component.html',
  styleUrls: ['./current-task.component.scss']
})
export class CurrentTaskComponent implements OnInit {
  taskForm: FormGroup;
  shareTaskForm: FormGroup;
  emailRegExp = /^[a-z0-9!#\$%&'\*\+\-\/=\?\^_`{\|}~]+(\.[a-z0-9!#\$%&'\*\+\-\/=\?\^_`{\|}~]+)*@[a-z0-9]+(\.[a-z0-9]+)*$/i;
  task;
  taskId;
  userEmail;

  constructor(
    private formBuilder: FormBuilder,
    private customValidators: CustomValidatorsService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private amplifyService: AmplifyService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      taskName: [''],
      taskDescription: [''],
    });

    this.shareTaskForm = this.formBuilder.group({
      email: ['', [Validators.required, this.customValidators.customRegExpBasedValidator(this.emailRegExp, {email: 'error'})]],
    });

    this.task = this.getTask();
  }

  getTask() {
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.userEmail = this.amplifyService.auth().user.attributes.email
    return this.dataService.getTaskById(this.taskId, this.userEmail);
  }

  updateTask() {
    this.task.taskName = this.taskForm.controls.taskName.value;
    this.task.taskDescription = this.taskForm.controls.taskDescription.value;
    this.dataService.updateTask(this.task);
    this.router.navigate(['/']);
  }

  deleteTask() {
    this.dataService.deleteTask(this.task.date);
    this.router.navigate(['/']);
  }

  shareTask() {
    let email = this.shareTaskForm.controls.email.value;
    let userEmail = this.amplifyService.auth().user.attributes.email;
    this.dataService.shareTask(email, userEmail, this.task);
  }

  get taskFormControls() {
    return this.taskForm.controls;
  }

  get shareTaskFormControls() {
    return this.shareTaskForm.controls;
  }

}
