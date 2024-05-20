import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Tag} from "../shared/tag";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs";
import {Note, Todo} from "../shared/note";
import {EvernoteService} from "../shared/evernote.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './filter.component.html',
  styles: ``
})
export class FilterComponent implements OnInit{
  keyup = new EventEmitter <string>();
  foundTags: Tag[] = [];

  isLoading = false;
  @Output() tagSelected = new EventEmitter<Tag>();

  constructor(private ev: EvernoteService) {
  }


  ngOnInit() {
    this.keyup.pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(() => this.isLoading = true))
      .pipe(switchMap(searchTerm => this.ev.getAllSearch(searchTerm)))
      .pipe(tap(() => this.isLoading = false))
      .subscribe((tags) =>{
        this.foundTags = tags;
        console.log(tags);
      });
  }


}
