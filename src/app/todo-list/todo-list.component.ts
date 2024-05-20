import {Component, OnInit} from '@angular/core';
import {EvernoteListItemComponent} from "../evernote-list-item/evernote-list-item.component";
import {RouterLink} from "@angular/router";
import {Todo} from "../shared/todo";
import {EvernoteService} from "../shared/evernote.service";
import {TodoListItemComponent} from "../todo-list-item/todo-list-item.component";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    EvernoteListItemComponent,
    RouterLink,
    TodoListItemComponent
  ],
  templateUrl: './todo-list.component.html',
  styles: ``
})
export class TodoListComponent implements OnInit{
  todos:Todo[] = [];


  constructor(private app:EvernoteService,
              public authService:AuthenticationService) {
  }

  ngOnInit(){
    this.app.getAllTodos().subscribe(res => this.todos = res);
  }
}
