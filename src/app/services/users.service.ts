import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from "@angular/fire/compat/database"
import { from, Observable } from 'rxjs';
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
      map(changes => changes.map(u => 
        ({ key: u.payload.key, ...u.payload.val() }))))
  }

  setCurrentUser(user: User | undefined) {
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  getCurrentUser() {
    const user = localStorage.getItem('currentUser') as string
    return JSON.parse(user)
  }

  addUser(user: User) {
    return this.usersRef.push(user)
  }

  getUsers(): Observable<User[]> {
    return this.users$
  }

  getUser(id: string | undefined): Observable<User | undefined> {
    const user$ = this.users$.pipe(
      map(users => {
        return users.find(u => u.id === id)
      })
    )
    return user$
  }

  updateUser(id: string , key: string, value: string) {
    this.usersRef.update(id, { [key]: value })
  }

  checkUserRole() {
    return this.getCurrentUser() ? this.getCurrentUser().role : false
  }
}
