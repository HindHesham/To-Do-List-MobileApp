import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { TaskService } from '../../Services/task.service';

/**
 * Generated class for the AddTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'AddTaskPage'
})
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})

export class AddTaskPage {
 
  task: any ;
  submitAttempt: boolean = false;
  addTaskForm: FormGroup;
  taskControl;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,    
    private toastCtrl: ToastController,
    public TaskService: TaskService) {

      this.addTaskForm = formBuilder.group({
        taskControl: ['', Validators.compose([Validators.required])]
    });
    this.taskControl = this.addTaskForm.controls['taskControl'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskPage');
  }
  saveTask(name, user_id){
    if(!this.addTaskForm.valid){
      this.submitAttempt = true;
    } else {
      this.submitAttempt = false;
      this.TaskService.addTask(name)
      .subscribe(
        data => {
            this.TaskService.tasks.push(data);
            this.task='';  
            this.TaskService.inprogressTasksLength +=1;
            let toast = this.toastCtrl.create({
              message: ' Add Task ',
              duration: 3000,
              position: 'bottom'
            }); toast.present();
        },
        (err) => console.log(`errror ${err}`)
        )
      }
  }

}
