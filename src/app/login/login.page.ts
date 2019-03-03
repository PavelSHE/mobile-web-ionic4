import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;
  constructor() { }

  ngOnInit() {
  }

}
