import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { RegisterFormComponent } from './components/login/register-form/register-form.component';
import { AngularFireModule } from '@angular/fire/compat';
import { UsersPageComponent } from './components/users/users-page/users-page.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import { UserEditFormComponent } from './components/users/user-edit-form/user-edit-form.component';
import { UserPostsComponent } from './components/post/user-posts/user-posts.component';
import { PostViewComponent } from './components/post/views/post-view-main/post-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { WarningDialogComponent } from './components/post/post-dialogs/warning-dialog/warning-gialog.component';
import { RolePageComponent } from './components/role/role-page/role-page.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddCategoryComponent } from "./components/add-category/add-category.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { MatCardModule } from "@angular/material/card";
import { HeaderComponent } from './components/header/header.component';
import { AddUserFormComponent } from './components/users/add-user-form/add-user-form.component';
import { NgxEditorModule } from 'ngx-editor';
import { ResetPasswordComponent } from './components/login/reset-password/reset-password.component';
import { CategoryListComponent } from "./components/add-category/category-list/category-list.component";
import { EditCategoryComponent } from "./components/add-category/edit-category/edit-category.component";
import { SearchPipe } from "./components/add-category/category-list/Pipe/search.pipe";
import { PostViewWrapperComponent } from './components/post/views/post-view-wrapper/post-view-wrapper.component';
import { SanitizeHtmlPipe } from './components/post/pipes/sanitize-html.pipe';
import { PostFormDialogComponent } from './components/post/post-form-dialog/post-form-dialog.component';
import { TimeAgoPipe } from './components/post/pipes/timeAgo.pipe';
import { ReadingTimePipe } from './components/post/pipes/readingTime.pipe';
import { CreateRoleFormComponent } from './components/role/create-role-form/create-role-form.component';
import { WarningComponent } from './components/role/warning/warning.component';
import { RoleItemComponent } from './components/role/role-item/role-item.component';
import {WarningCategoryComponent} from "./components/add-category/warning/warning-category.component";
import { UserItemComponent } from './components/users/user-item/user-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    UsersPageComponent,
    UserProfileComponent,
    UserEditFormComponent,
    UserPostsComponent,
    PostViewComponent,
    WarningDialogComponent,
    RolePageComponent,
    AddCategoryComponent,
    MainPageComponent,
    HeaderComponent,
    AddUserFormComponent,
    SanitizeHtmlPipe,
    CreateRoleFormComponent,
    WarningComponent,
    RoleItemComponent,
    CategoryListComponent,
    EditCategoryComponent,
    SearchPipe,
    ResetPasswordComponent,
    PostViewWrapperComponent,
    PostFormDialogComponent,
    TimeAgoPipe,
    ReadingTimePipe,
    WarningCategoryComponent,
    UserItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatSliderModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    MatDialogModule,
    MatMenuModule,
    HttpClientModule,
    MatDividerModule,
    MatCheckboxModule,
    MatCardModule,
    NgxEditorModule.forRoot(environment.editorConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
