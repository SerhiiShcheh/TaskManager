import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { DataService } from '../../data.service';
import { AmplifyService } from 'aws-amplify-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  createNewTaskForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private dataService: DataService, private amplifyService: AmplifyService, private router: Router) { }

  ngOnInit() {
    this.createNewTaskForm = this.formBuilder.group({
      taskName: [''],
      taskDescription: [''],
    })
  }

  addTask() {
    let taskName = this.createNewTaskForm.controls.taskName.value;
    let taskDescription = this.createNewTaskForm.controls.taskDescription.value;
    let userEmail = this.amplifyService.auth().user.attributes.email;
    this.dataService.addTask(taskName, taskDescription, userEmail);
    this.router.navigate(['/']);
  }

}
