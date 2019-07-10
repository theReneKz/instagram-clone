import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit():void {
    let config = {
      apiKey: "AIzaSyAGP2zRBFy1EoY0zLb3XkLtpG9JraiUaFo",
      authDomain: "jta-instagram-clone-ec6cc.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-ec6cc.firebaseio.com",
      projectId: "jta-instagram-clone-ec6cc",
      storageBucket: "jta-instagram-clone-ec6cc.appspot.com",
      messagingSenderId: "972509109722"
    };
    firebase.initializeApp(config);
  }
}
