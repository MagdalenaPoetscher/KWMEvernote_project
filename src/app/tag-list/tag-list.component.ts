import {Component, OnInit} from '@angular/core';
import {NoteListItemComponent} from "../note-list-item/note-list-item.component";
import {RouterLink} from "@angular/router";
import {Tag} from "../shared/tag";
import {EvernoteService} from "../shared/evernote.service";
import {TagListItemComponent} from "../tag-list-item/tag-list-item.component";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [
    NoteListItemComponent,
    RouterLink,
    TagListItemComponent
  ],
  templateUrl: './tag-list.component.html',
  styles: ``
})
export class TagListComponent implements OnInit{
  tags: Tag[] = [];

  constructor(private app:EvernoteService,
              public authService:AuthenticationService) {
  }

  ngOnInit() {
    this.app.getAllTags().subscribe(res =>this.tags = res);
  }
}
