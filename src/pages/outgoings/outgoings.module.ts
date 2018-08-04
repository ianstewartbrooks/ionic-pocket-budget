import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutgoingsPage } from './outgoings';

@NgModule({
  declarations: [
    OutgoingsPage,
  ],
  imports: [
    IonicPageModule.forChild(OutgoingsPage),
  ],
})
export class OutgoingsPageModule {}
