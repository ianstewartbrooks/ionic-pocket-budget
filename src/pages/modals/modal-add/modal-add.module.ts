import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddPage } from './modal-add';

@NgModule({
  declarations: [
    ModalAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddPage),
  ],
})
export class ModalAddPageModule {}
