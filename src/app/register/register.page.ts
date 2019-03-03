import { Component, OnInit } from '@angular/core';
import { NavController ,ToastController} from '@ionic/angular';
import { User } from 'src/models/user';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController,public toastController: ToastController) { }
  user = {} as User;
  ngOnInit() {
  }

  async register(user : User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
      this.showToast("User " + result.user.email + " registred successfully");
      await this.delay(1000);
      this.navCtrl.navigateForward("home");
    } catch (error) {
      this.showToast(error.message);
    }
    
  }

  async showToast(text) {
    const toast = await this.toastController.create({
      message: text,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Close',
      duration: 3000
    });
    toast.present();
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

}
