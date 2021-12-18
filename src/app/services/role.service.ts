import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Role } from '../models/Role';
import { UsersService } from 'src/app/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  rolesRef: AngularFireList<any>
  roles$: Observable<Role[]>
  users$ = this.usersService.getUsers()

  constructor(private db: AngularFireDatabase, private usersService: UsersService) {
    this.rolesRef = this.db.list('roles')
    this.roles$ = this.rolesRef.valueChanges()
  }

  createRole(role: Role): Promise<void> {
    // const i = this.roles$.pipe(
    //   map(items => {
    //     items.some(item => role.roleName === item.roleName)
    //   })
    // )
    const newKey = this.rolesRef.push(role).key
    if (newKey) {
      role.id = newKey;
    }
    return this.rolesRef.update(`/${newKey}`, role)
  }

  getAllRoles(): Observable<Role[]> {
    return this.roles$
  }

  getRole(id: string | undefined): Observable<Role | undefined> {
    const role$ = this.roles$.pipe(
      map(roles => {
        return roles.find(r => r.id === id)
      })
    )
    return role$
  }

  // getRoleName(roleName: string | undefined): Observable<Role | undefined> {
  //   const role$ = this.roles$.pipe(
  //     map(roles => {
  //       return roles.find(r => r.roleName === roleName)
  //     })
  //   )
  //   return role$
  // }

  updateRole(item: any, data: any) {
    this.rolesRef.update(item.id, data)
  }

  removeRole(id: any, roleNAme: any) {
    if (roleNAme === 'SuperAdmin') {
      return alert('SuperAdmin Role can not be deleted!!!')
    }
    this.users$.subscribe(
      users => {
        for (let value of users) {
          if (value.role === roleNAme) {
            alert('we have users with this role!!!')
            return false
          }
        }
        return this.rolesRef.remove(id)
      }
    )
  }

}
