import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { MenuController } from 'ionic-angular';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'SignupPage'
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  registerForm: FormGroup;
  submitAttempt: boolean = false;

  email: AbstractControl;
  name: AbstractControl;
  password:AbstractControl;
  confirmPassword:AbstractControl;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder,
     public UserService: UserService,
     private toastCtrl: ToastController,
     public menu: MenuController ){
       
      this.menu.enable(false);
      this.registerForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required])],
        name: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])],
        confirmPassword: ['', [Validators.required]]
    });
    this.email = this.registerForm.controls['email'];
    this.name = this.registerForm.controls['name'];
    this.password = this.registerForm.controls['password'];
    this.confirmPassword = this.registerForm.controls['confirmPassword'];
    
   
  }

  onKeyPress(event) {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || (event.keyCode == 32 || event.keyCode == 46) ||
        (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
      return true;
    }
    else {
      return false;
    }
  }

  signup(email, name, password, confirmPassword){
    if(!this.registerForm.valid){
        this.submitAttempt = true;
    } else {
        this.submitAttempt = false;
        if(password != confirmPassword){
          let toast = this.toastCtrl.create({
            message: 'confirm password must be same of password',
            duration: 3000,
            position: 'bottom'
          }); toast.present();
        }
        else{
            this.UserService.addUser(email, name, password)
            .subscribe((data)=>{
              //console.log("dats is: ", data);
              this.UserService.users.push(data);
              this.navCtrl.pop(); 
            },
          (err)=>{
            console.log("error");
           })
        }
      }
  }

}