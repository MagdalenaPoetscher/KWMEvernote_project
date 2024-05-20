import {Component, Input} from '@angular/core';
import {Catalogue} from "../shared/catalogue";

@Component({
  selector: 'a.app-evernote-list-item',
  standalone: true,
  imports: [],
  templateUrl: './evernote-list-item.component.html',
  styles: ``
})
export class EvernoteListItemComponent {
  @Input() catalogue:Catalogue |undefined;
}
