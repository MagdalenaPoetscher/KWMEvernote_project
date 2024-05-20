import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FilterComponent} from "../filter/filter.component";
import {Tag} from "../shared/tag";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    FilterComponent
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
  }

  tagSelected(tag: Tag) {
    this.router.navigate(['../tag', tag.id], {relativeTo: this.route})
  }
}
