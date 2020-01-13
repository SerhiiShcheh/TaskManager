import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  database = {
    users: [],
    tasks: [],
  };

  constructor() { }

  initStorage() {
    if(!window.localStorage.getItem('database')) {
      window.localStorage.setItem('database', JSON.stringify(this.database));
    } else {
      this.database = JSON.parse(window.localStorage.getItem('database'));
    }
  }

  updateDB() {
    window.localStorage.setItem('database', JSON.stringify(this.database));
  }

  clearDB() {
    let database = {
      users: [],
      tasks: [],
    };
    window.localStorage.setItem('database', JSON.stringify(database));
  }

  getAllTasks() {
    return this.database.tasks;
  }

  getAllUserTasks(userEmail) {
    return this.database.tasks.reduce((prev, item) => {
      let foundItem = item.assignedTo.find((item) => {
        if(item.userEmail === userEmail) {
          return true;
        }
      });
      if (foundItem) {
        prev.push(item);
      }
      return prev;
    }, []);
  }

  getTaskById(id, userEmail) {
    let taskList = this.getAllUserTasks(userEmail);
    return taskList[id];
  }

  addTask(taskName, taskDescription, userEmail) {
    let task = new Task(taskName, taskDescription);
    task.assignUser(userEmail, null);
    this.database.tasks.push(task);
    console.log(this.database);
    this.updateDB();
  }

  updateTask(task) {
    let taskList = this.getAllTasks();
    let taskIndex = taskList.findIndex((item) => {
      if (item.date === task.date) {
        return true;
      }
    });
    taskList.splice(taskIndex, 1, task);
    this.database.tasks = taskList;
    this.updateDB();
  }

  deleteTask(date) {
    let taskList = this.getAllTasks();
    let taskIndex = taskList.findIndex((item) => {
      if (item.date === date) {
        return true;
      }
    });
    taskList.splice(taskIndex, 1);
    this.database.tasks = taskList;
    this.updateDB();
  }

  updateUsersInDB(user) {
    let dbUser = this.database.users.find((item) => {
      if (item.email === user.attributes.email) {
        return true;
      }
    });
    if (!dbUser) {
      let newUser = new User(user.attributes['custom:firstName'], user.attributes['custom:lastName'], user.attributes.email);
      this.database.users.push(newUser);
      this.updateDB();
    }
  }

  shareTask(email, userEmail, task) {
    if (this.checkUser(email)) {
      let taskList = this.database.tasks;
      let taskIndex = taskList.findIndex((item) => {
        if (item.date === task.date) {
          return true;
        }
      });
      this.database.tasks[taskIndex].assignedTo.push({
        userEmail: email,
        receivedFrom: userEmail,
      });
      this.updateDB();
    }
  }

  checkUser(email) {
    let user = this.database.users.find((item) => {
      if (item.email == email) {
        return true;
      }
    });
    if (user) {
      return true;
    }
    return false;
  }

}

class User {
  firstName;
  lastName;
  email;
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

class Task {
  taskName;
  taskDescription;
  date;
  assignedTo;
  constructor(name, description) {
    this.taskName = name;
    this.taskDescription = description;
    this.date = new Date();
    this.assignedTo = [];
  }

  assignUser(userEmail, from) {
    this.assignedTo.push({
      userEmail: userEmail,
      receivedFrom: from,
    })
  }
}
