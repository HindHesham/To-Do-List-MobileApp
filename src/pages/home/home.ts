import { IonicPage, NavController, ToastController, MenuController } from 'ionic-angular';
import { TaskService } from '../../Services/task.service';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';

@IonicPage({
  name: 'HomePage'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public id: any;

  // Doughnut
  public doughnutChartLabels:string[] = ['Tasks Done', 'Tasks in progress'];
  public doughnutChartData:number[] = [this.TaskService.doneTasksLength, this.TaskService.inprogressTasksLength];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(public navCtrl: NavController, 
    public TaskService: TaskService,
    private storage: Storage,
    private toastCtrl: ToastController,
    public menu: MenuController ) {
      this.doughnutChartLabels;
      this.doughnutChartData;
      this.doughnutChartType;
      this.TaskService.listTasks();
      this.storage.get('id').then((id)=>{
        this.id = id;
        //console.log("user is: ",id);
      })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.doughnutChartLabels;
    this.doughnutChartData;
    this.doughnutChartType;
    this.menu.enable(true);
  }
  listTasks(){
    return this.TaskService.tasks;
  }
  logout(){
    this.storage.clear().then(() => {
      this.navCtrl.push('LoginPage');
      let toast = this.toastCtrl.create({
        message: 'You are log out ',
        duration: 3000,
        position: 'bottom'
      }); toast.present();
    });
  }
  
}
