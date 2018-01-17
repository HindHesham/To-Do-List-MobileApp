import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TaskService } from '../../Services/task.service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ListTasksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'ListTasksPage'
})
@Component({
  selector: 'page-list-tasks',
  templateUrl: 'list-tasks.html',
})
export class ListTasksPage {

  public id: any;

  constructor(public navCtrl: NavController,
    public TaskService: TaskService,
    public storage: Storage ) {
    this.listTasks();
    this.storage.get('id').then((id)=>{
      this.id = id;
      //console.log("user is: ",id);
    })
  }
  public ngOnInit(): any {
    this.TaskService.listTasks();
  }
  listTasks(){
     return this.TaskService.tasks;
  }
  editTask(id){
    this.TaskService.updateTask(id)
    .subscribe( data => {
        setTimeout( () => this.TaskService.tasks.push(data) , 0);    
        this.TaskService.listTasks();    
         // this.TaskService.tasks.push(data);
         
      },
      (err) => console.log(`errror ${err}`)
    )
  }
  gotoAddTask(){
    this.navCtrl.push('AddTaskPage');
  }

}
