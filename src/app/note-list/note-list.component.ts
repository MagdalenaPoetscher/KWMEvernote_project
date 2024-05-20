import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NoteListItemComponent} from "../note-list-item/note-list-item.component";
import {Note} from "../shared/note";
import {EvernoteService} from "../shared/evernote.service";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [
    RouterLink,
    NoteListItemComponent
  ],
  templateUrl: './note-list.component.html',
  styles: ``
})
export class NoteListComponent implements OnInit{
  notes: Note[] = [];

  constructor(private app:EvernoteService,
              public authService:AuthenticationService ) {
  }

  ngOnInit() {
    this.app.getAllNotes().subscribe(res => this.notes = res );
  }
}
