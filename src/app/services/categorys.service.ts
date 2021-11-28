import { Category } from '../models/Category';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categorysRef: AngularFireList<any>;
  categoryRef: AngularFireObject<any>;
  private basePath: string = 'categorys';

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.categorysRef = this.db.list(this.basePath);
  }

  createCategory(category: Category):Promise<void> {
    const newPostKey = this.categorysRef.push(category).key;
    if (newPostKey) {
      category.id = newPostKey;
    }
    return this.categorysRef.update(`/${newPostKey}`, category);
  }

  getCategory(id: string): Observable<Category> {
    this.categoryRef = this.db.object(`${this.basePath}/${id}`);
    return this.categoryRef.valueChanges();
  }

  getCategoryList(): Observable<Category[]> {
    this.categorysRef = this.db.list(this.basePath);
    return this.categorysRef.valueChanges();
  }

  updateCategory(category: Category): Promise<void> {
    this.getCategory(category.id);
    return this.categoryRef.update(category);
  }

  deleteCategory(id: string): Promise<void> {
    this.getCategory(id);
    debugger
    return this.categoryRef.remove();
  }
}
