import { Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';


import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    public storageEmail: any;
    public storageId:any;
    public users: any = [];
    public usersUrl = "http://localhost:3000/users";
    public name: string = '';
    public userReturn: any;
    public userReturnLength: any;
    constructor(private http: Http,
        private storage: Storage){
            this.listUsers();
        }
    listUsers(){
        console.log("from service");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        return this.http.get(this.usersUrl, {headers:headers}).map((response: Response) => response.json())
        .subscribe(data => {
            this.users = data;
            console.log("data is ", this.users);
        },
        err => console.log(`error happened getting tasks ${err}`)
        );
    };
   
     getUserByEmail(email){
         console.log(email);
         this.userReturnLength = this.users.filter(value => value.email === email ).length
         if(this.userReturnLength == 1){
            this.userReturn = this.users.filter(value => value.email === email );
            this.storage.set('email', this.userReturn[0].email);
            this.storage.set ('id', this.userReturn[0].id);
         }
         return this.userReturnLength;
    }
    
    addUser(email: string, name: string, password: string) {
        if (email != "" && name != "" && password != "" ) {
            console.log("name is ",name);
            let newUserObj = {
                "email": email,
                "name": name,
                "password": password
            }
            return this.http.post(this.usersUrl, newUserObj).map((response: Response) => response.json())
       
        }
        
    }
}