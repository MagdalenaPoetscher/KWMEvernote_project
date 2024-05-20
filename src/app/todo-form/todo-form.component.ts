import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TodoFactory} from "../shared/todo-factory";
import {EvernoteService} from "../shared/evernote.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Todo} from "../shared/todo";
import {NoteFormErrorMessages} from "../note-form/note-form-error-messages";
import {TodoFormErrorMessages} from "./todo-form-error-messages";

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './todo-form.component.html',
  styles: ``
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  todo = TodoFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingTodo = false;
  images: FormArray;
  notes: any;
  tags: any [] = [];

  constructor(
    private fb: FormBuilder,
    private ev: EvernoteService,
    private route: ActivatedRoute,
    private router: Router) {

    this.todoForm = this.fb.group({});
    this.images = this.fb.array([]);
  }

  ngOnInit() {
    const id = this.route.snapshot.params["id"];

    this.ev.getAllNotes().subscribe(notes =>{
      this.notes = notes;
    });

    this.ev.getAllTags().subscribe(tags => {
      this.tags = tags;
    })

    if (id) {
      this.isUpdatingTodo = true;
      this.ev.getSingleTodo(id).subscribe(todo => {
        this.todo = todo;
        this.initTodo();
      });
    }
      this.initTodo();
    }

    initTodo()
    {
      this.buildThumbnailsArray();
      this.todoForm = this.fb.group({
        id: this.todo.id,
        title: [this.todo.title, Validators.required],
        description: [this.todo.description, Validators.required],
        due: [this.todo.due, Validators.required],
        note_id: this.todo.note_id,
        tags: this.todo.tags,
        images: this.images
      });
      this.todoForm.statusChanges.subscribe(() => this.updateErrorMessages());
    }

  private buildThumbnailsArray()
    {
      if (this.todo.images) {
        this.images = this.fb.array([]);
        for (let img of this.todo.images) {
          let fg = this.fb.group({
            id: this.fb.control(img.id),
            url: this.fb.control(img.url, Validators.required),
            title: this.fb.control(img.title, Validators.required)
          });
          this.images.push(fg);
        }
      }
    }

  addThumbnailControl(){
    this.images.push(this.fb.group({id:0, url:null, title:null}));
  }

  submitForm(){
    this.todoForm.value.images = this.todoForm.value.images.filter((thumbnail:{url:string}) => thumbnail.url);
    const todo: Todo = TodoFactory.fromObject(this.todoForm.value);
    if (this.isUpdatingTodo){
      this.ev.updateTodo(todo).subscribe(res =>{
        this.router.navigate(['../../todo', todo.id], {relativeTo:this.route});

      });
    }else {
      //Hardcodiert
      todo.user_id = 1;
      this.ev.createTodo(todo).subscribe(res => {
        this.todo = TodoFactory.empty();
        this.todoForm.reset(TodoFactory.empty());
        this.router.navigate(['../todo'], {relativeTo: this.route});

      });
    }
  }

  private updateErrorMessages(){
    this.errors = {};
    for (const message of TodoFormErrorMessages){
      const control = this.todoForm.get(message.forControl)
      if (control && control.dirty && control.invalid &&
        control.errors && control.errors[message.forValidator] &&
        !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }



  }

