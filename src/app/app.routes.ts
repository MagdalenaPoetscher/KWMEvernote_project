import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {EvernoteListComponent} from "./evernote-list/evernote-list.component";
import {CatalogueDetailsComponent} from "./catalogue-details/catalogue-details.component";
import {NoteListComponent} from "./note-list/note-list.component";
import {NoteDetailsComponent} from "./note-details/note-details.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {CatalogueFormComponent} from "./catalogue-form/catalogue-form.component";
import {TodoDetailsComponent} from "./todo-details/todo-details.component";
import {NoteFormComponent} from "./note-form/note-form.component";
import {TagListComponent} from "./tag-list/tag-list.component";
import {TagDetailsComponent} from "./tag-details/tag-details.component";
import {TagFactory} from "./shared/tag-factory";
import {TagFormComponent} from "./tag-form/tag-form.component";
import {TodoFormComponent} from "./todo-form/todo-form.component";
import {LoginComponent} from "./login/login.component";
import {canNavigateToAdminGuard} from "./can-navigate-to-admin.guard";


export const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'catalogues', component: EvernoteListComponent},
  {path:'catalogues/:id', component: CatalogueDetailsComponent},
  {path:'notes', component:NoteListComponent},
  {path:'notes/:id', component:NoteDetailsComponent},
  {path:'todo', component:TodoListComponent},
  {path:'todo/:id', component:TodoDetailsComponent},
  {path:'tag', component:TagListComponent},
  {path:'tag/:id', component:TagDetailsComponent},
  {path:'login', component:LoginComponent},

  //create new lists or update existing lists
  {path:'editList', component: CatalogueFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'editList/:id', component: CatalogueFormComponent, canActivate:[canNavigateToAdminGuard]},

  //create new notes or update existing notes
  {path:'editNotes', component: NoteFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'editNotes/:id', component: NoteFormComponent, canActivate:[canNavigateToAdminGuard]},

  //create new notes or update existing notes
  {path: 'editTodos', component: TodoFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path: 'editTodos/:id', component: TodoFormComponent, canActivate:[canNavigateToAdminGuard]},

  //create new tags or update existing tags
  {path:'editTags', component: TagFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'editTags/:id', component:TagFormComponent, canActivate:[canNavigateToAdminGuard]}

];
