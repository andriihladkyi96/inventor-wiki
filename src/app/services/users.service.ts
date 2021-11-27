import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from "@angular/fire/compat/database"
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersRef: AngularFireList<any>
  users$: Observable<User[]>

  constructor(private database: AngularFireDatabase) {
    this.usersRef = this.database.list('users')

    this.users$ = this.usersRef.snapshotChanges().pipe(
      map(changes => changes.map(u => ({ key: u.payload.key, ...u.payload.val() })))
    )
  }

  addUser(user: User): Observable<User[]> {
    this.usersRef.push(user)
    return this.users$
  }

  getUsers(): Observable<User[]> {
    return this.users$
  }

  getUser(key: string): Observable<User | undefined> {
    const user = this.users$.pipe(
      map(users => {
        return users.find(u => u.key === key)
      })
    )
    return user
  }

}
