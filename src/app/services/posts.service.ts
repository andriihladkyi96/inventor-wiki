import { filter, map } from 'rxjs/operators';
import { Post } from '../models/Post';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService implements OnInit {
  postsRef: AngularFireList<any>;
  postRef: AngularFireObject<any>;
  private basePath: string = 'posts';

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.postsRef = this.db.list(this.basePath);
  }


  createPost(post: Post): Promise<void> {
    const newPostKey = this.postsRef.push(post).key;
    if (newPostKey) {
      post.id = newPostKey;
    }
    return this.postsRef.update(`/${newPostKey}`, post);
  }

  getPost(id: string): Observable<Post> {
    this.postRef = this.db.object(`${this.basePath}/${id}`);
    return this.postRef.valueChanges();
  }

  getPostList(): Observable<Post[]> {
    this.postsRef = this.db.list(this.basePath);
    return this.postsRef.valueChanges().pipe(
      map(posts => posts.filter(post => post.isVisible)),
      map(posts => posts.reverse())
      );
  }

  getPostsByCategory(category: string): Observable<Post[]> {
    this.postsRef = this.db.list(this.basePath, ref => {
      return ref.orderByChild("category").equalTo(category)
    })
    return this.postsRef.valueChanges().pipe(
      map(posts => posts.filter(post => post.isVisible)),
      map(posts => posts.reverse())
      );
  }

  getPostsByUserId(id: string): Observable<Post[]> {
    this.postsRef = this.db.list(this.basePath, ref => {
      return ref.orderByChild("authorId").equalTo(id)
    })
    return this.postsRef.valueChanges();
  }

  updatePost(post: Post): Promise<void> {
    this.getPost(post.id);
    return this.postRef.update(post);
  }

  deletePost(id: string): Promise<void> {
    this.getPost(id);
    return this.postRef.remove();
  }


}

