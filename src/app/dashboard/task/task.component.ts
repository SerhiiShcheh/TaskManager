import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { CustomValidatorsService } from '../../custom-validators.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
}
