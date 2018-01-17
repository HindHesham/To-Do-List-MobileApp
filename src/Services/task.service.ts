import { Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {
    public tasks: any = [];
    public taskUrl = "http://localhost:3000/tasks";
    public doneTasksLength: any ;
    public inprogressTasksLength: any;
    public user_id: any;
    public userTask:any = [];
    public update: any;

    public name: string = '';
    constructor(private http: Http,
        private storage: Storage) {
            this.listTasks();
           this.storage.get('id').then((id)=>{
               this.user_id = id;
               //console.log("from service ",this.user_id)
           })
            
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad service');        
      }
    listTasks(){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        this.http.get(this.taskUrl, {headers:headers}).map((response: Response) => response.json())
        .subscribe(data => {
            this.storage.get('id').then((id)=>{
                //console.log("data is ", data);
                this.tasks = data;
                this.doneTasksLength =  this.tasks.filter(value => value.status === 1 && value.user_id == id).length;
                this.inprogressTasksLength =  this.tasks.filter(value => value.status === 0 && value.user_id == id ).length;
                
            })
           

        },
        err => console.log(`error happened getting tasks ${err}`)
        );
    }

    get AllTaskes() {
        return this.tasks;
    }

    addTask(name: string) {
        if (name != "" ) {
            //console.log("name is ",name);
            let newTaskObj = {
                "name": name,
                "status": 0,
                "user_id": this.user_id
            }
            return  this.http.post(this.taskUrl, newTaskObj).map((response: Response) => response.json())
        }
    }
    
    updateTask(id){
       this.update = this.tasks.filter(value => value.id === id );

       let body = {
            "name": this.update[0].name,
            "status": 1,
            "user_id": this.update[0].user_id,
            "id": this.update[0].id
        }
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        
          return  this.http.put(this.taskUrl + '/' + this.update[0].id, body, {headers:headers}).map((response: Response) => response.json())  

    }
   
}