import { Component, OnInit } from '@angular/core';
import { User } from "src/models/user"
import { NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public toastController: ToastController) { }

  ngOnInit() {
  }

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      this.showToast("User " + result.user.email + " logged in successfully");
      this.navCtrl.navigateForward("home");
    } catch (error) {
      this.showToast(error.message);
    }
  }

  register() {
    this.navCtrl.navigateForward("register");
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

}
