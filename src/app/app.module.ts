import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';

import { HttpModule } from '@angular/http';



import { MyApp } from './app.component';
import { TaskService } from '../Services/task.service';
import { UserService } from '../Services/user.service';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    [HttpModule],
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ChartsModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
     
    StatusBar,
    SplashScreen,
    UserService,
    TaskService,
    {provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
