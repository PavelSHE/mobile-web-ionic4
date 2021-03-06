import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BoxPagePage } from './box-page.page';
import { AngularFireAuthModule } from "angularfire2/auth";

const routes: Routes = [
  {
    path: '',
    component: BoxPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AngularFireAuthModule
  ],
  declarations: [BoxPagePage]
})
export class BoxPagePageModule {}
