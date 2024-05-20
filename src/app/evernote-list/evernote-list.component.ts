import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Catalogue} from "../shared/catalogue";
import {EvernoteService} from "../shared/evernote.service";
import {RouterLink} from "@angular/router";
import {EvernoteListItemComponent} from "../evernote-list-item/evernote-list-item.component";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'app-evernote-list',
  standalone: true,
  imports: [
    RouterLink,
    EvernoteListItemComponent
  ],
  templateUrl: './evernote-list.component.html',
  styles: ``
})
export class EvernoteListComponent implements OnInit{
  catalogues: Catalogue[] = [];

  constructor(
    private app:EvernoteService,
    public authService:AuthenticationService) {
  }

  ngOnInit(){
    this.app.getAll().subscribe(res => this.catalogues = res);
  }
}
