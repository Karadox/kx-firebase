import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable , FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'kx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kx';
  user: Observable<firebase.User>;
  public errorUser: firebase.FirebaseError;

  ding: FirebaseObjectObservable<any>;
  items: FirebaseListObservable<any[]>;

  constructor(public afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.user = afAuth.authState;
    this.errorUser = null;

    this.ding = db.object('/ding');
    this.items = db.list('/items');
  }

  createUser(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .catch((error: firebase.FirebaseError) => {
      // Handle Errors here.
      this.errorUser = error;
    });
  }
  signInUser(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch((error: firebase.FirebaseError) => {
      // Handle Errors here.
      console.log('Error', error);
      this.errorUser = error;
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      // Log-in successful.
    }).catch(function(error: firebase.FirebaseError) {
      // An error happened.
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      // Sign-out successful.
    }).catch((error: firebase.FirebaseError) => {
      // An error happened.
    });
  }

  save(newName: string) {
    this.ding.set({ name: newName });
  }
  update(newSize: string) {
    this.ding.update({ size: newSize });
  }
  delete() {
    this.ding.remove();
  }

  addItem(newName: string) {
    this.items.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.items.update(key, { text: newText });
  }
  deleteItem(key: string) {
    this.items.remove(key);
  }
  deleteEverything() {
    this.items.remove();
  }
}
