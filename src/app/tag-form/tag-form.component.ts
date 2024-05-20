import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {TagFactory} from "../shared/tag-factory";
import {EvernoteService} from "../shared/evernote.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Note, Tag} from "../shared/note";
import {NoteFactory} from "../shared/note-factory";
import {NoteFormErrorMessages} from "../note-form/note-form-error-messages";
import {TagFormErrorMessages} from "./tag-form-error-messages";

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './tag-form.component.html',
  styles: ``
})
export class TagFormComponent implements OnInit{
  tagForm: FormGroup;
  tag = TagFactory.empty();
  errors: {[key: string]: string} = {};
  isUpdatingTag = false;

  constructor(
    private fb: FormBuilder,
    private ev: EvernoteService,
    private route: ActivatedRoute,
    private router: Router) {

    this.tagForm = this.fb.group({});
  }

  ngOnInit(){
    const id = this.route.snapshot.params["id"];
    if (id){
      this.isUpdatingTag = true;
      this.ev.getSingleTag(id).subscribe(tag => {
        this.tag = tag;
        this.initTag();
      });
    }
    this.initTag();
  }

  initTag(){
    this.tagForm = this.fb.group({
      id: this.tag.id,
      title: [this.tag.title, Validators.required]
    });
    this.tagForm.statusChanges.subscribe(()=>this.updateErrorMessages());
  }

  submitForm(){
    const tag: Tag = TagFactory.fromObject(this.tagForm.value);
    console.log(tag);
    if (this.isUpdatingTag){
      this.ev.updateTag(tag).subscribe(res => {
        this.router.navigate(['../../tag', tag.id], {relativeTo:this.route});
      });
    }else {
      //Hack - Hardcodiert wird hier jetzt mal der User 1 definiert
      tag.user_id = 1;
      this.ev.createTag(tag).subscribe(res => {
        this.tag = TagFactory.empty();
        this.tagForm.reset(TagFactory.empty());
        this.router.navigate(['../tag'], {relativeTo: this.route});
      });
    }
  }

  private updateErrorMessages(){
    this.errors = {};
    for (const message of TagFormErrorMessages){
      const control = this.tagForm.get(message.forControl)
      if (control && control.dirty && control.invalid &&
        control.errors && control.errors[message.forValidator] &&
        !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }






}
