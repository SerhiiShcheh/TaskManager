import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TaskComponent } from './task/task.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewTaskComponent } from './new-task/new-task.component';
import { CurrentTaskComponent } from './current-task/current-task.component';

@NgModule({
  declarations: [DashboardComponent, TaskComponent, NewTaskComponent, CurrentTaskComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
