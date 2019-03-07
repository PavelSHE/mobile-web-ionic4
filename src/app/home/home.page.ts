import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from '@ionic/angular';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs';
import { AngularFireAuth } from "angularfire2/auth";



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: Observable<any[]>;
  ref: AngularFireList<any>;
  dataPath: string;
  boxes = null;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private alertCtrl: AlertController, private platform: Platform, public navCtrl: NavController) {
    //this.box.id = "bla1";
    this.boxes = [];
  }

  ngOnInit(){
    this.afAuth.authState.subscribe(data =>{
      if (data && data.email && data.uid) {
        this.dataPath = "/boxes/" + btoa(data.email).replace(/=/g, "-") + "/";
        this.ref = this.db.list(this.dataPath);//,ref => ref.orderByKey());
        this.ref.valueChanges().subscribe(result => {
          if (this.boxes.length > 0){
            console.log("updates")
          }else{
            console.log("creates");
            this.showBoxes(result);
          }
        })
      }else{
        //to do data guards
        this.navCtrl.navigateForward("login");
      }
    });
  }
  
  showBoxes(data){
    data.forEach(element => {
      this.boxes.push(element);

      this.boxes[this.boxes.length-1].registered1 = new Date (this.boxes[this.boxes.length-1].registered * 1000);
    });
    //this.boxes = data;

    // Object.keys(data).map(function(key, index) {
    //   data[key] *= 2;
    //});
    console.log(this.boxes);
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

  navigateToBoxLogs(_box){
    this.navCtrl.navigateForward("box-page/box-" + _box);
  }

}

