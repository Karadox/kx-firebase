import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable , FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'kx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kx';
  ding: FirebaseObjectObservable<any>;
  items: FirebaseListObservable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.ding = db.object('/ding');
    this.items = db.list('/items');
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
