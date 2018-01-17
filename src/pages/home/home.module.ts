import { NgModule } from '@angular/core';
import { HomePage} from './home';
import { IonicPageModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [HomePage],
  imports: [IonicPageModule.forChild(HomePage),
    ChartsModule],
  exports: [
    HomePage
  ]
})
export class HomePageModule { }
