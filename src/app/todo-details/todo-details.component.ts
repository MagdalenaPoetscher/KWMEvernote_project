import { Component } from '@angular/core';
import {Tag, Todo} from "../shared/todo";
import {TodoFactory} from "../shared/todo-factory";
import {EvernoteService} from "../shared/evernote.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TagListItemComponent} from "../tag-list-item/tag-list-item.component";
import {AuthenticationService} from "../shared/authentication.service";

interface onInit {
}

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [
    RouterLink,
    TagListItemComponent
  ],
  templateUrl: './todo-details.component.html',
  styles: ``
})
export class TodoDetailsComponent implements onInit{
  todo:Todo = TodoFactory.empty();
  tags: Tag[] = [];

  constructor(
    private app:EvernoteService,
    private route:ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public authService:AuthenticationService) {
  }

  ngOnInit(){
    const params = this.route.snapshot.params;
    this.app.getSingleTodo(params['id']).subscribe((t:Todo)=>this.todo=t);
  }

  removeTodo(){
    if (confirm("Todo Eintrag wirklich löschen?")){
      this.app.removeTodo(this.todo.id).subscribe(
        ()=> {
          this.router.navigate(['../'],
            {relativeTo:this.route});
          this.toastr.success('Todo gelöscht', "KWM Evernote");
        }
      )
    }
  }
}
