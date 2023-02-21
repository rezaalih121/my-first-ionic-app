import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class IonicAuthService {
  constructor(private angularFireAuth: AngularFireAuth) {}

  createUser(value: any) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  signinUser(value: any) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInAnonymously().then(
        (res) => resolve(res),
        (err) => reject(err)
      );
    });
  }

  signoutUser() {
    return new Promise<void>(async (resolve, reject) => {
      if (await this.angularFireAuth.currentUser) {
        this.angularFireAuth
          .signOut()
          .then(() => {
            console.log('Sign out');
            resolve();
          })
          .catch(() => {
            reject();
          });
      }
    });
  }

  userDetails() {
    return this.angularFireAuth.user;
  }
}
