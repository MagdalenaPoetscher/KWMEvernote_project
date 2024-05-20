import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NoteFactory} from "../shared/note-factory";
import {EvernoteService} from "../shared/evernote.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Note} from "../shared/note";
import {NoteFormErrorMessages} from "./note-form-error-messages";

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './note-form.component.html',
  styles: ``
})
export class NoteFormComponent implements OnInit {
  noteForm: FormGroup;
  note = NoteFactory.empty();
  errors: {[key: string]: string} = {};
  isUpdatingNote = false;
  images: FormArray;
  catalogues: any;
  tags: any [] = [];



  constructor(
    private fb: FormBuilder,
    private ev: EvernoteService,
    private route: ActivatedRoute,
    private router: Router) {

    this.noteForm = this.fb.group({});
    this.images = this.fb.array([]);

  }

  ngOnInit(){
    const id = this.route.snapshot.params["id"];

    this.ev.getAll().subscribe(catalogues => {
      this.catalogues = catalogues;
    });

    this.ev.getAllTags().subscribe(tags => {
      this.tags = tags;
    })

    if (id){
      this.isUpdatingNote = true;
      this.ev.getSingleNote(id).subscribe(note => {
        this.note = note;
        this.initNote();
      });
    }
    this.initNote();
  }

  initNote(){
    this.buildThumbnailsArray();

    this.noteForm = this.fb.group({
      id: this.note.id,
      title: [this.note.title, Validators.required],
      description: [this.note.description, Validators.required],
      catalogue_id: this.note.catalogue_id,
      tags: this.note.tags,
      created_at: this.note.created_at,
      updated_at: this.note.updated_at,
      images: this.images
    });
    this.noteForm.statusChanges.subscribe(()=>this.updateErrorMessages());
  }

  private buildThumbnailsArray(){
    if (this.note.images){
      this.images = this.fb.array([]);
      for (let img of this.note.images){
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
    this.noteForm.value.images = this.noteForm.value.images.filter((thumbnail:{url:string})=> thumbnail.url);

    const note: Note = NoteFactory.fromObject(this.noteForm.value);
    if (this.isUpdatingNote){
      this.ev.updateNote(note).subscribe(() => {
        this.router.navigate(['../../notes', note.id], {relativeTo:this.route});
      });
    }else {
      //Hack - Hardcodiert wird hier jetzt mal der User 1 definiert
      note.user_id = 1;
      this.ev.createNote(note).subscribe(() => {
        this.note = NoteFactory.empty();
        this.noteForm.reset(NoteFactory.empty());
        this.router.navigate(['../notes'], {relativeTo: this.route});
      });
    }
  }

  private updateErrorMessages(){
    this.errors = {};
    for (const message of NoteFormErrorMessages){
      const control = this.noteForm.get(message.forControl)
      if (control && control.dirty && control.invalid &&
      control.errors && control.errors[message.forValidator] &&
      !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }





}
