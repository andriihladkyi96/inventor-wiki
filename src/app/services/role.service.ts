import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Role } from '../models/Role';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  rolesRef: AngularFireList<any>
  roles$: Observable<Role[]>

  users$: Observable<User[]>

  constructor(private database: AngularFireDatabase) {
    this.rolesRef = this.database.list('roles')

    this.roles$ = this.rolesRef.valueChanges()
  }

  createRole(role: Role) {
    return this.rolesRef.push(role)
  }

  getAllRoles(): Observable<Role[]> {
    return this.roles$
  }

  saveRole(role: Role | undefined) {
    localStorage.setItem('currentUser', JSON.stringify(role))
  }

  getRole(role: string | undefined): Observable<Role | undefined> {
    const role$ = this.roles$.pipe(
      map(roles => {
        return roles.find(r => r.role === role)
      })
    )
    return role$
  }

}
