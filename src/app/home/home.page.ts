import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private platform: Platform) {
 
  }
 
 

  async showPlatform() {
    let text = 'I run on: ' + this.platform.platforms();
    const alert = await this.alertCtrl.create({
      header: 'My Home',
      subHeader: text,
      message: 'This is an alert message.',
      buttons: ['OK']
    });
    await alert.present();
  }

}
