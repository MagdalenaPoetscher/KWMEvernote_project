import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Note, Tag, Todo, User} from "../shared/note";
import {NoteFactory} from "../shared/note-factory";
import {EvernoteService} from "../shared/evernote.service";
import {ToastrService} from "ngx-toastr";
import {DatePipe, NgIf} from "@angular/common";
import {TodoListItemComponent} from "../todo-list-item/todo-list-item.component";
import {TodoFactory} from "../shared/todo-factory";
import {TagListItemComponent} from "../tag-list-item/tag-list-item.component";
import {AuthenticationService} from "../shared/authentication.service";


interface onInit {
}

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    DatePipe,
    TodoListItemComponent,
    TagListItemComponent
  ],
  templateUrl: './note-details.component.html',
  styles: ``
})
export class NoteDetailsComponent implements OnInit{
  note:Note = NoteFactory.empty();
  todos: Todo[] = [];
  tags: Tag[] = [];
  user: any;


  constructor(
    private app:EvernoteService,
    private route:ActivatedRoute,
    private router:Router,
    private toastr:ToastrService,
    public authService:AuthenticationService) {
  }

  ngOnInit(){
    const params = this.route.snapshot.params;
    this.app.getSingleNote(params['id']).subscribe((n:Note)=>
    {this.note=n

      if (this.note.user_id){
        this.app.getUserDetails(this.note.user_id).subscribe(user =>{
          this.user = user;
          console.log('User loaded', user);
        });
      }

    });


    this.app.getAllTodos().subscribe(res => {
      this.todos = res;
      this.todos = this.todos.filter((todo)=> todo.note_id == Number(this.note.id));
    });
  }

  removeNote(){
    if (confirm("Notiz wirklich löschen?")){
      this.app.removeNote(this.note.id).subscribe(
        ()=> {
          this.router.navigate(['../'],
            {relativeTo:this.route});
          this.toastr.success('Notiz gelöscht', "KWM Evernote");
        }
      )
    }
  }


  protected readonly User = User;
}
